import { combineReducers } from '@reduxjs/toolkit';
import wishlistReducer from '../components/Reducers/wishlistReducer';
import sidebarReducer from "../components/Reducers/sidebarSlice";
import detailReducer from '../components/Reducers/detailReducer';
import searchReducer from '../components/Reducers/SearchReducer';
import authReducer from '../components/Reducers/AuthSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  detail: detailReducer,
  sidebar: sidebarReducer,
  search: searchReducer,
  wishlist: wishlistReducer,  
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
