import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const ProfileButton = ({ user, handleLogout }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <Button className="Button nav-btn">
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} className="IconButton">
          <Avatar alt="user-profile" src={user?.user?.profile} />
          <Typography className="Typography text-light mx-2" fontSize={19}>
            {user?.user?.name}
          </Typography>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <NavLink to="profile" className="link">
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center" onClick={handleLogout}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </Button>
  );
};

export default ProfileButton;
