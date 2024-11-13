import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const OtherUserProfileScreen = ({ route, navigation }) => {
  const { userId, userData } = route.params || {}; // Fallback to empty object
  const [otherUser, setOtherUser] = useState(userData || {}); // Default to empty object
  const [isFriend, setIsFriend] = useState(false);
  const [friendRequestPending, setFriendRequestPending] = useState(false);
  const [currentUserFriends, setCurrentUserFriends] = useState([]);

  const fetchUserData = async () => {
    if (userData) return; // Skip if userData is already available
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setOtherUser({ id: userDoc.id, ...userDoc.data() });
      } else {
        console.log('User not found');
        setOtherUser({});
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

      await updateDoc(currentUserRef, {
        friends: arrayUnion(`pending_${userId}`),
      });

      await updateDoc(otherUserRef, {
        friendRequests: arrayUnion(auth.currentUser.uid),
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

      await updateDoc(currentUserRef, {
        friends: arrayRemove(`pending_${userId}`),
      });

      await updateDoc(otherUserRef, {
        friendRequests: arrayRemove(auth.currentUser.uid),
      });

      setFriendRequestPending(false);
    } catch (error) {
      console.error('Error cancelling friend request:', error);
    }
  };

  const handleRemoveFriend = async () => {
    Alert.alert('Confirm', 'Are you sure you want to remove this friend?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: async () => {
          try {
            const currentUserRef = doc(db, 'users', auth.currentUser.uid);
            const otherUserRef = doc(db, 'users', userId);

            await updateDoc(currentUserRef, {
              friends: arrayRemove(userId),
            });

            await updateDoc(otherUserRef, {
              friends: arrayRemove(auth.currentUser.uid),
            });

            setIsFriend(false);
          } catch (error) {
            console.error('Error removing friend:', error);
          }
        },
      },
    ]);
  };

  const handleChatPress = () => {
    navigation.navigate('Chat', { userId });
  };

  const handleHideNotifications = () => {
    // Placeholder for hiding notifications
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
                <Text style={styles.icon}>🔕</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Image source={{ uri: otherUser.profilePicture || 'default-image-url' }} style={styles.profilePicture} />
          <Text style={styles.userName}>{otherUser.name}</Text>
          <Text style={styles.userBio}>{otherUser.bio}</Text>
          <Text style={styles.userUniversity}>{otherUser.university}</Text>

          <View style={styles.buttons}>
            {isFriend ? (
              <TouchableOpacity onPress={handleRemoveFriend} style={styles.removeButton}>
                <Text style={styles.buttonText}>Remove Friend</Text>
              </TouchableOpacity>
            ) : (
              <>
                {!friendRequestPending ? (
                  <TouchableOpacity onPress={handleAddFriend} style={styles.addButton}>
                    <Text style={styles.buttonText}>Add Friend</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={handleCancelFriendRequest} style={styles.cancelButton}>
                    <Text style={styles.buttonText}>Cancel Request</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>

          <Text style={styles.bookmarkedTitle}>Bookmarked Posts</Text>
          <FlatList
            data={otherUser.bookmarkedPosts || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Image source={{ uri: item.imageUrl }} style={styles.bookmarkedImage} />
            )}
            ListEmptyComponent={<Text>No bookmarked posts</Text>}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  backButton: { fontSize: 16 },
  rightIcons: { flexDirection: 'row' },
  icon: { marginLeft: 10, fontSize: 20 },
  profilePicture: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  userName: { fontSize: 24, fontWeight: 'bold' },
  userBio: { fontSize: 16, marginTop: 4 },
  userUniversity: { fontSize: 16, color: 'blue', marginTop: 4 },
  buttons: { flexDirection: 'row', marginTop: 10 },
  addButton: { backgroundColor: 'green', padding: 10, borderRadius: 5 },
  removeButton: { backgroundColor: 'red', padding: 10, borderRadius: 5 },
  cancelButton: { backgroundColor: 'gray', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white' },
  bookmarkedTitle: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
  bookmarkedImage: { width: 100, height: 100, marginRight: 10 },
});

export default OtherUserProfileScreen;




     
