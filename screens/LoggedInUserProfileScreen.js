import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoggedInUserProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = route.params; // Get the user data from route parameters

  // Ensure user is defined
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/back.png')} style={styles.backIcon} />
      </TouchableOpacity>

      {/* User Profile Information */}
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userUniversity}>{user.university}</Text>
      <Text style={styles.userBio}>{user.bio}</Text>
      <Text style={styles.friendsCount}>{user.friendsCount} Friends</Text>

      {/* Other sections (previous MOVES, bookmarks, etc.) can go here */}

      {/* Additional content can be added here */}
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
  backButton: {
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
    marginBottom: 5,
  },
  friendsCount: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default LoggedInUserProfileScreen;
