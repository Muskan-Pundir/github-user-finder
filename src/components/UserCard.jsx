import { Box, Card, Chip, Grid2 as Grid, Typography } from "@mui/material";
import { CONSTANTS } from "../Constants";
import { useEffect, useState } from "react";
import axios from "axios";
import noUserFoundImg from "../assets/images/gitNoUserFound.png";
import "./UserCard.css";

const UserCard = ({ user, error, theme }) => {

  const [userRepositoryList, setUserRepositoryList] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const res = await axios.get(user.repos_url);
        if (res.status === 200) {
          setUserRepositoryList(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchRepositories();
  }, [user.repos_url, user]);

  return (
    <>
      {user.id && error !== CONSTANTS.ERROR_MESSAGE ? (
        <div
          className={`user-details-container ${
            theme === "dark" ? "dark-mode" : "light-mode"
          }`}
        >
          <div className="user-sub-container user-info">
            <div className={`github-user-image ${theme==="dark" ? "image-dark-mode" : "image-light-mode"}`}>
              <img src={user.avatar_url} alt={user.login} />
            </div>
            <h2>{user.name || user.login}</h2>

            <p>{user.bio || "No bio available"}</p>
            <div className="user-details">
              <span>Followers: {user.followers}</span>
              <span>Following: {user.following}</span>
            </div>
          </div>
          <div className="user-sub-container ">
            {userRepositoryList?.length > 0 ? (
              userRepositoryList?.map((repo) => {
                return (
                  <Card
                    key={repo.id}
                    className={`repo-card ${
                      theme === "dark" ? "dark-mode-card" : "light-mode-card"
                    }`}
                    sx={{
                      minWidth: {
                        xs: "280px",
                        sm: "300px",
                        md: "200px",
                        lg: "300px",
                      },
                    }}
                  >
                    <Grid container spacing={2} size={12} padding={2}>
                      <Grid size={{ sm: 8, xs: 8, md: 8, lg: 8, xl: 8 }}>
                        {repo.name}
                      </Grid>
                      <Grid
                        size={{ sm: 4, xs: 4, md: 4, lg: 4, xl: 4 }}
                        textAlign={"right"}
                      >
                        {repo.private ? (
                          <Chip
                            sx={
                              theme === "dark"
                                ? { color: "white", border: "1px solid white" }
                                : { color: "black", border: "1px solid black" }
                            }
                            variant="outlined"
                            label={"Private"}
                          />
                        ) : (
                          <Chip
                            sx={
                              theme === "dark"
                                ? { color: "white", border: "1px solid white" }
                                : { color: "black", border: "1px solid black" }
                            }
                            label={"Public"}
                            variant="filled"
                          />
                        )}
                      </Grid>
                      <Grid size={12}>{repo.language}</Grid>
                    </Grid>
                  </Card>
                );
              })
            ) : (
              <div>
                <div className="no-data-found">
                  <img
                    src={noUserFoundImg}
                    width={"100%"}
                    height={"100%"}
                    alt="No user found"
                  />
                </div>
                <Typography fontSize={"30px"} fontFamily={"fantasy"}>
                  {CONSTANTS.NO_REPO_FOUND}
                </Typography>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <div className="no-data-found">
            <img
              src={noUserFoundImg}
              width={"100%"}
              height={"100%"}
              alt="No user found"
            />
          </div>
          <Typography fontSize={"30px"} fontFamily={"fantasy"}>
            {CONSTANTS.ERROR_MESSAGE}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default UserCard;
