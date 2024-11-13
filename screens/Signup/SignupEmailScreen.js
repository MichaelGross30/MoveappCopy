// /screens/SignupEmailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase Auth
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Firestore
import app from '../../firebase'; // Firebase setup

const SignupEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize Firebase Auth and Firestore
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleNext = () => {
    // Validation for email input
    if (!email) {
      setErrorMessage('Email is required.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Email address is invalid.');
    } else {
      setErrorMessage(''); // Clear any previous error messages

      // Create user with email and temporary password
      createUserWithEmailAndPassword(auth, email, 'temporaryPassword123')
        .then(async (userCredential) => {
          // User successfully created
          const user = userCredential.user;
          console.log('User created:', user);

          // Save user info to Firestore
          await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            // Add additional fields as needed
          });

          // Navigate to the SignupPassword screen
          navigation.navigate('SignupPassword', { email });
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          setErrorMessage(error.message);
        });
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



