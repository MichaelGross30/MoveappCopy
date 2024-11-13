import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Import Firestore
import app from '../../firebase'; // Import your Firebase setup

const SignupPhoneScreen = ({ navigation, route }) => {
  const { email, password, name, username } = route.params;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize Firebase Auth and Firestore
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleNext = async () => {
    if (!phoneNumber) {
      setErrorMessage('Phone number is required.');
      return; // Prevent proceeding if phone number is empty
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setErrorMessage('Phone number must be 10 digits.');
      return; // Prevent proceeding if phone number is invalid
    }

    setErrorMessage('');

    // Get the current authenticated user
    const user = auth.currentUser;
    if (user) {
      try {
        // Update the user's Firestore document with the phone number
        await updateDoc(doc(db, 'users', user.uid), { phoneNumber });

        // Navigate to the next screen
        navigation.navigate('SignupDOB', { email, password, name, username, phoneNumber });
      } catch (error) {
        console.error('Error saving phone number:', error);
        setErrorMessage('Failed to save your phone number. Please try again.');
      }
    } else {
      setErrorMessage('No authenticated user found.');
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



