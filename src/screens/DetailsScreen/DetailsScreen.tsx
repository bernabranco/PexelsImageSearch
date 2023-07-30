import React from 'react';
import ImagePreview from '../../components/ImagePreview';

export default function DetailsScreen({route, navigation}: any): JSX.Element {
  const {
    images,
    selectedImage,
    currentImageIndex,
    goToNextImage,
    goToPreviousImage,
    handleLikeImage,
  } = route.params;

  const closeImagePreview = () => {
    navigation.navigate('Home');
  };

  return (
    <ImagePreview
      images={images}
      selectedImage={selectedImage}
      currentImageIndex={currentImageIndex}
      closeImagePreview={closeImagePreview}
      goToNextImage={goToNextImage}
      goToPreviousImage={goToPreviousImage}
      handleLikeImage={handleLikeImage}
    />
  );
}
