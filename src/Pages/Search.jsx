import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { axiosClient } from "../utils/axiosClient";
import Post from "../Components/Post"; // Or rename it to PostComp if needed
import AddComment from "../Components/AddComment";
import CommentCard from "../Components/CommentCard";
import PostCard from "../Components/PostCard";
import ProfileCard from "../Components/ProfileCard";
import { Navigate, useNavigate } from "react-router";
import { IoSearchSharp } from "react-icons/io5";
const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const query = searchParams.get("query");

  const commentSectionRef = useRef(null);

  const scrollToComment = () => {
    console.log("button Clicked");
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
   const handleSearch = async () => {
    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery) {
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  }
  };

  useEffect(() => {
    console.log("Search query:", query);
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(`/post/search?query=${query}`);
        console.log(res.data.result);
        setSearchResults(res.data.result);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
      <div className="bg-gray-100 min-h-screen  ">
      {/* Header Section */}
          <div className=" md:min-h-24 min-h-16 bg-gradient-to-r from-blue-400 to-teal-400 text-white py-4 text-center">
    </div>
          <div className="mx-auto mt-10 justify-center items-center relative w-full max-w-md border-b-2 pb-3">
            <input
              ref={inputRef}
              className="py-2 px-4 bg-gray-200 rounded-xl pl-10 pr-10 w-full"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <IoSearchSharp
              className="text-2xl absolute right-3 top-1/2 -translate-y-[68%] text-gray-500 cursor-pointer"
              onClick={handleSearch}
            />
          </div>
    <div className="container mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">
        Results for: <span className="text-blue-600">{query}</span>
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="font-bold mt-4 gap-1">Users:</h3>
          {searchResults.users?.length > 0 ? (
            searchResults.users.map((user) => (
              <ProfileCard key={user._id} user={user} />
            ))
          ) : (
            <p>No users found.</p>
          )}

          <h3 className="font-bold mt-4">Posts:</h3>
          {searchResults.posts?.length > 0 ? (
            searchResults.posts.map((post) => (
              <PostCard post={post} />
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default Search;
