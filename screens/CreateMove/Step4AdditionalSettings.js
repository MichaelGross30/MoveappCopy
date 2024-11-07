// Step4AdditionalSettings.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Switch, StyleSheet } from 'react-native';

const Step4AdditionalSettings = ({ nextStep, prevStep, updateMoveDetails, moveDetails }) => {
  const [location, setLocation] = useState('');
  const [maxUsers, setMaxUsers] = useState('');
  const [lockedGallery, setLockedGallery] = useState(false);

  const handleNext = () => {
    updateMoveDetails('location', location);
    updateMoveDetails('maxUsers', maxUsers ? parseInt(maxUsers) : null);
    updateMoveDetails('lockedGallery', lockedGallery);
    nextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 4: Additional Settings</Text>

      <TextInput
        placeholder="Location (Google Maps integration here)"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <TextInput
        placeholder="Maximum Users (Optional)"
        style={styles.input}
        value={maxUsers}
        onChangeText={setMaxUsers}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text>Locked Photo Gallery</Text>
        <Switch
          value={lockedGallery}
          onValueChange={(value) => setLockedGallery(value)}
        />
      </View>

      <Button title="Previous" onPress={prevStep} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { borderWidth: 1, padding: 8, marginVertical: 8, borderRadius: 5 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
});

export default Step4AdditionalSettings;
