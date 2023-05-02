import { IUsers } from "../../types/IUsers";
import { UsersService } from "../services/UserServices";
import "./Cards.scss";
import { Button, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWishlist } from "../Wishlist/WishlistContext";
import { IWishlistItem } from "../../types/wishlistTypes";
interface IState {
  loading: boolean;
  users: IUsers[];
  errorMsg: string;
}
const Cards = () => {
  const navigate = useNavigate();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [movies, setMovies] = useState<IState>({
    loading: false,
    users: [] as IUsers[],
    errorMsg: "",
  });
  //pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 21;
  //network request
  useEffect(() => {
    setMovies({ ...movies, loading: true });
    UsersService.getRecentlyAddedShows()
      .then((shows: IUsers[]) => {
        setMovies({
          ...movies,
          loading: false,
          users: shows,
        });
      })
      .catch((error) => {
        setMovies({
          ...movies,
          loading: false,
          errorMsg: error.message,
        });
      });
  }, []);
  //wishlist
  const handleAddToWishlist = (card: IUsers, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const wishlistItem: IWishlistItem = {
      id: Number(card.id),
      name: card.name,
      image: card.image?.original || "",
    };
    addToWishlist(wishlistItem);
  };
  const { loading, users, errorMsg } = movies;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <>
      {errorMsg && <p>{errorMsg}</p>}
      {loading && <h1>Loading...</h1>}
      <h2 style={{ color: "red", textAlign: "left", marginLeft: "170px" }}>
        Recently Uploaded
      </h2>
      <div className="grid-container">
        {users.slice(startIndex, endIndex).map((user) => (
          <div key={user.id} className="scene">
            <Link to={`/shows/${user.id}`}>
              <div className="card">
                {user.image && (
                  <img src={user.image.original} alt={user.name} />
                )}
                <div className="card-content">
                  <p>
                    {wishlistItems.some((item) => item.id === user.id) ? (
                      <Button
                        variant="contained"
                        color="error"
                        style={{ height: "40px", marginLeft: "20px" }}
                        onClick={() => removeFromWishlist(user.id)}
                      >
                        <i className="fa-solid fa-heart"></i>
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="info"
                        style={{ height: "40px", marginLeft: "20px" }}
                        onClick={(e) => handleAddToWishlist(user, e)}
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
      <Pagination
        variant="outlined"
        color="secondary"
        className="pagination-div"
        count={Math.ceil(users.length / itemsPerPage)}
        page={page}
        onChange={(_event, value) => setPage(value)}
      />
    </>
  );
};
export default Cards;
