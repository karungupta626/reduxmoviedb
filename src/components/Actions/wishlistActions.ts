import { Dispatch } from 'redux';
import { IWishlistItem, WishlistActionTypes, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../../types/wishlistTypes';
export const addToWishlist = (card: IWishlistItem) => {
  return (dispatch: Dispatch<WishlistActionTypes>) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: card,
    });
  };
};
export const removeFromWishlist = (id: number) => {
  return (dispatch: Dispatch<WishlistActionTypes>) => {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: id,
    });
  };
};
