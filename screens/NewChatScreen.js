// /screens/NewChatScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';

const NewChatScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);

  // Sample data for friends
  const friends = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Sam Wilson' },
  ];

  // Function to select/deselect friends
  const toggleSelectFriend = (friendId) => {
    if (selectedFriends.includes(friendId)) {
      setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
    } else {
      setSelectedFriends([...selectedFriends, friendId]);
    }
  };

  // Function to create a new chat
  const createChat = () => {
    // Logic for creating a chat with selected friends
    navigation.goBack(); // Navigate back to the chat list after creating a chat
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search friends"
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* List of Friends */}
      <FlatList
        data={friends.filter((friend) =>
          friend.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleSelectFriend(item.id)}
            style={[
              styles.friendItem,
              selectedFriends.includes(item.id) && styles.selectedFriend,
            ]}
          >
            <Text style={styles.friendName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Button to Create New Chat */}
      <TouchableOpacity style={styles.createChatButton} onPress={createChat}>
        <Text style={styles.createChatButtonText}>Create New Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  friendItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedFriend: {
    backgroundColor: '#e6f7ff',
  },
  friendName: {
    fontSize: 16,
  },
  createChatButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  createChatButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewChatScreen;
