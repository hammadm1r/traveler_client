import React from 'react'; // Add this line at the top
import { KEY_ACCESS_TOKEN, getItem } from "../utils/LocalStorageManager";
import { Navigate, Outlet } from 'react-router-dom';

function OnlyIfUserNotLoggedIn() {
    const user = getItem(KEY_ACCESS_TOKEN)
    console.log(user)
  return (
    user ? <Navigate to="/home" /> : <Outlet />
  )
}

export default OnlyIfUserNotLoggedIn

