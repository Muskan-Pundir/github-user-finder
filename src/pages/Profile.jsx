import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import UserCard from "../components/UserCard";
import { useParams } from "react-router";
import axios from "axios"; // Ensure axios is imported
import { setError, setUserDetails } from "../store/features/userSlice";
import { CONSTANTS } from "../Constants";

const Profile = () => {
  const userData = useSelector((state) => state.user.userData);
  const error = useSelector((state) => state.user.errorMessage);
  const { username } = useParams();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(userData);
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    const fetchUser = async () => {
      if (username) {
        try {
          const res = await axios.get(
            `https://api.github.com/users/${username}`
          );
          if (res.status === 200) {
            setUserDetails(res.data); // Dispatch user data
            setErrorMessage("");
          }
        } catch (error) {
          console.log(error);

          setErrorMessage(CONSTANTS.ERROR_MESSAGE);
        }
      }
    };

    fetchUser(); // Call the function
  }, [username, dispatch]); // Add dependencies to avoid stale closures

  return (
    <>
      <Navbar />
      <UserCard user={userDetails} error={errorMessage} />
    </>
  );
};

export default Profile;
