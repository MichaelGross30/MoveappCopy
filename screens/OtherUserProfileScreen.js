import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase'; // Ensure you have the correct path
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const OtherUserProfileScreen = ({ route, navigation }) => {
  const { userId } = route.params; // Get the userId from navigation parameters
  const [otherUser, setOtherUser] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequestPending, setFriendRequestPending] = useState(false);
  const [currentUserFriends, setCurrentUserFriends] = useState([]);

  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setOtherUser({ id: userDoc.id, ...userDoc.data() });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCurrentUserFriends = async () => {
    const currentUserDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const currentUserData = currentUserDoc.data();
    setCurrentUserFriends(currentUserData.friends || []);
  };

  useEffect(() => {
    fetchUserData();
    fetchCurrentUserFriends();
  }, []);

  useEffect(() => {
    if (otherUser) {
      setIsFriend(currentUserFriends.includes(userId));
      setFriendRequestPending(currentUserFriends.includes(`pending_${userId}`));
    }
  }, [otherUser, currentUserFriends]);

  const handleAddFriend = async () => {
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

      setFriendRequestPending(true);
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleCancelFriendRequest = async () => {
    try {
      const currentUserRef = doc(db, 'users', auth.currentUser.uid);
      const otherUserRef = doc(db, 'users', userId);

      // Cancel friend request
      await updateDoc(currentUserRef, {
        friends: arrayRemove(`pending_${userId}`)
      });

      await updateDoc(otherUserRef, {
        friendRequests: arrayRemove(auth.currentUser.uid)
      });

      setFriendRequestPending(false);
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    }
  };

  const handleRemoveFriend = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to remove this friend?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const currentUserRef = doc(db, 'users', auth.currentUser.uid);
              const otherUserRef = doc(db, 'users', userId);

              // Remove friend
              await updateDoc(currentUserRef, {
                friends: arrayRemove(userId)
              });

              await updateDoc(otherUserRef, {
                friends: arrayRemove(auth.currentUser.uid)
              });

              setIsFriend(false);
            } catch (error) {
              console.error('Error removing friend:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleChatPress = () => {
    navigation.navigate('Chat', { userId });
  };

  const handleHideNotifications = () => {
    // Implement logic to hide notifications from this user
  };

  return (
    <View style={styles.container}>
      {otherUser ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <View style={styles.rightIcons}>
              <TouchableOpacity onPress={handleChatPress}>
                <Text style={styles.icon}>💬</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleHideNotifications}>
                <Text style={styles.icon}>🔔</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Image source={{ uri: otherUser.profilePicture }} style={styles.profilePicture} />
          <Text style={[styles.userName, isFriend && styles.friendName]}>{otherUser.username}</Text>
          <Text style={styles.university}>{otherUser.university}</Text>
          <Text style={styles.bio}>{otherUser.bio}</Text>

          <TouchableOpacity
            style={[styles.friendButton, isFriend ? styles.removeFriend : (friendRequestPending ? styles.pendingButton : styles.addFriend)]}
            onPress={isFriend ? handleRemoveFriend : (friendRequestPending ? handleCancelFriendRequest : handleAddFriend)}
          >
            <Text style={styles.friendButtonText}>{isFriend ? 'Remove Friend' : (friendRequestPending ? 'Pending' : 'Add Friend')}</Text>
          </TouchableOpacity>

          <Text style={styles.bookmarkTitle}>Bookmarked Posts</Text>
          <FlatList
            data={otherUser.bookmarkedPosts || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.bookmarkedPost}>
                <Image source={{ uri: item.imageUrl }} style={styles.bookmarkedImage} />
              </View>
            )}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    fontSize: 16,
    color: 'blue',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 24,
    marginLeft: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  friendName: {
    color: 'green',
  },
  university: {
    fontSize: 16,
    color: 'gray',
  },
  bio: {
    fontSize: 14,
    marginVertical: 8,
  },
  friendButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 16,
  },
  addFriend: {
    backgroundColor: 'orange',
  },
  pendingButton: {
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 1,
  },
  removeFriend: {
    backgroundColor: 'white',
    borderColor: 'orange',
    borderWidth: 1,
  },
  friendButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  bookmarkedPost: {
    marginVertical: 8,
  },
  bookmarkedImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
});

export default OtherUserProfileScreen;


     
