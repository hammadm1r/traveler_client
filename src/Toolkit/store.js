import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice"
import feedReducer from "./slices/feedSlice";
import userProfileReducer from "./slices/userProfileSlice"
import formSliceReducer from "./slices/formSlice"
export default configureStore ({
    reducer: {
        appConfig: appConfigReducer,
        feed: feedReducer,
        userProfile: userProfileReducer,
        formSlice: formSliceReducer
    }
})