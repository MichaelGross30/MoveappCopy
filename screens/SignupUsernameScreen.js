import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Import Firestore
import app from '../firebase'; // Import your Firebase setup

const SignupUsernameScreen = ({ navigation, route }) => {
  const { email, password, name } = route.params;
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize Firebase Auth and Firestore
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleNext = async () => {
    if (!username) {
      setErrorMessage('Username is required.');
      return; // Prevent proceeding if username is empty
    }

    setErrorMessage('');

    // Get the current authenticated user
    const user = auth.currentUser;
    if (user) {
      try {
        // Update the user's Firestore document with the username
        await updateDoc(doc(db, 'users', user.uid), { username });

        // Navigate to the next screen
        navigation.navigate('SignupPhone', { email, password, name, username });
      } catch (error) {
        console.error('Error updating username:', error);
        setErrorMessage('Failed to update username. Please try again.');
      }
    } else {
      setErrorMessage('No authenticated user found.');
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




