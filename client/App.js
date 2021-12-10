import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const fetchUser = async (username) => {
    //const { API_URL = "http://localhost:8000" } = process.env;
    const { API_URL = "http://localhost:8000" } = process.env;
    console.log(API_URL)
    const response = await fetch(`${API_URL}/api/users/${username}`);
    const data = await response.json();
    console.log(data);
  }

  fetchUser("sosniik");

  return (
    <View style={styles.container}>
      <Text>This is Sparta !</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
