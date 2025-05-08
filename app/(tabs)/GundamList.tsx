import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GundamContext } from '../../context/GundamContext';

import { useNavigation } from '@react-navigation/native';                 // To navigate to a specific Gundam detail screen


export default function GundamList() {
  const { GundamInfo } = useContext(GundamContext);                       // use the context to get the Gundam info

  return (
    <View style={styles.container}>
      {GundamInfo.length === 0 ? (
        <Text style={styles.welcome}>No Gundams submitted yet.</Text>
      ) : (
        GundamInfo.map((gundam, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.welcome}>Gundam: {gundam.name}</Text>
            <Text style={styles.welcome}>Series: {gundam.series}</Text>
          </View>
        ))
      )}
    </View>
  );
}


// Styling stuff
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
