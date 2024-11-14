import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const PhotoGallery = ({ images, onImagePress }) => {
  // Render each image in a grid
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => onImagePress && onImagePress(item)}
      style={styles.imageContainer}>
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={styles.gallery}
    />
  );
};

// Styles to make the component look like Instagram's grid
const styles = StyleSheet.create({
  gallery: {
    flexGrow: 1,
    padding: 1,
  },
  imageContainer: {
    flex: 1,
    margin: 1,
    aspectRatio: 1, // Makes each image a square
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default PhotoGallery;
