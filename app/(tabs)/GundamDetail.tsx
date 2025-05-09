import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';  // To access params passed to this screen

export default function GundamDetail() {
  const route = useRoute();                           // Get the route params
  console.log(route.params);
  const { item } = route.params;                      // Get the passed 'item' param from the route

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, color: 'white' }}>{item.name}</Text>
      <Text style={{ fontSize: 24, color: 'white' }}>Anime: {item.series}</Text>
    </View>
  );
}
