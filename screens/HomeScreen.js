import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
          <Image source={require('../assets/chat.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FriendRequestsScreen')}>
          <Text>Friend Request Icon</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('MoveInvitationsScreen')}>
          <Text>Move Invitation Icon</Text>
        </TouchableOpacity>
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
          <Image source={require('../assets/user.png')} style={styles.icon} />
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
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
    backgroundColor: '#fff', // Add background color for nav bar visibility
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'black', // Default color for inactive icons
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomeScreen;
