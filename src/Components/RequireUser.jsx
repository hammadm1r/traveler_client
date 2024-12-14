import React, { useEffect } from 'react';
import { KEY_ACCESS_TOKEN, getItem } from '../utils/LocalStorageManager'
import { Navigate,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getMyInfo, setLoggedIn} from '../Toolkit/slices/appConfigSlice';
import {useDispatch} from 'react-redux';

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN)
    const dispatch = useDispatch()
    const myProfile = useSelector((state) => state.appConfig.myProfile);  // Get profile from Redux
    const status = useSelector((state)=> state.appConfig.status);
    // Fetch user info only if it's not already available
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getMyInfo());
            dispatch(setLoggedIn(true));
        }
    }, [dispatch, myProfile]);
  return (
    user ? <Outlet/> : <Navigate to="/login" />
  )
}

export default RequireUser