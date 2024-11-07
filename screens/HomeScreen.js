import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import app from '../firebase';

const HomeScreen = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  // Initialize Firebase Auth and Storage
  const auth = getAuth(app);
  const storage = getStorage(app);

  // Load the profile picture from Firebase Storage
  useEffect(() => {
    const loadProfilePicture = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const storageRef = ref(storage, `profilePictures/${user.uid}`);
          const downloadURL = await getDownloadURL(storageRef);
          setProfilePicture(downloadURL);
        }
      } catch (error) {
        console.error('Error loading profile picture:', error);
      }
    };

    loadProfilePicture();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <View style={styles.topAppBar}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
          <Image source={require('../assets/chat.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.appTitle}>MOVE</Text>
      </View>

      {/* Friends looking for a MOVE */}
      <View style={styles.friendsSection}>
        <Text style={styles.sectionTitle}>Friends looking for a MOVE</Text>
        {/* Add your friends' components here */}
      </View>

      {/* Previous MOVES */}
      <View style={styles.previousMovesSection}>
        <Text style={styles.sectionTitle}>Previous MOVES</Text>
        {/* Add your previous moves components here */}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={require('../assets/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SearchUsers')}>
          <Image source={require('../assets/search.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreateMove')}>
          <Image source={require('../assets/create.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AcceptedMoves')}>
          <Image source={require('../assets/checkmark.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profileIcon} />
          ) : (
            <Image source={require('../assets/user.png')} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Ensure bottom nav bar sticks to the bottom
  },
  topAppBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
  },
  friendsSection: {
    padding: 16,
  },
  previousMovesSection: {
    padding: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'black', // Default color for inactive icons
  },
  profileIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomeScreen;

