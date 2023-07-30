import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageList from '../../components/ImageList/ImageList';
import SearchBar from '../../components/SearchBar';
import {usePaginationContext} from '../../context/PaginationContext';
import {RootStackParamList} from '../../navigation/navigation';

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  images: any;
  isLoading: boolean;
  error: string | null;
  searchImages: (searchQuery: string, page: number) => Promise<void>;
}

export default function HomeScreen({
  navigation,
  images,
  isLoading,
  error,
  searchImages,
}: HomeScreenProps): JSX.Element {
  const {currentPage, nextPage, previousPage} = usePaginationContext();
  const [showLikedImages, setShowLikedImages] = useState(false);

  const toggleLikedImages = () => {
    setShowLikedImages(prevState => !prevState);
  };

  return (
    <View style={styles.homeContainer}>
      <SearchBar search={searchImages} />

      <View style={styles.paginationContainer}>
        <>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={previousPage}>
            <Text style={styles.paginationButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.paginationButtonText}>{currentPage}</Text>
          <TouchableOpacity style={styles.paginationButton} onPress={nextPage}>
            <Text style={styles.paginationButtonText}>Next</Text>
          </TouchableOpacity>
        </>
        <TouchableOpacity
          style={styles.likedImagesButton}
          onPress={toggleLikedImages}>
          <Text style={styles.likedImagesButtonText}>
            {showLikedImages ? 'Show All' : 'Show Liked'}
          </Text>
        </TouchableOpacity>
      </View>

      {images.length === 0 && (
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>No images to display...</Text>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn.naturettl.com/wp-content/uploads/2017/04/22013824/become-professional-wildlife-photographer-1200x675-cropped.jpg',
            }}
          />
        </View>
      )}

      {images.length > 0 && (
        <ImageList
          searchImages={searchImages}
          images={images}
          isLoading={isLoading}
          error={error}
          navigation={navigation}
          showLikedImages={showLikedImages}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  image: {
    position: 'relative',
    flex: 1,
    height: '100%',
    bottom: 0,
  },
  text: {
    color: 'white',
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'black',
    padding: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  paginationContainer: {
    minWidth: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  paginationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderRadius: 400,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  paginationButtonText: {
    color: 'white',
    fontSize: 12,
  },
  likedImagesButton: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    borderRadius: 400,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  likedImagesButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
