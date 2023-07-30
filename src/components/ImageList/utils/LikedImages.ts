export const handleLikeImage = (
  imageId: string,
  isImageLiked: any,
  unlikeImage: any,
  likeImage: any,
) => {
  if (isImageLiked(imageId)) {
    unlikeImage(imageId);
  } else {
    likeImage(imageId);
  }
};

export const getLikedImages = (isImageLiked: any, allImages: any) => {
  return allImages.filter((image: any) => isImageLiked(image.id));
};
