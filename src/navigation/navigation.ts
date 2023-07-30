export type RootStackParamList = {
  Home: undefined;
  Details: {
    images: any[];
    selectedImage: any;
    currentImageIndex: number;
    goToNextImage: (
      currentImageIndex: number,
      setCurrentImageIndex: any,
      setSelectedImage: any,
      showLikedImages: any,
      getLikedImages: any,
      allImages: any,
    ) => void;
    goToPreviousImage: (
      currentImageIndex: number,
      setCurrentImageIndex: any,
      setSelectedImage: any,
      showLikedImages: any,
      getLikedImages: any,
      allImages: any,
    ) => void;
    handleLikeImage: (imageId: string) => void;
  };
};
