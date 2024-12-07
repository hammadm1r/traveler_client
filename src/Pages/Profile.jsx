import React from "react";
import ProfileImage from "../Components/ProfileImage";
import UserImage from "../assets/Images/UserImage.jpeg";
import PostCard from "../Components/PostCard";
import profileImage from "../assets/Images/UserImage.jpeg";
const Profile = () => {
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
    <div className="mt-24 md:mx-20 mx-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-center">
        {/* User Image Section */}
        <div className="md:col-span-2 flex justify-center">
          <img
            src={UserImage}
            alt="User"
            className="md:w-72 md:h-72 w-44 h-44 object-cover rounded-full"
          />
        </div>

        {/* User Info Section */}
        <div className="md:col-span-4 text-center md:text-left">
          {/* Stats Section */}
          <div className="max-w-md mx-auto md:mx-0 justify-center bg-bgPrimary rounded-2xl grid grid-cols-3 gap-4 p-4">
            <div className="text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                102
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Followers
              </p>
            </div>
            <div className="border-x-2 border-t-textBox text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                102
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Followings
              </p>
            </div>
            <div className="text-center">
              <p className="md:text-2xl text-lg font-bold text-bgSecondary">
                29
              </p>
              <p className="md:text-md text-sm font-medium text-bgSecondary">
                Posts
              </p>
            </div>
          </div>

          {/* Name and Username Section */}
          <div className="mt-5">
            <p className="text-3xl font-bold text-bgPrimary">
              Hammad Farooq Ahmed Meer
            </p>
            <p className="text-xl font-semibold text-lightText">@hammadm1r</p>
            <p className="text-md md:text-lg font-medium text-left mt-2 text-lightText">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Reiciendis repellendus officia sunt maiores magnam dignissimos
              tenetur, corrupti asperiores blanditiis autem placeat, id labore?
              Necessitatibus, nobis? Debitis atque reprehenderit nobis mollitia?
            </p>
          </div>
        </div>
      </div>
      <div className="flex bg-bgPrimary gap-3 md:gap-10 mt-5 py-3 rounded-xl px-3">
        <p className="text-lg font-semibold text-white hover:text-default">
          Posts
        </p>
        <p className="text-lg font-semibold text-white hover:text-default">
          Trips
        </p>
      </div>
      <div>
        <div className="col-span-12 md:col-span-9 bg-white p-4 border rounded-lg mt-2">
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

export default Profile;
