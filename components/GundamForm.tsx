import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { GundamContext } from '../context/GundamContext';

export default function GundamForm() {
    const { GundamInfo, setGundamInfo } = useContext(GundamContext); //use the context to get the setGundamInfo function and the current list to update it  
  
  // takes these 2, and set them as the info for the Gundam
  const [name, setName] = useState('');                             // name of Gundam
  const [series, setSeries] = useState('');                         // series the Gundam is in. 



  const handleSubmit = () => {
    if (!name.trim() || !series.trim()) {                           // check if the name and series fields are empty   
      Alert.alert('Validation Error', 'Both fields are required.'); // show alert if the name and series fields are empty
      return;
    }

    // set the Gundam info in the context with the name and series inputed by the user
    setGundamInfo([
        ...GundamInfo,                                                // Keep existing entries from previous inputs
        { name: name.trim(), series: series.trim() }                  // Add new one
      ]);
    
    setName('');                                                    // reset the name field to empty string after submit
    setSeries('');                                                  // reset the series field to empty string after submit
  };



  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Gundam Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Series"
        value={series}
        onChangeText={setSeries}
        placeholderTextColor="#aaa"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}



// Styling stuff
const styles = StyleSheet.create({
  form: {
    marginBottom: 30,
  },
  input: {
    color: '#aaa',
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
