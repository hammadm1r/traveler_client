import React, { useEffect } from 'react';
import { KEY_ACCESS_TOKEN, getItem } from '../utils/LocalStorageManager'
import { Navigate,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {getMyInfo, setLoggedIn} from '../Toolkit/slices/appConfigSlice';
import {useDispatch} from 'react-redux';
import { getFeedData } from '../Toolkit/slices/feedSlice';

function RequireUser() {
    const user = getItem(KEY_ACCESS_TOKEN)
    const dispatch = useDispatch()

    const myProfile = useSelector((state) => state.appConfig.myProfile);  // Get profile from Redux
    const status = useSelector((state)=> state.appConfig.status);
    const feedStatus = useSelector((state)=> state.feed.status);
    const feed = useSelector((state)=> state.feed.feed);
    // Fetch user info only if it's not already available
    useEffect(() => {
        if (status === 'idle') {
            dispatch(getMyInfo());
            dispatch(setLoggedIn(true));
        }
        if (feedStatus === 'idle') {
          dispatch(getFeedData());
          console.log(feed);
      }
    }, [dispatch, myProfile]);
  return (
    user ? <Outlet/> : <Navigate to="/login" />
  )
}

export default RequireUser