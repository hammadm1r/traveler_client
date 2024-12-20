import { createSlice,asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient"
export const getFeedData = createAsyncThunk('/user/feed',async()=>{
    const response = await axiosClient.get("/user/feed");
    return response.data.result;
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
    }
})
export default feedSlice.reducer;