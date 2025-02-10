import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice"
import feedReducer from "./slices/feedSlice";
import storyReducer from "./slices/storySlice";
import userProfileReducer from "./slices/userProfileSlice"
export default configureStore ({
    reducer: {
        appConfig: appConfigReducer,
        feed: feedReducer,
        userProfile: userProfileReducer,
        story:storyReducer,
    }
})