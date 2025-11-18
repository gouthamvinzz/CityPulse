import { useCallback } from 'react';

import { toggleFavoriteId } from '../redux/slices/favoritesSlice';
import { useAppDispatch, useAppSelector } from './useRedux';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.ids);

  const toggleFavorite = useCallback(
    (eventId: string) => {
      dispatch(toggleFavoriteId(eventId));
    },
    [dispatch],
  );

  const isFavorite = useCallback(
    (eventId: string) => Boolean(favorites[eventId]),
    [favorites],
  );

  return {
    favoriteIds: Object.keys(favorites),
    toggleFavorite,
    isFavorite,
  };
};

