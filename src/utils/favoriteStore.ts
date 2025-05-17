import { useEffect, useState } from 'react';

export interface Combination {
  id: string;
  quote: {
    text: string;
    author: string;
  };
  gradient: string;
  imageUrl: string;
  savedAt: number;
}

const FAVORITES_KEY = 'serendipity_favorites';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidCombination = (data: any): data is Combination => {
  return (
    data &&
    typeof data.id === 'string' &&
    data.quote &&
    typeof data.quote.text === 'string' &&
    typeof data.quote.author === 'string' &&
    typeof data.gradient === 'string' &&
    typeof data.imageUrl === 'string' &&
    typeof data.savedAt === 'number'
  );
};

export const saveFavorite = (combination: Omit<Combination, 'id' | 'savedAt'>) => {
  const favorites = getFavorites();
  const newFavorite: Combination = {
    ...combination,
    id: crypto.randomUUID(),
    savedAt: Date.now(),
  };

  const updatedFavorites = [newFavorite, ...favorites];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return newFavorite;
};

export const getFavorites = (): Combination[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidCombination);
  } catch (e) {
    console.error('Error parsing favorites from localStorage', e);
    return [];
  }
};

export const removeFavorite = (id: string) => {
  const favorites = getFavorites();
  const filteredFavorites = favorites.filter((fav) => fav.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Combination[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setFavorites(getFavorites());
    } catch (e) {
      setError('Failed to load favorites. Please try again.');
      console.error('Error loading favorites', e);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_KEY) {
        try {
          setFavorites(getFavorites());
        } catch (e) {
          setError('Failed to update favorites. Please refresh the page.');
          console.error('Error updating favorites', e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addFavorite = (combination: Omit<Combination, 'id' | 'savedAt'>) => {
    try {
      const newFavorite = saveFavorite(combination);
      setFavorites([newFavorite, ...favorites]);
      setError(null);
      return newFavorite;
    } catch (e) {
      setError('Failed to save favorite. Please try again.');
      console.error('Error saving favorite', e);
      throw e;
    }
  };

  const deleteFavorite = (id: string) => {
    try {
      removeFavorite(id);
      setFavorites(favorites.filter((fav) => fav.id !== id));
      setError(null);
    } catch (e) {
      setError('Failed to delete favorite. Please try again.');
      console.error('Error deleting favorite', e);
      throw e;
    }
  };

  return { favorites, addFavorite, deleteFavorite, error };
};