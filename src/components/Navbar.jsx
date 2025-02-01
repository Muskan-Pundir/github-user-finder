// import { Link } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import ThemeToggle from "./ThemeToggle";
import axios from "axios";
import { useNavigate } from "react-router";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setMessage,
  setUserDetails,
  UserSlice,
} from "../store/features/userSlice";
import { useParams } from "react-router";
import { CONSTANTS } from "../Constants";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState("");

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const messageData = useSelector((state) => state.user.message);

  const [message, setMessage] = React.useState(messageData);

  const searchUserHandler = () => {};

  const onEnterHandler = async (e) => {
    if (e.key === "Enter") {
      if (userName?.trim() !== "") {
        try {
          const res = await axios.get(
            `https://api.github.com/users/${userName}`
          );
          if (res.status === 200) {
            dispatch(setUserDetails(res.data)); // Dispatch user data
            // dispatch(setMessage(CONSTANTS.USER_FOUND));
            setMessage(CONSTANTS.USER_FOUND);
            dispatch(setError(""));
            navigate(`/profile/${userName}`);
          }
        } catch (error) {
          navigate(`/profile/${userName}`);
          // dispatch(setError(CONSTANTS.ERROR_MESSAGE));
          setMessage(CONSTANTS.ERROR_MESSAGE);
          setSnackbarOpen(true);
        }
      } else {
        // dispatch(setMessage(CONSTANTS.ENTER_A_USERNAME));
        setMessage("Please enter a username");
        setSnackbarOpen(true);
      }
    }
  };

  const onSearchInputChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block", cursor: "pointer" },
          }}
          onClick={() => navigate("/")}
        >
          Github User Finder
        </Typography>
        <Search>
          <SearchIconWrapper>
            <IconButton sx={{ color: "white" }} onClick={searchUserHandler}>
              <SearchIcon />
            </IconButton>
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search username"
            inputProps={{ "aria-label": "search" }}
            onChange={onSearchInputChangeHandler}
            onKeyDown={onEnterHandler}
          />
        </Search>

        {/* <ThemeToggle /> */}
      </Toolbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        onClose={handleClose}
        message={message}
        autoHideDuration={2000}
        // key={vertical + horizontal}
      />
    </AppBar>
  );
};

export default Navbar;
