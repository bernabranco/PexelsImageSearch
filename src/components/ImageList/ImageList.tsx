import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import {useLikesContext} from '../../context/LikeContext';
import {usePaginationContext} from '../../context/PaginationContext';
import {useSearchContext} from '../../context/SearchContext';
import {RootStackParamList} from '../../navigation/navigation';

interface ImageListProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  images: any;
  isLoading: boolean;
  error: string | null;
  searchImages: (searchQuery: string, page: number) => Promise<void>;
  showLikedImages: boolean;
}

type ImageProps = {
  item: any;
  index: number;
};

export default function ImageList({
  navigation,
  images: allImages,
  isLoading,
  error,
  searchImages,
  showLikedImages,
}: ImageListProps) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const {likeImage, unlikeImage, isImageLiked} = useLikesContext();
  const {currentPage} = usePaginationContext();
  const {searchQuery} = useSearchContext();

  const isFocused = useIsFocused();

  // triggered when enter screen
  useEffect(() => {
    if (isFocused) {
      setSelectedImage(null);
    }
  }, [isFocused]);

  // triggered when image page changes
  useEffect(() => {
    if (allImages.length > 0) {
      searchImages(searchQuery, currentPage);
    }
  }, [currentPage]);

  // triggered when press image
  useEffect(() => {
    if (selectedImage) {
      navigation.navigate('Details', {
        images: showLikedImages ? getLikedImages() : allImages,
        selectedImage: selectedImage,
        currentImageIndex,
        goToNextImage: goToNextImage,
        goToPreviousImage: goToPreviousImage,
        handleLikeImage: handleLikeImage,
      });
    }
  }, [selectedImage, showLikedImages]);

  const goToNextImage = () => {
    if (
      currentImageIndex <
      (showLikedImages ? getLikedImages().length : allImages.length) - 1
    ) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
      setSelectedImage(
        showLikedImages
          ? getLikedImages()[currentImageIndex + 1]
          : allImages[currentImageIndex + 1],
      );
    }
  };

  const goToPreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prevIndex => prevIndex - 1);
      setSelectedImage(
        showLikedImages
          ? getLikedImages()[currentImageIndex - 1]
          : allImages[currentImageIndex - 1],
      );
    }
  };

  const getLikedImages = () => {
    return allImages.filter((image: any) => isImageLiked(image.id));
  };

  const handleLikeImage = (imageId: string) => {
    if (isImageLiked(imageId)) {
      unlikeImage(imageId);
    } else {
      likeImage(imageId);
    }
  };

  const images = showLikedImages ? getLikedImages() : allImages;

  const renderItem = ({item, index}: ImageProps) => (
    <TouchableOpacity
      style={styles.touchableImage}
      activeOpacity={0.6}
      onPress={() => {
        setSelectedImage(item);
        setCurrentImageIndex(index);
      }}>
      <>
        <Image source={{uri: item.src.medium}} style={styles.image} />
        <Text style={styles.imageTitle}>{item.photographer}</Text>
        <TouchableOpacity
          onPress={() => handleLikeImage(item.id)}
          style={[
            styles.likeButton,
            {backgroundColor: isImageLiked(item.id) ? 'darkgreen' : 'darkred'},
          ]}>
          <Text style={styles.likeText}>
            {isImageLiked(item.id) ? 'Liked' : 'Not Liked'}
          </Text>
        </TouchableOpacity>
      </>
    </TouchableOpacity>
  );

  return (
    <View style={styles.imageListContainer}>
      {isLoading ? (
        <ActivityIndicator color="white" size="large" style={{flex: 1}} />
      ) : error ? (
        <Text
          style={{
            color: 'white',
            marginTop: 30,
            maxWidth: 300,
            textAlign: 'center',
            lineHeight: 25,
          }}>
          {error}
        </Text>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {showLikedImages && getLikedImages().length === 0 && (
            <Text style={{flex: 1, color: 'white', textAlign: 'center'}}>
              No liked images to display
            </Text>
          )}

          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageListContainer: {
    flex: 1,
    minWidth: '100%',
    alignItems: 'center',
  },
  imageTitle: {
    marginVertical: 10,
    fontWeight: 'bold',
    maxWidth: 150,
    color: 'white',
  },
  touchableImage: {
    margin: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
  likeButton: {
    position: 'absolute',
    padding: 10,
    borderRadius: 400,
    borderColor: 'gray',
    borderWidth: 1,
    top: 10,
    right: 10,
  },
  likeText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 12,
  },
});
