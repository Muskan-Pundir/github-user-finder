import { useState } from "react";
import axios from "axios";
import UserCard from "../components/UserCard";
import { Box, Grid2, Typography } from "@mui/material";
import githubImage from "../assets/images/githubImage.png";
import Navbar from "../Components/Navbar";
import "../pages/home.css";
const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="home-container">
      <Navbar />
      {/* <SearchBar onSearch={fetchUser} /> */}

      <Box sx={{ mt: 2 }}>
        <div className="grid-container">
          <Grid2 container gap={"50px"}>
            <Grid2
              item
              sx={{
                background: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="github-image"
            >
              <div>
                <img src={githubImage} />
              </div>
            </Grid2>
            <Grid2 item>
              <Grid2 container>
                <Grid2 item>
                  <Typography fontSize={"40px"}>
                    Welcome to Github User Finder App
                  </Typography>
                </Grid2>
              </Grid2>
              <Grid2>
                <div className="welcome-text">
                  <Typography fontSize={"30px"}>
                    Just one click away from your information
                  </Typography>
                </div>
              </Grid2>
            </Grid2>
          </Grid2>
        </div>
      </Box>
    </div>
  );
};

export default Home;
