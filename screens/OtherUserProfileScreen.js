import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { db, auth } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const OtherUserProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [notificationsHidden, setNotificationsHidden] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  // Fetch detailed user data from Firebase
  const fetchUserData = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.id));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user's friend status
  const checkFriendStatus = async () => {
    try {
      const currentUserDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const currentUserData = currentUserDoc.data();

      const isFriend = currentUserData.friends?.includes(user.id);
      const requestSent = currentUserData.friends?.includes(`pending_${user.id}`);
      setIsFriend(isFriend);
      setRequestSent(requestSent);
    } catch (error) {
      console.error('Error checking friend status:', error);
    }
  };

  const handleAddFriend = async () => {
    try {
      const currentUserRef = doc(db, 'users', auth.currentUser.uid);
      const otherUserRef = doc(db, 'users', user.id);

      if (requestSent) {
        // Unsend friend request
        await updateDoc(currentUserRef, {
          friends: arrayRemove(`pending_${user.id}`)
        });
        await updateDoc(otherUserRef, {
          friendRequests: arrayRemove(auth.currentUser.uid)
        });
        setRequestSent(false);
      } else {
        // Send friend request
        await updateDoc(currentUserRef, {
          friends: arrayUnion(`pending_${user.id}`)
        });
        await updateDoc(otherUserRef, {
          friendRequests: arrayUnion(auth.currentUser.uid)
        });
        setRequestSent(true);
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  const handleRemoveFriend = async () => {
    Alert.alert('Remove Friend', 'Are you sure you want to remove this friend?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Confirm',
        onPress: async () => {
          try {
            const currentUserRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(currentUserRef, {
              friends: arrayRemove(user.id)
            });
            setIsFriend(false);
          } catch (error) {
            console.error('Error removing friend:', error);
          }
        }
      }
    ]);
  };

  useEffect(() => {
    fetchUserData();
    checkFriendStatus();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FFA500" style={{ flex: 1 }} />;
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }
//Need to make it so clicking bell makes that user no longer able to see when you are looking for a MOVE
  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => setNotificationsHidden(!notificationsHidden)}>
            <Ionicons name={notificationsHidden ? 'notifications-off' : 'notifications'} size={24} color="black" style={styles.iconSpacing} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userData.profilePicture || 'https://via.placeholder.com/100' }} style={styles.profileImage} />
        <Text style={styles.username}>{userData.name}</Text>
        <Text style={styles.university}>{userData.university}</Text>
        <Text style={styles.description}>{userData.bio}</Text>
        <Text style={styles.LookingForMove}>Looking For A Move</Text>
      </View>

      {/* Friend Button Section */}
      {!isFriend ? (
        <TouchableOpacity
          style={requestSent ? styles.pendingButton : styles.addFriendButton}
          onPress={handleAddFriend}
        >
          <Text style={requestSent ? styles.pendingText : styles.addFriendText}>
            {requestSent ? 'Pending' : 'Add Friend'}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.removeFriendButton} onPress={handleRemoveFriend}>
          <Text style={styles.removeFriendText}>Remove Friend</Text>
        </TouchableOpacity>
      )}
      {/* Bookmark Picture Title */}
      <View style={styles.bookmarkTitle}>
        <Text style={styles.bookmarkTitle}>Bookmark Pictures</Text>
      </View>
      {/* Bookmarked Pictures Section */}
      <ScrollView contentContainerStyle={styles.bookmarkContainer}>
        <View style={styles.imagesRow}>
          {userData.bookmarkedPhotos?.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.bookmarkImage} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50,
    
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  rightIcons: {
    flexDirection: 'row',
  },
  iconSpacing: {
    marginLeft: 15,
    marginRight: 15,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  university: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  LookingForMove: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
  },
  addFriendButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addFriendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pendingButton: {
    backgroundColor: '#CCCCCC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  pendingText: {
    color: '#666',
    fontWeight: 'bold',
  },
  removeFriendButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  removeFriendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookmarkContainer: {
    marginTop: 20,
  },
  bookmarkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookmarkImage: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
});


export default OtherUserProfileScreen;

