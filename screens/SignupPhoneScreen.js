// /screens/SignupPhoneScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupPhoneScreen = ({ navigation, route }) => {
  const { email, password, name, username } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!phoneNumber) {
      setErrorMessage('Phone number is required.');
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage('Phone number must be 10 digits.');
    } else {
      setErrorMessage('');
      navigation.navigate('SignupDOB', { email, password, name, username, phoneNumber });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="numeric"
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

export default SignupPhoneScreen;
