import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', { autoConnect: false }); // Prevent multiple connections

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const myProfile = useSelector((state) => state.appConfig.myProfile);
    const userId = myProfile._id;
    console.log(userId);
    useEffect(() => {
        if (!userId) return; // Ensure userId is available

        socket.connect(); // Connect only when userId is available
        socket.emit('join', userId); // Join the room with userId

        // Listen for notifications
        socket.on('newNotification', (notification) => {
            console.log('Received notification:', notification); // Debugging
            setNotifications((prev) => [notification, ...prev]);
        });

        return () => {
            socket.off('newNotification');
            socket.disconnect(); // Prevent multiple connections
        };
    }, [userId]);

    return (
        <div className='text-center mt-20'>
            <h2>Notifications</h2>
            {notifications.length > 0 ? (
                notifications.map((notif, index) => (
                    <div key={index} className="notification">
                        {notif.type === 'like' ? (
                            <p>User {notif.sender} liked your post!</p>
                        ) : (
                            <p>User {notif.sender} followed you!</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No new notifications</p>
            )}
        </div>
    );
};

export default Notifications;
