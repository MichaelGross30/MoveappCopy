import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../firebase';

const SignupProfilePictureScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber, dateOfBirth, bio } = route.params;
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize Firebase Auth, Firestore, and Storage
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const handleNext = async () => {
    if (!profilePicture) {
      setErrorMessage('Profile picture is required.');
      return; // Prevent proceeding if no picture is selected
    }
    
    setErrorMessage('');

    try {
      // Fetch the image as a blob
      const response = await fetch(profilePicture);
      const blob = await response.blob();

      // Create a reference for the profile picture in Firebase Storage
      const storageRef = ref(storage, `profilePictures/${username}`);

      // Upload the image
      await uploadBytes(storageRef, blob);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);

      // Get the current authenticated user
      const user = auth.currentUser;
      if (user) {
        // Save user data including profile picture URL to Firestore
        await updateDoc(doc(db, 'users', user.uid), { profilePicture: downloadURL });

        // Navigate to the next screen
        navigation.navigate('SignupUniversity', {
          email,
          password,
          name,
          username,
          phoneNumber,
          dateOfBirth,
          bio,
          profilePicture: downloadURL,
        });
      } else {
        setErrorMessage('No authenticated user found.');
      }
    } catch (error) {
      setErrorMessage('Error uploading image: ' + error.message);
      console.error('Error uploading image to Firebase:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri); // Update state with the selected image URI
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Profile Picture</Text>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {profilePicture && (
        <Image source={{ uri: profilePicture }} style={styles.image} />
      )}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  image: { width: 100, height: 100, marginVertical: 16, borderRadius: 50 },
  error: { color: 'red' },
});

export default SignupProfilePictureScreen;



