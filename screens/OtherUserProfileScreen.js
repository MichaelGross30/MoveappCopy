// /screens/OtherUserProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

const OtherUserProfileScreen = ({ route }) => {
  const { userData } = route.params; // userData should include all necessary user info

  const [friendStatus, setFriendStatus] = useState(userData.friendStatus); // can be 'none', 'pending', 'friends'

  const handleAddFriend = () => {
    // Logic to send friend request
    setFriendStatus('pending');
  };

  const handleUnsendRequest = () => {
    // Logic to unsend request
    setFriendStatus('none');
  };

  const handleRemoveFriend = () => {
    Alert.alert("Confirm", "Are you sure you want to remove this friend?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => setFriendStatus('none') }, // Remove friend logic here
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: userData.profilePic }} style={styles.profileImage} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.university}>{userData.university}</Text>
        <Text style={styles.description}>{userData.bio}</Text>
      </View>

      {/* Friend Button Logic */}
      {friendStatus === 'none' && (
        <Button title="Add Friend" onPress={handleAddFriend} color="orange" />
      )}
      {friendStatus === 'pending' && (
        <Button title="Pending" onPress={handleUnsendRequest} color="white" />
      )}
      {friendStatus === 'friends' && (
        <Button title="Remove Friend" onPress={handleRemoveFriend} color="red" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  profileHeader: { marginBottom: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 24, marginBottom: 8 },
  university: { color: 'blue' },
  description: { fontSize: 16 },
});

export default OtherUserProfileScreen;

     
