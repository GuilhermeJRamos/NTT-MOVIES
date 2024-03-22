import { Action, createReducer, on } from '@ngrx/store';
import { addFavorite, removeFavorite } from './favorite.actions';

export const initialState = false;

const _favoriteReducer = createReducer(
  initialState,
  on(addFavorite, () => true),
  on(removeFavorite, () => false)
);

export function favoriteReducer(state: boolean | undefined, action: Action) {
  return _favoriteReducer(state, action);
}
