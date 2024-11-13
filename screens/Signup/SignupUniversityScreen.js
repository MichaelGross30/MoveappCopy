import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore methods
import { auth, db } from '../../firebase'; // Import your auth and db instances

const SignupUniversityScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber, dateOfBirth, bio, profilePicture } = route.params;
  const [university, setUniversity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = async () => {
    try {
      // Store additional user information in Firestore
      const userRef = doc(db, 'users', auth.currentUser.uid); // Reference to the user's document
      await setDoc(
        userRef,
        { university },
        { merge: true } // Use merge to add the university without overwriting existing data
      );

      // Navigate to the main app's Home screen
      navigation.navigate('Home', {
        email,
        password,
        name,
        username,
        phoneNumber,
        dateOfBirth,
        bio,
        profilePicture,
        university,
      });
    } catch (error) {
      // Handle errors (e.g., display error message)
      setErrorMessage(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your University (Optional)</Text>
      <Picker
        selectedValue={university}
        style={styles.picker}
        onValueChange={(itemValue) => setUniversity(itemValue)}
      >
        <Picker.Item label="Select your university" value="" />
        <Picker.Item label="University of North Dakota" value="und" />
        <Picker.Item label="Other University" value="other" />
        {/* Add more universities as needed */}
      </Picker>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  picker: { height: 50, width: '100%', marginBottom: 16 },
  error: { color: 'red' },
});

export default SignupUniversityScreen;




