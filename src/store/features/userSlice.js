import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  errorMessage: "",
  message: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userData = action.payload;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload; // Fix this line
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export default UserSlice.reducer;

export const { setUserDetails, setError, setMessage } = UserSlice.actions;
