import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Switch } from 'react-native';

// Import the useMoveDetails hook to access the context
import { useMoveDetails } from './MoveDetailsContext';

const Step4AdditionalSettings = ({ nextStep, prevStep }) => {
  const { moveDetails, updateMoveDetails } = useMoveDetails();
  
  // Initialize state based on moveDetails from context
  const [location, setLocation] = useState(moveDetails.location || '');
  const [lockedGallery, setLockedGallery] = useState(moveDetails.lockedGallery || false);

  useEffect(() => {
    // Update state when moveDetails change (for consistency)
    setLocation(moveDetails.location);
    setLockedGallery(moveDetails.lockedGallery);
  }, [moveDetails]);

  const handleLocationChange = (text) => {
    setLocation(text);
    updateMoveDetails('location', text);  // Update context when location changes
  };

  const handleLockedGalleryChange = (value) => {
    setLockedGallery(value);
    updateMoveDetails('lockedGallery', value);  // Update context when lockedGallery changes
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 4: Additional Settings</Text>

      {/* Locked Gallery Description */}
      <Text style={styles.description}>
        Locking the photo gallery means that photos will only be viewable once the MOVE is over. This can be used for events like vacations or parties where you want to wait until the event ends before sharing the photos.
      </Text>

      {/* Locked Gallery */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Locked Photo Gallery:</Text>
        <Switch
          value={lockedGallery}
          onValueChange={handleLockedGalleryChange}
        />
      </View>

      {/* Location Input */}
      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={handleLocationChange}
        placeholder="Enter location"
      />

      <Button title="Back" onPress={prevStep} />
      <Button title="Next" onPress={nextStep} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  label: { fontSize: 18, marginVertical: 8 },
  description: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 16, 
    paddingHorizontal: 8,
    fontStyle: 'italic' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 4, 
    padding: 8, 
    marginBottom: 16 
  },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
});

export default Step4AdditionalSettings;


