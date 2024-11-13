import React from "react";
import pana from "../assets/Images/Onlineworld-pana1.png";
import Header from "../Components/Header";
import PostCard from "../Components/PostCard";
import profileImage from "../assets/Images/UserImage.jpeg";
const Forum = () => {
  const postData = [
    {
      userImage: profileImage,
      username: "Hammad Farooq Meer",
      timesAgo: "14 minutes ago",
      title: "Journey to the African Safari! Bring your mosquito repellent!",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ultricies risus at lectus tincidunt, in tincidunt eros volutpat...",
      likes: 14,
      comments: 3,
      loc: "Kotli Loharan West,Pakistan",
    },
    {
      userImage: profileImage,
      username: "Sara Ali",
      timesAgo: "1 hour ago",
      title: "Exploring the Swiss Alps!",
      desc: "The breathtaking views of the Alps are a must-see for every traveler. From snowy peaks to charming villages...",
      likes: 25,
      comments: 7,
      loc: "Zurich, Switzerland",
    },
    {
      userImage: profileImage,
      username: "John Doe",
      timesAgo: "3 hours ago",
      title: "Discovering the Beaches of Bali",
      desc: "Golden sands, azure waters, and perfect sunsets—Bali is a dream destination for beach lovers...",
      likes: 38,
      comments: 15,
      loc: "Bali, Indonesia",
    },
    {
      userImage: profileImage,
      username: "Emily Davis",
      timesAgo: "5 hours ago",
      title: "A Taste of Japan",
      desc: "From sushi to ramen, Japan's culinary delights are endless. Each dish tells a story and showcases deep traditions...",
      likes: 45,
      comments: 20,
      loc: "Tokyo, Japan",
    },
    {
      userImage: profileImage,
      username: "Ahmed Khan",
      timesAgo: "2 days ago",
      title: "Camping Under the Northern Lights",
      desc: "Witnessing the aurora borealis was a surreal experience. We camped out in freezing temperatures, but it was worth every second...",
      likes: 52,
      comments: 10,
      loc: "Tromsø, Norway",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header Section */}
      <Header
        titlePage="Forum"
        desc="Share your travel experiences and advice with others."
        img={pana}
      />

      {/* Content Section */}
      <div className="container mx-auto mt-6 grid grid-cols-12 gap-4 px-4 absolute">
        {/* Sidebar or Additional Content Placeholder */}
        <div className="col-span-12 md:col-span-3 p-4 bg-white shadow rounded-lg hidden md:block">
          <p className="text-gray-500">
            Additional content or navigation can go here.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="col-span-12 md:col-span-9 bg-white p-4 border rounded-lg">
          {postData.map((post, index) => (
            <PostCard
              key={index}
              userImage={post.userImage}
              username={post.username}
              timesAgo={post.timesAgo}
              title={post.title}
              desc={post.desc}
              likes={post.likes}
              comments={post.comments}
              loc={post.loc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
