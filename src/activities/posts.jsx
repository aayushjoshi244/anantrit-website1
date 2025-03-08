import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaUpload,
  FaEdit,
  FaEnvelope,
  FaHeart,
  FaSignOutAlt,
} from "react-icons/fa";
import Button from "../components/Button.jsx";

const PostSection = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);

    // Mock suggested users (replace with API call in a real scenario)
    setSuggestedUsers(["Alice", "Bob", "Charlie"]);
  }, []);

  const handlePostSubmit = () => {
    if (!newPost.trim() || !user) return;

    const post = {
      id: Date.now(),
      text: newPost,
      author: user.fullName,
      comments: [],
      likes: 0,
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    setNewPost("");
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleAddComment = (postId) => {
    if (!comments[postId]?.trim() || !user) return;

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { text: comments[postId], author: user.fullName },
          ],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setComments({ ...comments, [postId]: "" });
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="relative flex min-h-screen bg-gray-900 text-white">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <img
          src="/images/anantrit.svg"
          alt="Anantrit Logo"
          className="w-[35%] h-auto"
        />
      </div>

      {/* Left Sidebar */}
      <div className="w-[200px] p-4 bg-gray-800 bg-opacity-75 min-h-screen flex flex-col justify-between">
        <nav className="space-y-8">
          <Button className="flex items-center gap-3 text-lg w-full max-w-[400px] justify-start px-6 py-3">
            <FaHome className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Home</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaEnvelope className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Message</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaUpload className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Repository</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaEdit className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">New Post</span>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button className="flex items-center justify-center w-full py-2 mt-auto space-x-2">
            <FaUser className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Profile</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl p-5 mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
          <textarea
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button
            onClick={handlePostSubmit}
            className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Post
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center">
              No posts yet. Be the first to post!
            </p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <p className="text-lg font-semibold">{post.author}</p>
                <p className="text-gray-300 mt-2">{post.text}</p>

                {/* Like Button */}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-1 text-red-500 hover:text-red-400"
                  >
                    <FaHeart /> {post.likes}
                  </button>
                </div>

                {/* Comments */}
                <div className="mt-3">
                  <h3 className="text-sm font-semibold text-gray-400">
                    Comments:
                  </h3>
                  {post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                      <p key={index} className="text-gray-300 text-sm mt-1">
                        <span className="font-semibold">{comment.author}:</span>{" "}
                        {comment.text}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No comments yet.</p>
                  )}
                </div>

                {/* Add Comment */}
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-700 rounded-lg bg-gray-900 text-white"
                    placeholder="Write a comment..."
                    value={comments[post.id] || ""}
                    onChange={(e) =>
                      setComments({ ...comments, [post.id]: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                  >
                    Comment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[200px] p-5 bg-gray-800 bg-opacity-75 min-h-screen flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-4">Suggested Users</h3>
          <ul className="space-y-3">
            {suggestedUsers.map((user, index) => (
              <li key={index} className="text-gray-300">
                {user}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout button at the bottom */}
        <Button
          className="flex items-center justify-center w-full py-2 mt-auto space-x-2"
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.reload();
          }}
        >
          <FaSignOutAlt className="w-5 h-5 inline-block flex-shrink-0" />
          <span className="inline-block ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default PostSection;
