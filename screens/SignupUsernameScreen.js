// /screens/SignupUsernameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupUsernameScreen = ({ navigation, route }) => {
  const { email, password, name } = route.params;
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!username) {
      setErrorMessage('Username is required.');
    } else {
      setErrorMessage('');
      navigation.navigate('SignupPhone', { email, password, name, username });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 8 },
  error: { color: 'red' },
});

export default SignupUsernameScreen;

