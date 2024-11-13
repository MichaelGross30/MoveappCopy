import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignupBioScreen = ({ navigation, route }) => {
  const { email, password, name, username, phoneNumber, dateOfBirth } = route.params;
  const [bio, setBio] = useState('');

  // Function to handle the "Next" button click
  const handleNext = () => {
    // Perform any necessary validation or bio saving here
    if (bio.trim() !== '') {
      // Navigate to the next screen in the signup process, passing all the information
      navigation.navigate('SignupProfilePicture', {
        email,
        password,
        name,
        username,
        phoneNumber,
        dateOfBirth,
        bio,
      });
    } else {
      alert('Please enter a bio to continue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <TextInput
        style={styles.input}
        placeholder="Write a short bio about yourself"
        placeholderTextColor="#888"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignupBioScreen;




