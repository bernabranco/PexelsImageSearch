import React from 'react';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useLikesContext} from '../context/LikeContext';

interface ImagePreviewProps {
  images: any;
  selectedImage: any;
  currentImageIndex: number;
  closeImagePreview: () => void;
  goToNextImage: () => void;
  goToPreviousImage: () => void;
  handleLikeImage: (imageId: string) => void;
}

export default function ImagePreview({
  images,
  selectedImage,
  currentImageIndex,
  closeImagePreview,
  goToNextImage,
  goToPreviousImage,
  handleLikeImage,
}: ImagePreviewProps) {
  const {isImageLiked} = useLikesContext();

  console.log(selectedImage);

  return (
    <Modal visible={selectedImage !== null}>
      <View style={styles.modalContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: selectedImage?.src.large}}
            style={styles.modalImage}
          />

          <TouchableOpacity
            onPress={closeImagePreview}
            style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <View style={styles.navigationButtons}>
            <Button
              title="Previous"
              onPress={goToPreviousImage}
              disabled={currentImageIndex === 0}
              color="white"
            />
            <Button
              title="Next"
              onPress={goToNextImage}
              disabled={currentImageIndex === images.length - 1}
              color="white"
            />
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={
              styles.imageTitleModal
            }>{`Photographer: ${selectedImage.photographer}`}</Text>
          <Text
            style={
              styles.imageTitleModal
            }>{`Width: ${selectedImage.width}`}</Text>
          <Text
            style={
              styles.imageTitleModal
            }>{`Height: ${selectedImage.height}`}</Text>
          <TouchableOpacity
            onPress={() => handleLikeImage(selectedImage.id)}
            style={[
              styles.likeButton,
              {
                backgroundColor: isImageLiked(selectedImage.id)
                  ? 'red'
                  : 'green',
              },
            ]}>
            <Text style={styles.likeText}>
              {isImageLiked(selectedImage.id) ? 'Unlike' : 'Like'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'black',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '70%',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageTitleModal: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginVertical: 5,
  },
  navigationButtons: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 25,
    backgroundColor: 'black',
    borderRadius: 1000,
    paddingHorizontal: 15,
  },
  closeButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 50,
    right: 25,
    borderRadius: 1000,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
  likeButton: {
    position: 'absolute',
    width: '100%',
    bottom: 50,
    padding: 10,
    borderRadius: 1000,
    alignItems: 'center',
  },
  likeText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    marginHorizontal: 25,
    marginTop: 30,
  },
});
