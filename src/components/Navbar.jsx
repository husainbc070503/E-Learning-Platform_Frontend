import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../contexts/AppContext";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { user, handleLogout } = useGlobalContext();
  const [open, setOpen] = React.useState(false);

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            fontSize={22}
            fontWeight="bold"
            sx={{ flex: 1 }}
            color="Window"
          >
            E-Learning Platform
          </Typography>
          {!open ? (
            <MenuIcon
              className="MenuIcon nav-icon"
              onClick={() => setOpen(true)}
            />
          ) : (
            <CloseIcon
              className="MenuIcon nav-icon"
              onClick={() => setOpen(false)}
            />
          )}
          <Box className={`Box link-lists ${open && "open-list"}`}>
            <NavLink to="/" className="nav-link">
              <Typography className="Typography">
                {user?.user?.role === "instructor" ||
                user?.user?.role === "student"
                  ? "Courses"
                  : "Home"}
              </Typography>
            </NavLink>
            {user?.user?.role === "instructor" &&
              ["categories", "addCourse"].map((item) => (
                <NavLink to={item} key={item} className="nav-link">
                  <Typography className="Typography">
                    {item[0].toUpperCase() + item.substring(1)}
                  </Typography>
                </NavLink>
              ))}
            {user?.user?.role === "student" && (
              <NavLink to="enrolledCourses" className="nav-link">
                <Typography className="Typography">Enrolled Courses</Typography>
              </NavLink>
            )}
            {user?.user ? (
              <ProfileButton user={user} handleLogout={handleLogout} />
            ) : (
              <Button
                color="secondary"
                variant="contained"
                className="text-light"
              >
                <NavLink to="auth" className="link">
                  Login
                </NavLink>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
