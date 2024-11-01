// /screens/SignupBioScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignupBioScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber, dateOfBirth } = route.params;
  const [bio, setBio] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!bio) {
      setErrorMessage('Bio is required.');
    } else {
      setErrorMessage('');
      navigation.navigate('SignupProfilePicture', { email, password, name, username, phoneNumber, dateOfBirth, bio });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Bio</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Bio"
        value={bio}
        onChangeText={setBio}
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

export default SignupBioScreen;
