import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

// Define an async thunk to fetch profile information
export const getMyInfo = createAsyncThunk(
    "auth/profile", 
    async () => {
        try {
            const response = await axiosClient.get("/auth/profile");
            console.log(response.data.result);
            return response.data.result; // Assuming 'result' contains the user data
        } catch (error) {
            return Promise.reject(error); // Return the error for handling
        }
    }
);

// Create the slice with reducers and async action handlers
const appConfigSlice = createSlice({
    name: "appConfig",
    initialState: {
        isLoading: false,
        myProfile: {},
        toastData: {},
        status: 'idle', // 'idle' indicates no request in progress
        isLoggedIn: false,
    },
    reducers: {
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload; 
          },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        showToast: (state, action) => {
            state.toastData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyInfo.pending, (state) => {
                state.status = 'loading'; // Set to loading while request is in progress
                state.isLoading = true; // Set loading state for UI feedback
            })
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.myProfile = action.payload; // Assuming the API response contains 'user'
                state.status = 'succeeded';
                state.isLoading = false; // Stop loading when the request is done
            })
            .addCase(getMyInfo.rejected, (state) => {
                state.status = 'failed'; // If the request fails, mark the status as failed
                state.isLoading = false;
            });
    }
});

// Export actions for dispatching
export const { setLoading, showToast , setLoggedIn } = appConfigSlice.actions;

// Export the reducer to be used in store
export default appConfigSlice.reducer;
