// Step2Invites.js
import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const friendsList = [
  { id: '1', name: 'Friend One' },
  { id: '2', name: 'Friend Two' },
  { id: '3', name: 'Group: Soccer Club' },
  { id: '4', name: 'Group: Study Group' },
  // Add more friends and groups as needed
];

const Step2Invites = ({ nextStep, prevStep, updateMoveDetails, moveDetails }) => {
  const [selectedInvites, setSelectedInvites] = useState(moveDetails.invitedUsers || []);

  const toggleInvite = (id) => {
    setSelectedInvites((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((userId) => userId !== id) : [...prevSelected, id]
    );
  };

  const handleNext = () => {
    updateMoveDetails('invitedUsers', selectedInvites);
    nextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Invite Friends/Groups</Text>
      
      <FlatList
        data={friendsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.friendItem, selectedInvites.includes(item.id) && styles.selectedItem]}
            onPress={() => toggleInvite(item.id)}
          >
            <Text style={styles.friendName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Button title="Previous" onPress={prevStep} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  friendItem: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  selectedItem: { backgroundColor: '#ddd' },
  friendName: { fontSize: 18 },
});

export default Step2Invites;

