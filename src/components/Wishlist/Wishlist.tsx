import { Button, Pagination } from "@mui/material";
import Sidebar from "../SideBar/Sidebar";
import { useWishlist } from "../Wishlist/WishlistContext";
import "./Wishlist.css";
import "../Cards/Cards.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IWishlistItem } from "../../types/wishlistTypes";
const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  //pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 21;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //remove cards
  const handleRemove = (id: number) => {
    removeFromWishlist(id);
  };
  return (
    <div className="wishlist-div">
      <Sidebar />
      <h2 className="wishlist-header">Wishlist</h2>
      <div className="grid-container">
        {wishlistItems.length > 0 ? (
          wishlistItems
            .slice(startIndex, endIndex)
            .map((item: IWishlistItem) => (
              <div className="card" key={item.id}>
                <Link to={`/shows/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                </Link>
                <br/>
                <div className="card-content">
                  <p>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ height: "40px", marginLeft: "15px" }}
                      onClick={() => handleRemove(item.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </p>
                </div>
              </div>
            ))
        ) : (
          <h4 className="noItems">No items in wishlist.</h4>
        )}
      </div>
      <Pagination
        variant="outlined"
        color="secondary"
        className="pagination-div"
        count={Math.ceil(wishlistItems.length / itemsPerPage)}
        page={page}
        onChange={(_event, value) => setPage(value)}
      />
    </div>
  );
};
export default Wishlist;