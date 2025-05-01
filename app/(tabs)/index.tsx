import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, ScrollView } from 'react-native';


//  ========================================== Sample data array ==========================================
const data = [
  { id: '1', name: 'Exia' },
  { id: '2', name: 'Nu' },
  { id: '3', name: 'Unicorn' },
  { id: '4', name: 'RX-78-2' },
];


// ======================================== Main function component ==========================================

// note:
// 'search' state variable is used to store the search input, continuously updated via onChangeText={setSearch} as the user types
// 'handleSearch' is called as the user types in the TextInput, updating the 'search' state variable
// For each item in 'data', compare the 'name' property with the 'text' input using 'filter' and 'include' method. Then assigned to 'result' variable
// 'filteredData' is updated with 'result', to be displayed later in the flatlist

export default function App() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text: string) => {
    setSearch(text);
    const result = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(result);
  };

  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: 'black',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <TextInput
          placeholder="Search your Gundam"
          value={search}
          onChangeText={handleSearch}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            color: 'white',
            padding: 8,
            marginBottom: 10 }}
        />


        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={{ padding: 10, fontSize: 18, color: 'white' }}>
              {item.name}
            </Text>
          )}
        />

      </View>

    </ScrollView>
  );
}


// Study notes:
//
// FlatList has some key props (data, keyExtractor, renderItem)
// 'item' in keyExtractor is the object in the data array. Ex: { id: '1', name: 'Exia' }
//
// HOWEVER! 'item' in renderItem is the object in another array created behind the scene by FlatList using the objects in the 'data' array !!! Weird AF
// <FlatList> internally takes each item from data and wraps it in an object
//
// Like this: 
// {
//   item: { id: '1', name: 'Exia' },
//   index: 0,
//   separators: { ... }
// }
//
// Hence, why it looks like this:
// renderItem={({ item }) => (                ie: for each object in the array, take the 'item' property of the object, and do stuff
//
// and NOT:
//
// renderItem={(item) => (                    ie: for each object in the array, take the object itself, and do stuff