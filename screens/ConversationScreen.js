import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const ConversationScreen = ({ route }) => {
  const { chatId, username, userId } = route.params; // Get the chat partner's details from the route
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const navigation = useNavigation();

  const messagesRef = collection(db, 'chats', chatId, 'messages');

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });
    return unsubscribe;
  }, []);

  // Function to send text message
  const handleSend = async () => {
    if (newMessage.trim() !== '' || imageUri) {
      const messageData = {
        text: newMessage,
        senderId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      if (imageUri) {
        const imageUrl = await uploadImage(imageUri);
        messageData.image = imageUrl;
        setImageUri(null);
      }

      await addDoc(messagesRef, messageData);
      setNewMessage('');
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileRef = ref(storage, `chats/${chatId}/${Date.now()}`);
    await uploadBytes(fileRef, blob);
    return await getDownloadURL(fileRef);
  };

  // Function to pick an image
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  // Function to navigate to OtherUserProfileScreen
  const handleUsernamePress = () => {
    navigation.navigate('OtherUserProfileScreen', {
      userId: userId,
      username: username,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header with chat partner's username */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleUsernamePress}>
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.message}>
            {item.text && <Text>{item.text}</Text>}
            {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
          </View>
        )}
      />

      {/* Image Preview */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      {/* Input Field for Messages */}
      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          style={styles.input}
        />
        <TouchableOpacity onPress={handlePickImage}>
          <Text style={styles.button}>📷</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.button}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: { padding: 10, backgroundColor: '#f5f5f5', alignItems: 'center' },
  username: { fontSize: 18, fontWeight: 'bold', color: '#007bff' },
  message: { marginVertical: 5 },
  image: { width: 200, height: 200, borderRadius: 10, marginTop: 5 },
  previewImage: { width: 100, height: 100, marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 },
  button: { marginLeft: 10 },
});

export default ConversationScreen;

