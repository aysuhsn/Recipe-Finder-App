import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PiChefHatBold } from "react-icons/pi";
import { Menu, Close } from "@mui/icons-material";
import { FaRegLightbulb, FaLightbulb } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useLanguage } from "../../context/LanguageContext";
import ColorModeContext from "../../context/ColorModeContext";
import LanguageSwitcher from "../LanguageSwitcher";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Navbar.css";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <header className={`navbar ${mode}`}>
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="logo icon-link">
            <PiChefHatBold size={22} />
            <span>Recipe Finder</span>
          </Link>
        </div>

        <div className="navbar-right">
          <Link to="/app" className="icon-link">
            <IoHome />
          </Link>

          <div className="desktop-only">
            <div className="icon-link">
              <LanguageSwitcher />
            </div>
            <button onClick={toggleColorMode} className="theme-btn icon-link">
              {mode === "dark" ? <FaRegLightbulb /> : <FaLightbulb />}
            </button>
          </div>
          <Link to="/app/wishlist" className="navbar-link wishlist-link">
            <Badge badgeContent={wishlistCount} color="secondary">
              <FavoriteIcon className="navbar-icon" />
            </Badge>
          </Link>

          <button
            className="menu-btn mobile-only icon-link"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="dropdown mobile-only">
          <div className="icon-link">
            <LanguageSwitcher />
          </div>
          <button onClick={toggleColorMode} className="theme-btn icon-link">
            {mode === "dark" ? <FaRegLightbulb /> : <FaLightbulb />}
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
