import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase'; // Ensure you have the correct path
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const SearchUsersScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUserFriends, setCurrentUserFriends] = useState([]);
  const MAX_RESULTS = 50; // Set the maximum number of results to return

  // Fetch all users from Firestore
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const allUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch current user's friends for friend status checking
  const fetchCurrentUserFriends = async () => {
    const currentUserDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const currentUserData = currentUserDoc.data();
    setCurrentUserFriends(currentUserData.friends || []);
  };

  // Filter users based on search query
  const filterUsers = (query) => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = users.filter(user => {
        const usernameMatches = user.username && user.username.toLowerCase().includes(lowerCaseQuery);
        const nameMatches = user.name && user.name.toLowerCase().includes(lowerCaseQuery);
        return usernameMatches || nameMatches;
      });
      setFilteredUsers(filtered.slice(0, MAX_RESULTS)); // Limit the results
    } else {
      setFilteredUsers([]);
    }
  };

  // Handle user press to navigate to their profile
  const handleUserPress = (user) => {
    navigation.navigate('OtherUserProfile', { userId: user.id });
  };

  const handleAddFriend = async (userId) => {
    try {
      const currentUserRef = doc(db, 'users', auth.currentUser.uid);
      const otherUserRef = doc(db, 'users', userId);

      // Send friend request
      await updateDoc(currentUserRef, {
        friends: arrayUnion(`pending_${userId}`) // Mark as pending
      });

      await updateDoc(otherUserRef, {
        friendRequests: arrayUnion(auth.currentUser.uid) // Add to other user's requests
      });

      Alert.alert('Success', 'Friend request sent!');
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCurrentUserFriends();
  }, []);

  useEffect(() => {
    filterUsers(searchQuery);
  }, [searchQuery, users]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for users..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isFriend = currentUserFriends.includes(item.id);
          const friendRequestPending = currentUserFriends.includes(`pending_${item.id}`);

          return (
            <TouchableOpacity style={styles.userItem} onPress={() => handleUserPress(item)}>
              <Text style={styles.userName}>{item.username || 'Unknown User'}</Text>
              <Text style={styles.userMutualFriends}>{item.mutualFriendsCount || 0} mutual friends</Text>
              {!isFriend && !friendRequestPending && (
                <TouchableOpacity style={styles.addFriendButton} onPress={() => handleAddFriend(item.id)}>
                  <Text style={styles.addFriendText}>Add Friend</Text>
                </TouchableOpacity>
              )}
              {friendRequestPending && <Text style={styles.pendingText}>Pending</Text>}
            </TouchableOpacity>
          );
        }}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  userList: {
    flexGrow: 0,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    position: 'relative',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userMutualFriends: {
    fontSize: 14,
    color: 'gray',
  },
  addFriendButton: {
    marginTop: 5,
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  addFriendText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pendingText: {
    color: 'gray',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

export default SearchUsersScreen;



