import {
  createSlice,
  asyncThunkCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const getFeedData = createAsyncThunk("/user/feed", async () => {
  try {
    const response = await axiosClient.get("/user/feed");
    console.log(response.data.result)
  return response.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
  
});

export const likeAndUnlikePost = createAsyncThunk(
  "post/likeAndUnlike",
  async (body) => {
    try {
      const response = await axiosClient.post("/post/likepost", body);
      return response.data.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const addComment = createAsyncThunk(
  "post/addComment",
  async(body) => {
    try {
      const response = await axiosClient.post("/post/addcomment", body);
      return response.data.result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
)

export const fetchPostById = createAsyncThunk(
  "feed/fetchPostById",
  async (id) => {
    const response = await axiosClient.get(`/post/${id}`);
    return response.data.result; // Assuming response.data contains the post
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: [],
    loading: false,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedData.fulfilled, (state, action) => {
      state.feed = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(getFeedData.pending, (state) => {
      state.status = "loading"; // Handle loading state
    });
    builder.addCase(getFeedData.rejected, (state) => {
      state.status = "failed"; // Handle failed state
    });
    builder
      .addCase(likeAndUnlikePost.fulfilled, (state, action) => {
        const post = action.payload.post;
        const index = state.feed.findIndex((item) => item._id === post._id);
        if (index != -1) {
          state.feed[index] = post;
        }
      })
      .addCase(fetchPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add the fetched post to the feed array if it's not already present
        const post = action.payload.post;
        const existingPostIndex = state.feed.findIndex((p) => p.id === post.id);

        if (existingPostIndex === -1) {
          // If the post is not in the feed, add it to the array
          state.feed.push(post);
        }
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.fulfilled, (state,action) => {
        state.status = "succeeded";
        const post = action.payload.responsePost;
        const index = state.feed.findIndex((item) => item._id === post._id);
        if (index != -1) {
          state.feed[index] = post;
        }
      })
  },
});
export default feedSlice.reducer;
