import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, CheckBox } from 'react-native';

// Import the useMoveDetails hook to access the context
import { useMoveDetails } from './MoveDetailsContext';

const Step2Invites = ({ nextStep, prevStep, friendsList }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);
  
  // Access moveDetails and updateMoveDetails from context
  const { moveDetails, updateMoveDetails } = useMoveDetails();

  useEffect(() => {
    // Update selected friends when moveDetails is updated
    setSelectedFriends(moveDetails.invitedUsers);
  }, [moveDetails]);

  const handleFriendSelection = (friendId) => {
    // Toggle selection of friend
    setSelectedFriends((prev) => {
      if (prev.includes(friendId)) {
        return prev.filter((id) => id !== friendId);
      } else {
        return [...prev, friendId];
      }
    });
  };

  // Save the selected friends to moveDetails when moving to the next step
  const handleNext = () => {
    updateMoveDetails('invitedUsers', selectedFriends);
    nextStep();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step 2: Select Friends to Invite</Text>
      <FlatList
        data={friendsList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Text style={styles.friendName}>{item.name}</Text>
            <CheckBox
              value={selectedFriends.includes(item.id)}
              onValueChange={() => handleFriendSelection(item.id)}
            />
          </View>
        )}
      />
      <Button title="Back" onPress={prevStep} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16 },
  friendItem: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
  friendName: { fontSize: 18 },
});

export default Step2Invites;


