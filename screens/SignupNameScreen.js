// /screens/SignupNameScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore
import app from '../firebase'; // Import your Firebase setup

const SignupNameScreen = ({ navigation, route }) => {
  const { email } = route.params; // Get the email passed from the previous screen
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize Firebase Auth and Firestore
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleNext = async () => {
    if (!name) {
      setErrorMessage('Name is required.');
      return; // Prevent proceeding if name is empty
    }

    setErrorMessage('');

    try {
      // Get the currently authenticated user
      const user = auth.currentUser;

      if (user) {
        // Save the user's name in Firestore
        await setDoc(doc(db, 'users', user.uid), { name, email });

        // Navigate to the next screen
        navigation.navigate('SignupUsername', { email, name });
      } else {
        setErrorMessage('No authenticated user found.');
      }
    } catch (error) {
      console.error('Error saving name to Firestore:', error);
      setErrorMessage('Failed to save your name. Please try again.');
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
