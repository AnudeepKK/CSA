import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground,Image } from 'react-native';
import Logo from './assets/icon.png';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // No need to fetch user data here. You only need to fetch it when logging in.
  }, []);

  const handleLogin = () => {
    // Create a request body with the email and password
    const requestBody = {
      email: username,
      password: password,
    };

    fetch('http://restapi.adequateshop.com/api/authaccount/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Invalid username or password');
        }
      })
      .then((data) => {
        // Store the token from the API response
        const token = data.data.Token;

        // Successfully logged in, call the onLogin callback
        setToken(token); // Store the token in your component state
        onLogin(); // Call the callback function to handle navigation
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setLoginError('Invalid username or password. Please try again.');
      });
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://w0.peakpx.com/wallpaper/843/537/HD-wallpaper-s8-borders-stars-abstract-amoled-black-blue-display-gradient-infinity-thumbnail.jpg',
      }}
      style={styles.container}
    >
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo}/>
        <Text style={styles.title}>Login Page</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="white"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
        <Text style={styles.errorText}>{loginError}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    color: 'white',
  },
  errorText: {
    color: 'red',
  },
  logo: {
    width: 100, // Adjust the width to fit your design
    height: 100, // Adjust the height to fit your design
    marginBottom: 20, // Adjust the spacing as needed
  },
});

export default LoginPage;
