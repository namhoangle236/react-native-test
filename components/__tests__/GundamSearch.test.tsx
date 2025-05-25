import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GundamSearch from '../../app/(tabs)/index';
import { GundamContext } from '../../context/GundamContext';
import { NavigationContainer } from '@react-navigation/native'; // required for useNavigation()


// // Mock useNavigation so it doesn't throw errors
// jest.mock('@react-navigation/native', () => {
//   const actualNav = jest.requireActual('@react-navigation/native');
//   return {
//     ...actualNav,
//     useNavigation: () => ({
//       navigate: jest.fn(), // does nothing, avoids crash
//     }),
//   };
// });


// Mock GundamOnlineData so it doesn't run useQuery or break tests
jest.mock('@/components/GundamOnlineData', () => ({
  GundamOnlineData: () => null,   // or <></> — this prevents rendering and errors
}));

// Mock Gundam data to simulate context content
const mockGundamData = [
  { id: '1', name: 'Strike Gundam' },
  { id: '2', name: 'Freedom Gundam' },
  { id: '3', name: 'Zaku' },
];


// note: describe is used to group related tests together, in this case, all tests related to the GundamSearch screen
describe('GundamSearch Screen', () => {
  // Test 1: list items render correctly
  test('1. Renders a list of items', () => {
    const { getByText } = render(
      <NavigationContainer> {/* required because GundamSearch uses useNavigation() */}
        <GundamContext.Provider value={{ GundamInfo: mockGundamData }}>
          <GundamSearch />
        </GundamContext.Provider>
      </NavigationContainer>
    );

    // Make sure these Gundam names show up
    expect(getByText('Strike Gundam')).toBeTruthy();
    expect(getByText('Freedom Gundam')).toBeTruthy();
  });

  // Test 2: filtering the list via search input
  test('2. Filters the list based on search input', () => {
    const { getByPlaceholderText, queryByText } = render(
      <NavigationContainer>
        <GundamContext.Provider value={{ GundamInfo: mockGundamData }}>
          <GundamSearch />
        </GundamContext.Provider>
      </NavigationContainer>
    );

    // Grab the input field by its placeholder
    const input = getByPlaceholderText('Search your Gundam');

    // Simulate typing 'freedom'
    fireEvent.changeText(input, 'freedom');

    // Check that only 'Freedom Gundam' is shown
    expect(queryByText('Freedom Gundam')).toBeTruthy();

    // Other Gundams should not show up
    expect(queryByText('Strike Gundam')).toBeNull();
    expect(queryByText('Zaku')).toBeNull();
  });
});


// note:
// If not using mock navigation, then:
// MUST wrap the component in a NavigationContainer since GundamSearch uses useNavigation() to navigate to the GundamDetail screen
// Normally, Expo layout has this at top level, but since this is a test, we need to wrap it ourselves