import {useState, useEffect} from 'react';

interface ImageType {
  // Define your image properties here
  id: number;
  src: string;
  photographer: string;
  // Add more properties as needed
}

const useImageNavigation = (
  currentImageIndex: any,
  setCurrentImageIndex: any,
  setSelectedImage: any,
  showLikedImages: boolean,
  getLikedImages: () => ImageType[],
  allImages: ImageType[],
) => {
  const goToNextImage = (): void => {
    if (
      currentImageIndex <
      (showLikedImages ? getLikedImages().length : allImages.length) - 1
    ) {
      setCurrentImageIndex((prevIndex: any) => prevIndex + 1);
      setSelectedImage(
        showLikedImages
          ? getLikedImages()[currentImageIndex + 1]
          : allImages[currentImageIndex + 1],
      );
    }
  };

  const goToPreviousImage = (): void => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex: any) => prevIndex - 1);
      setSelectedImage(
        showLikedImages
          ? getLikedImages()[currentImageIndex - 1]
          : allImages[currentImageIndex - 1],
      );
    }
  };

  useEffect(() => {
    setCurrentImageIndex(0);
    setSelectedImage(showLikedImages ? getLikedImages()[0] : allImages[0]);
  }, [showLikedImages, getLikedImages, allImages]);

  return {
    goToNextImage,
    goToPreviousImage,
  };
};

export default useImageNavigation;
