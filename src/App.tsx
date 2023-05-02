import "./App.css";
import { lazy, Suspense } from "react";
import LoginPage from "./components/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import SearchPage from "./components/SearchBar/SearchPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import DetailPage from "./components/Cards/DetailPage";
import { WishlistProvider } from "./components/Wishlist/WishlistContext";
import Wishlist from "./components/Wishlist/Wishlist";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import { Provider } from 'react-redux';
import { store } from './store';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shows/:id" element={<DetailPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/signup-page" element={<SignUpPage />} />
          <Route path="/wishlist-page" element={<Wishlist />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </WishlistProvider>
      </Provider>
    </div>
  );
}
export default App;
