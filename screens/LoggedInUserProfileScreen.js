import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const LoggedInUserProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lookingForMove, setLookingForMove] = useState(false);
  const [photos, setPhotos] = useState([]);

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

    // Mock data for the photo gallery (replace with your actual data later)
    setPhotos([
      { id: '1', uri: 'https://via.placeholder.com/150' },
      { id: '2', uri: 'https://via.placeholder.com/150' },
      { id: '3', uri: 'https://via.placeholder.com/150' },
      { id: '4', uri: 'https://via.placeholder.com/150' },
    ]);
  }, []);

  const toggleLookingForMove = () => {
    const newStatus = !lookingForMove;
    setLookingForMove(newStatus);

    if (newStatus) {
      console.log(`${user.username} is Looking for a MOVE`);
      setTimeout(() => {
        setLookingForMove(false);
        updateMoveStatusInFirestore(false);
      }, 4 * 60 * 60 * 1000);
      updateMoveStatusInFirestore(true);
    } else {
      console.log(`${user.username} is no longer Looking for a MOVE`);
      updateMoveStatusInFirestore(false);
    }
  };

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

  const renderPhoto = ({ item }) => (
    <Image source={{ uri: item.uri }} style={styles.galleryImage} />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>User data not available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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

      {/* "LOOKING FOR MOVE" Button */}
      <TouchableOpacity
        style={lookingForMove ? styles.turnOffButton : styles.lookingForMoveButton}
        onPress={toggleLookingForMove}
      >
        <Text style={lookingForMove ? styles.turnOffButtonText : styles.lookingForMoveButtonText}>
          {lookingForMove ? 'Stop Looking for MOVE' : 'LOOKING FOR MOVE'}
        </Text>
      </TouchableOpacity>

      {/* Photo Gallery Section */}
      <Text style={styles.galleryTitle}>Pictures from Previous MOVES</Text>
      <FlatList
        data={photos}
        renderItem={renderPhoto}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 65,
  },
  friendsCountContainer: {
    marginLeft: 90,
    alignItems: 'center',
    marginTop: 90,
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
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  galleryContainer: {
    paddingLeft: 6,
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default LoggedInUserProfileScreen;




