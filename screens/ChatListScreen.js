import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Sample chat data for demonstration
const chatData = [
  { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?' },
  { id: '2', name: 'Jane Smith', lastMessage: 'Let’s meet up later!' },
  { id: '3', name: 'Alice Johnson', lastMessage: 'Did you finish the project?' },
  // Add more chat data as needed
];

const ChatListScreen = ({ navigation }) => {
  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Text style={styles.chatName}>{item.name}</Text>
      <Text style={styles.lastMessage}>{item.lastMessage}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar with Back Button and New Chat Icon */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Chat List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('NewChat')}>
          <Image source={require('../assets/newchat.png')} style={styles.newChatIcon} />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    elevation: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1, // Ensure it stays above other content
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  newChatIcon: {
    width: 24,
    height: 24,
    marginLeft: 'auto', // Push the new chat icon to the right
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // This allows the title to take available space
    textAlign: 'center', // Center the title
  },
  chatList: {
    paddingTop: 64, // Space for the top bar
    paddingBottom: 16,
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#757575',
  },
});

export default ChatListScreen;
