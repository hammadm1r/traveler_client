import { useEffect, useState } from "react";
import ProfileImage from "./ProfileImage";
import { axiosClient } from "../utils/axiosClient";
import toast from "react-hot-toast";
import { GiAchievement } from "react-icons/gi";
import { formatDistanceToNow } from "date-fns";

const Notifications = ({ notifications }) => {
  // Notification Messages Map
  const notificationMessages = {
    like: "liked your post! ❤️",
    comment: "commented on your post! 💬",
    follow: "followed you! 🔥",
    Achivement: "You Got An Achievement!",
  };

  return (
    <div className="max-w-2xl mx-au">
      {/* Header Section */}
          <div className=" md:min-h-24 min-h-16 bg-gradient-to-r from-blue-400 to-teal-400 text-white md:py-4 text-center">
    </div>
      <h2 className="text-xl font-bold mt-3 text-gray-700 text-center mb-4">
        🔔 Notifications
      </h2>

      {/* Scrollable Notification List */}
      <div className="min-h-dvh overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border-b-2 hover:bg-gray-100 transition-all duration-300"
            >
              {/* Profile Image */}
              <ProfileImage
                userProfileImage={notif.sender.profilePicture.url}
                userId={notif.sender._id}
              />

              {/* Notification Text */}
              <div className="flex flex-col">
                <p className="text-gray-700 text-sm md:text-base">
                  <span className="font-semibold">
                    {notif?.sender?.username}
                  </span>{" "}
                  {notificationMessages[notif.type] || "performed an action!"}
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  {formatDistanceToNow(new Date(notif.createdAt))} ago{" "}
                  {/* Display time */}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No new notifications 🚀</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
