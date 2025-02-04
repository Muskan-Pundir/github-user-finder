import { useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { Box, Grid2, Typography } from "@mui/material";
import githubLightImage from "../assets/images/gitLight.png";
import githubDarkImage from "../assets/images/gitLight.png";
import Navbar from "../Components/Navbar";
import "../pages/home.css";
const Home = ({ theme, setTheme }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className={`home-container app-container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      {/* <SearchBar onSearch={fetchUser} /> */}

      <Box sx={{ mt: 2 }}>
        <div className="grid-container">
          <Grid2
            container
            gap={"50px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid2
              item
              sx={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              className="github-image"
            >
              <div>
                <img
                  width={"100%"}
                  height={"100%"}
                  src={theme === "light" ? githubLightImage : githubDarkImage}
                />
              </div>
            </Grid2>
            <Grid2
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Grid2>
                <Grid2 item>
                  <Typography fontFamily={"cursive"} className="welcome-text">
                    Welcome to Github User Finder App
                  </Typography>
                </Grid2>
              </Grid2>
              <Grid2>
                <Typography fontFamily={"monospace"} className="subtitle-text">
                  Search a user to get the information
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </div>
      </Box>
    </div>
  );
};

export default Home;
