// /screens/SignupDOBScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupDOBScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber } = route.params;
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!dateOfBirth) {
      setErrorMessage('Date of birth is required.');
    } else {
      setErrorMessage('');
      navigation.navigate('SignupBio', { email, password, name, username, phoneNumber, dateOfBirth });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Date of Birth</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
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

export default SignupDOBScreen;
