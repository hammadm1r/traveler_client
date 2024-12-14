import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice"
export default configureStore ({
    reducer: {
        appConfig: appConfigReducer,
    }
})