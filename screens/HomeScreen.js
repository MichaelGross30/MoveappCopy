import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import app from '../firebase';
import FriendsLookingForMoves from '../Components/FriendsLookingForMoves';
import TopNavigationBar from '../Components/TopNavigationBar';

const HomeScreen = ({ navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [friendsLookingForMove, setFriendsLookingForMove] = useState([]);

  const auth = getAuth(app);
  const storage = getStorage(app);

  // Dummy data for Instagram-like posts
  const posts = [
    {
      id: '1',
      username: 'john_doe',
      moveName: 'Beach Party',
      image: 'https://picsum.photos/400/600',
    },
    {
      id: '2',
      username: 'jane_smith',
      moveName: 'Hiking Trip',
      image: 'https://picsum.photos/401/600',
    },
    {
      id: '3',
      username: 'chris_lee',
      moveName: 'Movie Night',
      image: 'https://picsum.photos/402/600',
    },
    {
      id: '4',
      username: 'alex_jones',
      moveName: 'Birthday Bash',
      image: 'https://picsum.photos/403/600',
    },
  ];

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

    // Dummy data for friends looking for a MOVE
    setFriendsLookingForMove([
      { id: '1', name: 'John Doe', profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: '2', name: 'Jane Smith', profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: '3', name: 'Chris Johnson', profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: '4', name: 'Olivia Brown', profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg' },
      { id: '5', name: 'James White', profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ]);
  }, []);

  // Render function for the Instagram-like posts
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.moveName}>{item.moveName}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <TouchableOpacity>
          <FeatherIcon name="heart" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <FeatherIcon name="message-circle" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 16 }}>
          <FeatherIcon name="bookmark" size={24} color="#222" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Top Navigation Bar */}
      <TopNavigationBar navigation={navigation} />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Friends Looking for a MOVE Section */}
        <View style={styles.friendsSection}>
          <FriendsLookingForMoves friendsLookingForMove={friendsLookingForMove} />
        </View>

        {/* Pictures from Previous MOVES Section */}
        <Text style={styles.sectionTitle}>Pictures from Previous MOVES</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // Added padding-top to account for the top bar
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  friendsSection: {
    marginTop: 12, // Adjusted margin to be smaller for the friends section
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingHorizontal: 2,
  },
  postContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  moveName: {
    color: '#888',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;











