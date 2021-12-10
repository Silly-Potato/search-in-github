import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const fetchUser = async (username) => {
    const { API_URL = "http://localhost:8000" } = process.env;
    console.log(API_URL)
    const response = await fetch(`${API_URL}/api/users/${username}`);
    const data = await response.json();
    console.log(data);
  }

  let input_user;

  return (
    <View style={styles.container}>
      <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "User"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = { (text) => {
                 input_user = text;
                 } }/>
      <TouchableOpacity
        style={ styles.submitButton }
        onPress={ () => fetchUser(input_user) }
      >
        <Text style={ styles.submitButtonText }> Fetch User ! </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40
  },
  submitButtonText: {
    color: 'white'
  }
});