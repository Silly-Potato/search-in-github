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
  const [bio, set_bio] = useState("");
  const [input_user, set_input] = useState("");

  return (
    <View style={styles.globalContainer}>
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="User"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={(text) => {
          set_input(text);
        }}
        value={input_user}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={async () => {
          try {
            const jsondata = await fetchUser(input_user);
            if (jsondata.data.message == undefined) {
              set_uri_avatar(jsondata.data.user.avatar_url);
              set_name(jsondata.data.user.name);
              set_repos(jsondata.data.user.public_repos);
              set_followers(jsondata.data.user.followers);
              set_login(jsondata.data.user.login);
              set_bio(jsondata.data.user.bio);
            } else {
              set_uri_avatar(undefined);
              set_name(undefined);
              set_repos(undefined);
              set_followers(undefined);
              set_login(undefined);
              set_bio(jsondata.data.message);
            }
          } catch (e) {
            console.log("error");
          }
        }
        }
      >
        <Text style={styles.submitButtonText}> Fetch User! </Text>
      </TouchableOpacity>
      <Text style={styles.loginText}> {login} </Text>
      <Text style={styles.bioText}> {bio} </Text>
      <View style={{
        alignContent: 'center',
        alignItems: 'center'
      }}>
        <br></br>
        <Image key={Date.now()} source={{ uri: uri_avatar }}
          style={{ width: 200, height: 200, borderRadius: "50%", alignContent: 'center' }}
        />
        <br></br>
      </View>
      <Text>
        <Text style={styles.titleText}> Name :</Text>
        <Text style={styles.valueText}>  {name}</Text>
      </Text>
      <Text>
        <Text style={styles.titleText}> Repositories :</Text>
        <Text style={styles.valueText}>  {repos}</Text>
      </Text>
      <Text>
        <Text style={styles.titleText}> Followers :</Text>
        <Text style={styles.valueText}>  {followers}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
  valueText: {
    textAlign: 'right',
    color: 'black',
    alignSelf: 'stretch',
    fontSize: 20
  },
  loginText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'stretch',
    fontSize: 50
  },
  bioText: {
    textAlign: 'center',
    color: 'black',
    fontStyle: 'italic',
    alignSelf: 'stretch',
    fontSize: 20
  },
  titleText: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'stretch',
    fontSize: 20
  }
});