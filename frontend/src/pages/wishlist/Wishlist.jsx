import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./Wishlist.css";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <p>Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title"> Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div className="wishlist-card" key={item.id}>
            <img src={item.image} alt={item.title} className="wishlist-image" />
            <div className="wishlist-content">
              <h3 className="wishlist-name">{item.title.slice(0, 30)}...</h3>
              <p className="wishlist-meta">
                ⏱ {item.readyInMinutes} mins | 🍽 {item.servings} servings
              </p>
              <div className="wishlist-buttons">
                <Link to={`/app/details/${item.id}`} className="wishlist-view">
                  View Recipe
                </Link>
                <button
                  className="wishlist-remove"
                  onClick={() => dispatch(toggleWishlist(item))}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
