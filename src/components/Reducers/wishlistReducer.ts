import { IWishlistState, WishlistActionTypes, ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../../types/wishlistTypes";
const initialState: IWishlistState = {
  wishlistItems: [],
  isLoading: false,
  error: null,
};
const wishlistReducer = (state = initialState, action: WishlistActionTypes): IWishlistState => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
export default wishlistReducer;
