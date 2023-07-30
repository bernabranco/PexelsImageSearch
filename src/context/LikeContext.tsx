import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface LikesContextType {
  likedImages: string[];
  likeImage: (imageId: string) => void;
  unlikeImage: (imageId: string) => void;
  isImageLiked: (imageId: string) => boolean;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

interface LikesProviderProps {
  children: ReactNode;
}

export const LikesProvider: React.FC<LikesProviderProps> = ({children}) => {
  const [likedImages, setLikedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLikedImages = async () => {
      try {
        const savedLikedImages = await AsyncStorage.getItem('likedImages');
        if (savedLikedImages) {
          setLikedImages(JSON.parse(savedLikedImages));
        }
      } catch (error) {
        console.log('Error fetching likedImages:', error);
      }
    };

    fetchLikedImages();
  }, []);

  useEffect(() => {
    const saveLikedImages = async () => {
      try {
        await AsyncStorage.setItem('likedImages', JSON.stringify(likedImages));
      } catch (error) {
        console.log('Error saving likedImages:', error);
      }
    };

    saveLikedImages();
  }, [likedImages]);

  const likeImage = (imageId: string) => {
    setLikedImages(prevLikedImages => [...prevLikedImages, imageId]);
  };

  const unlikeImage = (imageId: string) => {
    setLikedImages(prevLikedImages =>
      prevLikedImages.filter(id => id !== imageId),
    );
  };

  const isImageLiked = (imageId: string) => {
    return likedImages.includes(imageId);
  };

  const contextValue: LikesContextType = {
    likedImages,
    likeImage,
    unlikeImage,
    isImageLiked,
  };

  return (
    <LikesContext.Provider value={contextValue}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikesContext = (): LikesContextType => {
  const context = useContext(LikesContext);

  if (!context) {
    throw new Error('useLikes must be used within a LikesProvider');
  }

  return context;
};
