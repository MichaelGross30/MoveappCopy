// /screens/SignupProfilePictureScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const SignupProfilePictureScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber, dateOfBirth, bio } = route.params;
  const [profilePicture, setProfilePicture] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    if (!profilePicture) {
      setErrorMessage('Profile picture is required.');
    } else {
      setErrorMessage('');
      // Navigate to the next screen with the profile picture included
      navigation.navigate('SignupUniversity', { email, password, name, username, phoneNumber, dateOfBirth, bio, profilePicture });
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
      setProfilePicture(result.assets[0].uri);
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

