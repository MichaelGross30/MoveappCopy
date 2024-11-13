import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth, db } from '../../firebase';  // Make sure to replace with your Firebase config

// Import the useMoveDetails hook to access the context
import { useMoveDetails } from './MoveDetailsContext';

const Step5Confirmation = ({ prevStep, navigation }) => {
  // Access moveDetails from context using the useMoveDetails hook
  const { moveDetails } = useMoveDetails();

  const handleSubmit = () => {
    // Upload MOVE data to Firebase
    uploadMoveToFirebase(moveDetails);

    // Navigate to a confirmation screen or home page after the move is uploaded
    navigation.navigate('Home'); // Or to a new confirmation screen
  };

  // A function to upload MOVE data to Firebase
  const uploadMoveToFirebase = async (moveDetails) => {
    try {
      // Create a reference to the 'moves' collection and document ID as the MOVE name
      const moveRef = doc(db, 'moves', moveDetails.name); 

      // Set the move details to Firestore, this will create a new document or overwrite an existing one
      moveDetails.creator = auth.currentUser.uid;  // Add the creator's UID (logged-in user)

      await setDoc(moveRef, moveDetails);

      console.log('MOVE uploaded to Firebase:', moveDetails);
    } catch (error) {
      console.error('Error uploading MOVE:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Confirm Your MOVE Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>MOVE Profile Picture:</Text>
        {moveDetails.MOVEPicture ? (
          <Image source={{ uri: moveDetails.MOVEPicture }} style={styles.profileImage} />
        ) : (
          <Text>No profile picture selected for the MOVE</Text>
        )}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>MOVE Name:</Text>
        <Text>{moveDetails.name}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Description:</Text>
        <Text>{moveDetails.description}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Invited Users:</Text>
        <Text>{moveDetails.invitedUsers.join(', ')}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Start Date and Time:</Text>
        <Text>{moveDetails.startDateTime}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>End Date and Time:</Text>
        <Text>{moveDetails.endDateTime || 'Not Provided'}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Locked Gallery:</Text>
        <Text>{moveDetails.lockedGallery ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Location:</Text>
        <Text>{moveDetails.location}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailTitle}>Max Users Allowed:</Text>
        <Text>{moveDetails.maxUsers || 'No Limit'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit MOVE" onPress={handleSubmit} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={prevStep} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 12,
  },
  detailTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default Step5Confirmation;




