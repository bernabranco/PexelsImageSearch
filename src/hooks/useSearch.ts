import {useState} from 'react';
import axios from 'axios';
import {usePaginationContext} from '../context/PaginationContext';

export interface ImageSearchResult {
  images: any[];
  isLoading: boolean;
  error: string | null;
  searchImages: (searchQuery: string, page: number) => Promise<void>;
}

const API_KEY = 'UMpgVtFHSYyEDAmhq8p5aVCvioSGNiPgmfd4Eii25sXwwKj8BFFVqcEg'; // Replace with your Pexels API key

export const useSearch = (): ImageSearchResult => {
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {resetPageCount} = usePaginationContext();

  const searchImages = async (searchQuery: string, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=6&page=${page}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        },
      );

      setImages(response.data.photos);
    } catch (error) {
      setError(
        'An error occurred while fetching the images. Please try again.',
      );
      console.log(error);
    } finally {
      resetPageCount();
      setIsLoading(false);
    }
  };

  return {images, isLoading, error, searchImages};
};
