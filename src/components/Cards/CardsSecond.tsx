import React, { useState, useEffect } from "react";
import { UsersService } from "../services/UserServices";
import { Button, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./Cards.scss";
import { IUsers } from "../../types/IUsers";
import { useWishlist } from "../Wishlist/WishlistContext";
import { IWishlistItem } from "../../types/wishlistTypes";
interface IShowCardProps {
  show: IUsers;
}
const TopRatedShows: React.FC = () => {
  const navigate = useNavigate();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [shows, setShows] = useState<IUsers[]>([]);
  // network access
  const getTopRatedShows = async (): Promise<IUsers[]> => {
    const topRatedShows = await UsersService.getTopRatedShows();
    return topRatedShows;
  };
  useEffect(() => {
    const fetchTopRatedShows = async () => {
      const topRatedShows = await getTopRatedShows();
      setShows(topRatedShows);
    };
    fetchTopRatedShows();
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
  // pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 21;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <>
      <h2 style={{ color: "red", textAlign: "left", marginLeft: "170px" }}>
        Top Rated
      </h2>
      <div className="grid-container">
        {shows.slice(startIndex, endIndex).map((user) => (
          <div key={user.id} className="scene">
            <Link to={`/shows/${user.id}`}>
            <div className="card">
              {user.image && <img src={user.image.original} alt={user.name} />}
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
                        onClick={(e) => handleAddToWishlist(user,e)}
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
        count={Math.ceil(shows.length / itemsPerPage)}
        page={page}
        onChange={(_event, value) => setPage(value)}
      />
    </>
  );
};
export default TopRatedShows;
