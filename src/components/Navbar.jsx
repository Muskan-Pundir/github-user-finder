import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import axios from "axios";
import { useNavigate } from "react-router";
import { Snackbar, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setError, setUserDetails } from "../store/features/userSlice";
import { CONSTANTS } from "../Constants";
import { Home } from "@mui/icons-material";

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

const Navbar = ({ theme, setTheme }) => {
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
            dispatch(setUserDetails(res.data));
            setMessage(CONSTANTS.USER_FOUND);
            dispatch(setError(""));
            navigate(`/profile/${userName}`);
          }
        } catch (error) {
          navigate(`/profile/${userName}`);
          setMessage(CONSTANTS.ERROR_MESSAGE);
          setSnackbarOpen(true);
        }
      } else {
        setMessage("Please enter a username");
        setSnackbarOpen(true);
      }
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const onSearchInputChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme === "light" ? "black" : "#424242",
        color: "white",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          <Home />
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
            sx={{ color: "white" }}
          />
        </Search>
        <Tooltip title={theme === "light" ? "Set Dark Mode" : "Set Light Mode"}>
          <IconButton
            className="theme-toggle"
            sx={{ color: "white", ml: 2 }}
            onClick={toggleTheme}
          >
            {theme === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={snackbarOpen}
        onClose={handleClose}
        message={message}
        autoHideDuration={2000}
      />
    </AppBar>
  );
};

export default Navbar;
