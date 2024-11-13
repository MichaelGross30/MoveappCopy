import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { MoveDetailsContext } from './MoveDetailsContext'; // Adjust the path

const CreateMoveStep1 = ({ nextStep }) => {
  // Access moveDetails and updateMoveDetails from context
  const { moveDetails, updateMoveDetails } = useContext(MoveDetailsContext); 

  const [MOVEPicture, setMOVEPicture] = useState(moveDetails.MOVEPicture || '');
  const [moveName, setMoveName] = useState(moveDetails.name || '');
  const [description, setDescription] = useState(moveDetails.description || '');

  // Function to handle image selection
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMOVEPicture(result.assets[0].uri);
      updateMoveDetails('MOVEPicture', result.assets[0].uri);
    }
  };

  // Function to handle the "Next" button click
  const handleNext = () => {
    if (!MOVEPicture) {
      alert('Please select a MOVE profile picture');
      return;
    }
    if (!moveName || !description) {
      alert('Please enter a name and description for the MOVE');
      return;
    }

    // Update state in context
    updateMoveDetails('MOVEPicture', MOVEPicture);
    updateMoveDetails('name', moveName);
    updateMoveDetails('description', description);

    nextStep();  // Go to next step in the stack
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your MOVE</Text>
      <View style={styles.imageContainer}>
        <Button title="Select MOVE Picture" onPress={handleSelectImage} />
        {MOVEPicture ? (
          <Image source={{ uri: MOVEPicture }} style={styles.profileImage} />
        ) : (
          <Text>No MOVE picture selected</Text>
        )}
      </View>
      <Text style={styles.label}>MOVE Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter MOVE name"
        value={moveName}
        onChangeText={setMoveName}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
  },
});

export default CreateMoveStep1;





