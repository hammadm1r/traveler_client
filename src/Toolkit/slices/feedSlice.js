import { createSlice,asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient"

export const getFeedData = createAsyncThunk('/user/feed',async()=>{
    const response = await axiosClient.get("/user/feed");
    return response.data.result;
})

export const likeAndUnlikePost = createAsyncThunk('post/likeAndUnlike', async (body) => {
    try {
        const response = await axiosClient.post("/post/likepost", body);
        return response.data.result;
    } catch (error) {
        return Promise.reject(error);
    }
})

const feedSlice = createSlice({
    name: "feed",
    initialState :{
        feed: [],
        loading: false,
        status: 'idle',
    },
    extraReducers: (builder) => {
        builder.addCase(getFeedData.fulfilled,(state,action) =>{
            state.feed = action.payload;
            state.status = 'succeeded';
    });
        builder.addCase(getFeedData.pending, (state) => {
        state.status = 'loading'; // Handle loading state
      });
        builder.addCase(getFeedData.rejected, (state) => {
        state.status = 'failed'; // Handle failed state
      });
      builder.addCase(likeAndUnlikePost.fulfilled,(state,action)=>{
        const post = action.payload.post;
        const index = state.feed.findIndex(item => item._id === post._id);
        if( index != -1){
            state.feed[index]= post;
        }
    })
    }
})
export default feedSlice.reducer;