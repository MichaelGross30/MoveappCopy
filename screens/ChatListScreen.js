import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';

const ChatListScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);

  // Sample chat data (Replace this with Firebase data later)
  const sampleChats = [
    {
      id: '1',
      profileImg: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
      name: 'Nick Miller',
      lastMessage: 'Looking forward to our collaboration!',
    },
    {
      id: '2',
      profileImg: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb',
      name: 'Ashley',
      lastMessage: 'Amazing!! 🔥🔥🔥',
    },
    {
      id: '3',
      profileImg: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128',
      name: 'Max',
      lastMessage: 'Appreciate the opportunity to connect and share insights.',
    },
    {
      id: '4',
      profileImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      name: 'Schmidt',
      lastMessage: "Let's bring creativity to the forefront of our discussions.",
    },
    {
      id: '5',
      profileImg: 'https://images.unsplash.com/photo-1553240799-36bbf332a5c3',
      name: 'Dwight',
      lastMessage: 'Excited to explore opportunities for collaboration.',
    },
  ];

  // Set the sample data
  useEffect(() => {
    setChats(sampleChats);

    // Firebase setup (Uncomment this section when ready to integrate Firebase)
    /*
    const db = getFirestore();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const fetchChats = async () => {
      try {
        const chatsSnapshot = await getDocs(collection(db, 'chats'));
        const chatData = chatsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatData);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
    */
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerAction} />
          <View style={styles.headerAction}>
            <TouchableOpacity onPress={() => navigation.navigate('NewChatScreen')}>
              <FeatherIcon color="#266EF1" name="edit" size={21} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Chat List */}
      <ScrollView>
        {chats.map(({ id, name, lastMessage, profileImg }) => (
          <View key={id} style={styles.cardWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ConversationScreen', { chatId: id })}
              style={styles.card}
            >
              <Image
                alt=""
                resizeMode="cover"
                source={{ uri: profileImg }}
                style={styles.cardImg}
              />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text ellipsizeMode="tail" numberOfLines={1} style={styles.cardContent}>
                  {lastMessage}
                </Text>
              </View>
              <View style={styles.cardIcon}>
                <FeatherIcon color="#ccc" name="chevron-right" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#DFDFE0',
    marginLeft: 16,
  },
  card: {
    height: 66,
    paddingRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardImg: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardBody: {
    maxWidth: '100%',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  cardContent: {
    fontSize: 15,
    fontWeight: '500',
    color: '#737987',
    lineHeight: 20,
    marginTop: 4,
  },
  cardIcon: {
    alignSelf: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
});
