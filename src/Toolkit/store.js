import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice"
import feedReducer from "./slices/feedSlice";
export default configureStore ({
    reducer: {
        appConfig: appConfigReducer,
        feed: feedReducer,
    }
})