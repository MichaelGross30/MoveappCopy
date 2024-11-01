// /screens/SignupEmailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!email) {
      setErrorMessage('Email is required.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Email address is invalid.');
    } else {
      setErrorMessage('');
      navigation.navigate('SignupPassword', { email });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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

export default SignupEmailScreen;
