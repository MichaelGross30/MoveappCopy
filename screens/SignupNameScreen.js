// /screens/SignupNameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupNameScreen = ({ navigation, route }) => {
  const { email, password } = route.params;
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!name) {
      setErrorMessage('Name is required.');
    } else {
      setErrorMessage('');
      navigation.navigate('SignupUsername', { email, password, name });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
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

export default SignupNameScreen;
