import { Box, Typography } from "@mui/material";
import { CONSTANTS } from "../Constants";

const UserCard = ({ user, error }) => {
  return (
    <>
      {user.id && error !== CONSTANTS.ERROR_MESSAGE ? (
        <div className="p-6 shadow-lg rounded bg-gray-100 dark:bg-gray-800">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h2 className="text-xl font-bold text-center mt-2">
            {user.name || user.login}
          </h2>
          <p className="text-center">{user.bio || "No bio available"}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
        </div>
      ) : (
        <Box>
          <Typography>{CONSTANTS.ERROR_MESSAGE}</Typography>
        </Box>
      )}
    </>
  );
};

export default UserCard;
