export interface IWishlistItem {
  id: number;
  name: string;
  image: string;
}
export interface IWishlistState {
  wishlistItems: IWishlistItem[];
  isLoading: boolean;
  error: string | null;
}
export const ADD_TO_WISHLIST = "wishlist/ADD_TO_WISHLIST";
export const REMOVE_FROM_WISHLIST = "wishlist/REMOVE_FROM_WISHLIST";
interface AddToWishlistAction {
  type: typeof ADD_TO_WISHLIST;
  payload: IWishlistItem;
}
interface RemoveFromWishlistAction {
  type: typeof REMOVE_FROM_WISHLIST;
  payload: number;
}
export type WishlistActionTypes =
  | AddToWishlistAction
  | RemoveFromWishlistAction;
