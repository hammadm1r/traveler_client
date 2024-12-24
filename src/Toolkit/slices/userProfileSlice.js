import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import {axiosClient} from "../../utils/axiosClient"; // Assuming you have this axios client set up.

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      // Make sure you are sending the correct API call and parameters
      const response = await axiosClient.get(`/user/getUserProfile/${userId}`);
      return response.data; // Adjust based on your response structure
    } catch (error) {
      console.log(error)
      return error.response;
    }
  }
);
export const followAndUnfollowUser = createAsyncThunk('user/followAndUnfollow',async(body)=>{
  try {
      const response = await axiosClient.post("/user/follow",body);
      console.log(response.data.result);
      return response.data.result;
  } catch (error) {
      return Promise.reject(error);
  }
})


const userProfileSlice = createSlice({
  name: "userProfile",
  initialState :{
    user: {},
    isFollowing:false,
    posts:{},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous error
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.userProfile; // Store user profile data
        state.posts = action.payload.data.posts;
        state.isFollowing = action.payload.data.isFollowing;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.data.message; // Store error message if request fails
      })
      .addCase(followAndUnfollowUser.pending,(state) =>{
        state.loading = true;
      })
      .addCase(followAndUnfollowUser.rejected, (state, action) => {
        state.status = 'failed'; // Handle failed state
        state.error = action.payload;
      })
      .addCase(followAndUnfollowUser.fulfilled, (state, action) => {
        state.loading = false;
         state.user.followers = action.payload.user.followersCount;
         state.user.following = action.payload.user.followingCount;
         state.isFollowing = action.payload.user.isFollowing;
      });
  },
});

export default userProfileSlice.reducer;
