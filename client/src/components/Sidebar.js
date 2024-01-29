import React from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">
        <HomeIcon />
      </Link>
      <div className="sidebar-middle">
        <Link to="/likedPosts">
          <FavoriteBorderIcon />
        </Link>
        <AccountCircleIcon />
      </div>
      <LogoutIcon />
    </div>
  );
}

export default Sidebar;
