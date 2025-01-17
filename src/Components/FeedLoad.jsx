import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getFeedData } from '../Toolkit/slices/feedSlice';
import Loader from './Loader';

const FeedLoad = () => {
    const dispatch = useDispatch();
    const feedStatus = useSelector((state) => state.feed.status);
    const feed = useSelector((state) => state.feed.feed);

    useEffect(() => {
        if (feedStatus === 'idle') {
            dispatch(getFeedData());
        }
    }, [dispatch, feedStatus]);

    // Render Outlet when feed is available, else render loading or placeholder
    if (feedStatus === 'loading') {
        return <Loader/>
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default FeedLoad;
