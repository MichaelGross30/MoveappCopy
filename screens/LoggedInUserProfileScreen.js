import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
// import messaging from '@react-native-firebase/messaging'; // Commented out since it's not needed for testing

const LoggedInUserProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lookingForMove, setLookingForMove] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
          const db = getFirestore();
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.log('User document does not exist');
          }
        } else {
          console.log('No authenticated user found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const toggleLookingForMove = () => {
    const newStatus = !lookingForMove;
    setLookingForMove(newStatus);

    if (newStatus) {
      // Set status to "Looking for MOVE" and notify friends
      console.log(`${user.username} is Looking for a MOVE`);
      // sendNotificationToFriends(); // Commented out for testing

      // Set a timeout to automatically turn off the status after 4 hours
      setTimeout(() => {
        setLookingForMove(false);
        console.log(`${user.username} is no longer Looking for a MOVE (timeout)`);
        // Update the status in Firestore if needed
        updateMoveStatusInFirestore(false);
      }, 4 * 60 * 60 * 1000); // 4 hours in milliseconds

      // Update the status in Firestore
      updateMoveStatusInFirestore(true);
    } else {
      // Turn off the "Looking for MOVE" status
      console.log(`${user.username} is no longer Looking for a MOVE`);
      updateMoveStatusInFirestore(false);
    }
  };

  // Commenting out notification functions for testing
  /*
  const sendNotificationToFriends = async () => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const db = getFirestore();

      if (currentUser) {
        const friendsSnapshot = await getDocs(collection(db, 'users', currentUser.uid, 'friends'));
        const friendTokens = [];

        friendsSnapshot.forEach((friendDoc) => {
          const friendData = friendDoc.data();
          if (friendData.fcmToken) {
            friendTokens.push(friendData.fcmToken); // Assuming the token is stored in each friend's document
          }
        });

        // Send notifications to all friends
        for (const token of friendTokens) {
          await sendNotification(token, `${user.username} is looking for a MOVE!`);
        }
      }
    } catch (error) {
      console.error('Error sending notifications to friends:', error);
    }
  };

  const sendNotification = async (token, message) => {
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'key=BFBdS1yrHsAo4fUMNITrHYHYGFbEq_9aro9dv9oQZIO_cmUdEhW02jYmFM2kv9uvZv1YuXvWsWnjBBOPRvCZ5bs', // Replace with your FCM server key
        },
        body: JSON.stringify({
          to: token,
          notification: {
            title: 'MOVE Alert!',
            body: message,
          },
        }),
      });

      if (response.ok) {
        console.log('Notification sent successfully to', token);
      } else {
        console.error('Failed to send notification:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };
  */

  const updateMoveStatusInFirestore = async (status) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const db = getFirestore();
        const userDocRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userDocRef, { lookingForMove: status });
      }
    } catch (error) {
      console.error('Error updating move status:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // If user data is still not available
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>User data not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* User Profile Information */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
        <View style={styles.friendsCountContainer}>
          <Text style={styles.friendsCount}>{user.friendsCount}</Text>
          <Text style={styles.friendsLabel}>Friends</Text>
        </View>
      </View>

      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userUniversity}>{user.university}</Text>
      <Text style={styles.userBio}>{user.bio}</Text>

      {/* "LOOKING FOR MOVE" and "Turn Off" buttons */}
      <TouchableOpacity
        style={lookingForMove ? styles.turnOffButton : styles.lookingForMoveButton}
        onPress={toggleLookingForMove}
      >
        <Text style={lookingForMove ? styles.turnOffButtonText : styles.lookingForMoveButtonText}>
          {lookingForMove ? 'Stop Looking for MOVE' : 'LOOKING FOR MOVE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  friendsCountContainer: {
    marginLeft: 20,
    alignItems: 'center',
  },
  friendsCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  friendsLabel: {
    fontSize: 14,
    color: 'gray',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userUniversity: {
    fontSize: 16,
    color: 'blue',
    marginBottom: 5,
  },
  userBio: {
    fontSize: 14,
    marginBottom: 10,
  },
  lookingForMoveButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  lookingForMoveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  turnOffButton: {
    borderWidth: 1,
    borderColor: 'orange',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  turnOffButtonText: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoggedInUserProfileScreen;



