import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, FlatList, Text, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';   // To navigate to a specific Gundam detail screen

import GundamForm from '@/components/GundamForm';           // Import the GundamForm component

import { GundamContext } from '@/context/GundamContext';    // import the GundamContext to access the Gundam info

import {GundamOnlineData} from '@/components/GundamOnlineData'; // Import the GundamOnlineData component to fetch data from the Supabase API



// ======================================== Main function component ==========================================

// note:
// 'search' state variable is used to store the search input, continuously updated via onChangeText={setSearch} as the user types
// 'handleSearch' is called as the user types in the TextInput, updating the 'search' state variable
// For each item in 'GundamInfo', compare the 'name' property with the 'text' input using 'filter' and 'include' method. Then assigned to 'result' variable
// 'filteredData' is updated with 'result', to be displayed later in the flatlist

export default function GundamSearch() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigation = useNavigation();

  const { GundamInfo } = useContext(GundamContext);       // use the context to get the Gundam info



  // Search function
  const handleSearch = (text: string) => {
    setSearch(text);
    const result = GundamInfo.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(result);
  };

  useEffect(() => {
    setFilteredData(
    GundamInfo.map((item, idx) => ({
      // if item.id exists use that, otherwise fall back to index
      id: item.id != null 
        ? item.id.toString() 
        : idx.toString(),
      ...item
    }))
  )
  }, [GundamInfo]);                                       // Changes in GundamInfo will update the filteredData to show all Gundams when the component mounts or GundamInfo changes
  
  

  // Navigation function when clicking on a Gundam item
  const handleNavigateToDetail = (item) => {
    console.log(item);  // bug check
    navigation.navigate('GundamDetail', { item });        // Navigate to the detail screen and pass along the item
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
        {/* passing userinput to Gundam context*/}
        <GundamForm />


        {/* Search bar */}
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


        {/* Supabase DATA */}
        <GundamOnlineData />


        {/* FlatList to display the filtered user-entered data */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text
              style={{ padding: 10, fontSize: 18, color: 'white' }}
              onPress={() => handleNavigateToDetail(item)}          // Navigate when tapped, passing the item to GundamDetail
            >
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