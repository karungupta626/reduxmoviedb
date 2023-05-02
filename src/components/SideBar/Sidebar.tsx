import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleSidebar } from "../Reducers/sidebarSlice";
const drawerWidth = 100;
export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        open={isOpen} 
      >
        <div className="logo-div">
          <img className="logo-sidebar" />
        </div>
        <Drawer />
        <div className="sidebar-div" style={{ height: "100%" }}>
          <div className="search-div" onClick={() => navigate("/search-page")}>
            <br />
            <i className="fa-brands fa-searchengin fa-2xl"></i>
          </div>
          <br />
          <br />
          <div className="movies-div" onClick={() => navigate("/")}>
            <i className="fa-solid fa-house-chimney fa-xl"></i>
          </div>
          <br />
          <br />
          <div className="favorite-div">
            <i
              className="fa-regular fa-star fa-xl"
              onClick={() => navigate("/wishlist-page")}
            ></i>
          </div>
          <br />
          <br />
          <div className="profile-div">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <i className="fa-solid fa-user fa-xl"></i>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/login-page")}>Logout</MenuItem>
            </Menu>
          </div>
          <br />
        </div>
      </Drawer>
    </Box>
  );
}
