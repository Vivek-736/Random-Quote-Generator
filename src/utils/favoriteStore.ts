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

export const saveFavorite = (combination: Omit<Combination, 'id' | 'savedAt'>) => {
  const favorites = getFavorites();
  const newFavorite: Combination = {
    ...combination,
    id: crypto.randomUUID(),
    savedAt: Date.now()
  };
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([newFavorite, ...favorites]));
  return newFavorite;
};

export const getFavorites = (): Combination[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing favorites from localStorage', e);
    return [];
  }
};

export const removeFavorite = (id: string) => {
  const favorites = getFavorites();
  const filteredFavorites = favorites.filter(fav => fav.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Combination[]>([]);
  
  useEffect(() => {
    setFavorites(getFavorites());
    
    const handleStorageChange = () => {
      setFavorites(getFavorites());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const addFavorite = (combination: Omit<Combination, 'id' | 'savedAt'>) => {
    const newFavorite = saveFavorite(combination);
    setFavorites(prev => [newFavorite, ...prev]);
    return newFavorite;
  };
  
  const deleteFavorite = (id: string) => {
    removeFavorite(id);
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };
  
  return { favorites, addFavorite, deleteFavorite };
};