import { createSlice,asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient"
export const getFeedData = createAsyncThunk('/user/feed',async()=>{
    const response = await axiosClient.get("/user/feed");
    console.log('response')
    return response.data;
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
            state.feedData = action.payload;
    })
    }
})
export default feedSlice.reducer;