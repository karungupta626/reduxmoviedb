import { Dispatch } from "redux";
import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { IWishlistItem } from "../../types/wishlistTypes";
import { addToWishlist, removeFromWishlist } from "../Actions/wishlistActions";
interface IWishlistContext {
  wishlistItems: IWishlistItem[];
  addToWishlist: (card: IWishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}
const WishlistContext = createContext<IWishlistContext>({
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});
const localStorageKey = "wishlist";
export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );
  useEffect(() => {
    const wishlist = localStorage.getItem(localStorageKey);
    if (wishlist && wishlistItems.length === 0) {
      dispatch({
        type: "SET_WISHLIST",
        payload: JSON.parse(wishlist),
      });
    }
  }, [dispatch, wishlistItems]);
  useEffect(() => {
    if (wishlistItems.length > 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);
  const contextValue = {
    wishlistItems,
    addToWishlist: (card: IWishlistItem) => dispatch(addToWishlist(card)),
    removeFromWishlist: (id: number) => dispatch(removeFromWishlist(id)),
  };
  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
export const useWishlist = () => useContext(WishlistContext);
