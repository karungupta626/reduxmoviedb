import { ChangeEvent, useState } from "react";
import { IUsers } from "../../types/IUsers";
import { UsersService } from "../services/UserServices";
import { Button, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import { useWishlist } from "../Wishlist/WishlistContext";
import "./SearchPage.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { searchAsync, setQuery } from "../Reducers/SearchReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IWishlistItem } from "../../types/wishlistTypes";
const SearchPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IUsers[]>([]);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { query } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };
  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const action = await dispatch(searchAsync(query));
    if (searchAsync.fulfilled.match(action)) {
      setMovies(action.payload);
    }
  };
  
  
  //wishlist
  const handleAddToWishlist = (
    card: IUsers,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const wishlistItem: IWishlistItem = {
      id: Number(card.id),
      name: card.name,
      image: card.image?.original || "",
    };
    addToWishlist(wishlistItem);
  };
  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
  };
  // pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 14;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <div className="search-container">
      <Sidebar />
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search Movies..."
          value={query}
          onChange={handleSearchValueChange}
        />
        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </button>
      </form>
      <br />
      <br />
      <div className="grid-container">
        {movies.slice(startIndex, endIndex).map((movie) => (
          <div key={movie.id} className="scene">
            <Link to={`/shows/${movie.id}`}>
              <div className="card">
                {movie.image && (
                  <img src={movie.image.original} alt={movie.name} />
                )}
                <div className="card-content">
                  <p>
                    {wishlistItems.some((item) => item.id === movie.id) ? (
                      <Button
                        variant="contained"
                        color="error"
                        style={{ height: "40px", marginLeft: "20px" }}
                        onClick={() => handleRemoveFromWishlist(movie.id)}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="info"
                        style={{ height: "40px", marginLeft: "20px" }}
                        onClick={(e) => handleAddToWishlist(movie, e)}
                      >
                        <i className="fa-regular fa-heart"></i>
                      </Button>
                    )}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {movies.length > itemsPerPage && (
        <Pagination
          variant="outlined"
          color="secondary"
          className="pagination-div"
          count={Math.ceil(movies.length / itemsPerPage)}
          page={page}
          onChange={(_event, value) => setPage(value)}
        />
      )}
    </div>
  );
};
export default SearchPage;
