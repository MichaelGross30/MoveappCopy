// Step1Details.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Step1Details = ({ nextStep, updateMoveDetails, moveDetails }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      updateMoveDetails('profilePicture', result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 1: Basic MOVE Details</Text>

      <Button title="Select Profile Picture" onPress={pickImage} />
      {moveDetails.profilePicture ? <Text>Image Selected</Text> : null}

      <TextInput
        placeholder="MOVE Name"
        style={styles.input}
        value={moveDetails.name}
        onChangeText={(text) => updateMoveDetails('name', text)}
      />

      <TextInput
        placeholder="MOVE Description"
        style={styles.input}
        value={moveDetails.description}
        onChangeText={(text) => updateMoveDetails('description', text)}
        multiline
      />

      <Button title="Next" onPress={nextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 5 },
});

export default Step1Details;
