import { useState } from 'react';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

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
  const [name, set_name] = useState("");
  const [login, set_login] = useState("");
  const [repos, set_repos] = useState("");
  const [followers, set_followers] = useState("");

  let input_user;

  return (
    <View style={styles.globalContainer}>
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
            set_name(`Name: ${jsondata.data.user.name}`);
            set_repos(`Repositories: ${jsondata.data.user.public_repos}`);
            set_followers(`Followers: ${jsondata.data.user.followers}`);
            set_login(`${jsondata.data.user.login}`);
          } catch (e) {
            console.log("error");
          }
        }
        }
      >
        <Text style={styles.submitButtonText}> Fetch User! </Text>
      </TouchableOpacity>
      <View style={styles.userContainer}>
        <Text style={styles.loginText}> {login} </Text>
        <Image key={Date.now()} source={{ uri: uri_avatar }}
          style={{ width: 200, height: 200, borderRadius: "50%" }}
        />
        <Text style={styles.userText}> {name} </Text>
        <Text style={styles.userText}> {repos} </Text>
        <Text style={styles.userText}> {followers} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'aligned',
  },
  globalContainer: {
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
  },
  userText: {
    color: 'black'
  },
  loginText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
  }
});