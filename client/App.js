import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { Image } from 'react-native';
import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const fetchUser = async (username) => {
    const { API_URL = "http://localhost:8000" } = process.env;
    console.log(API_URL)
    const response = await fetch(`${API_URL}/api/users/${username}`);
    const data = await response.json();
    console.log(data);
    return data;
  }
  const [uri_avatar, set_uri_avatar] = useState("");

  let input_user;

  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="User"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={(text) => {
          input_user = text;
        }} />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={async () => {
          const jsondata = await fetchUser(input_user);
          try {
            set_uri_avatar(jsondata.data.user.avatar_url);
          } catch (e) {
            console.log("error");
          }
        }
        }
      >
        <Text style={styles.submitButtonText}> Fetch User ! </Text>
      </TouchableOpacity>
      <Image key={Date.now()} source={{ uri: uri_avatar }}
        style={{ width: 200, height: 200, borderRadius: 200/ 2 }}
      />
      <Text style={styles.submitButtonText} text="haha"></Text>
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