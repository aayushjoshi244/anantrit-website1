import React, { useState, useEffect } from "react";
import {
  FaHome,
  FaUser,
  FaUpload,
  FaEdit,
  FaEnvelope,
  FaHeart,
  FaSignOutAlt,
  FaFolder,
  FaFileCode,
  FaTrash,
  FaDownload,
  FaShare,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";

const MainSection = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("posts"); // "posts" or "repository"

  // Posts state
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  // Repository state
  const [repositories, setRepositories] = useState([]);
  const [newRepoName, setNewRepoName] = useState("");
  const [newRepoDescription, setNewRepoDescription] = useState("");
  const [newRepoCode, setNewRepoCode] = useState("");
  const [newRepoLanguage, setNewRepoLanguage] = useState("JavaScript");
  const [selectedRepo, setSelectedRepo] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    }

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);

    const storedRepos = JSON.parse(localStorage.getItem("repositories")) || [];
    setRepositories(storedRepos);

    // Mock suggested users (replace with API call in a real scenario)
    setSuggestedUsers(["Alice", "Bob", "Charlie"]);
  }, []);

  // Posts functions
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

  // Repository functions
  const handleRepoSubmit = () => {
    if (!newRepoName.trim() || !user) return;

    const repo = {
      id: Date.now(),
      name: newRepoName,
      description: newRepoDescription,
      code: newRepoCode,
      language: newRepoLanguage,
      author: user.fullName,
      stars: 0,
      forks: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedRepos = [repo, ...repositories];
    setRepositories(updatedRepos);
    setNewRepoName("");
    setNewRepoDescription("");
    setNewRepoCode("");
    localStorage.setItem("repositories", JSON.stringify(updatedRepos));
  };

  const handleDeleteRepo = (repoId) => {
    const updatedRepos = repositories.filter((repo) => repo.id !== repoId);
    setRepositories(updatedRepos);
    localStorage.setItem("repositories", JSON.stringify(updatedRepos));
    if (selectedRepo && selectedRepo.id === repoId) {
      setSelectedRepo(null);
    }
  };

  const handleStarRepo = (repoId) => {
    const updatedRepos = repositories.map((repo) => {
      if (repo.id === repoId) {
        return { ...repo, stars: repo.stars + 1 };
      }
      return repo;
    });

    setRepositories(updatedRepos);
    localStorage.setItem("repositories", JSON.stringify(updatedRepos));
  };

  // Render post section
  const renderPostSection = () => (
    <>
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
            <div key={post.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
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
    </>
  );

  // Render repository section
  const renderRepositorySection = () => (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create a Repository</h2>
        <div className="space-y-3">
          <input
            type="text"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            placeholder="Repository name"
            value={newRepoName}
            onChange={(e) => setNewRepoName(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            placeholder="Description (optional)"
            value={newRepoDescription}
            onChange={(e) => setNewRepoDescription(e.target.value)}
          />
          <select
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white"
            value={newRepoLanguage}
            onChange={(e) => setNewRepoLanguage(e.target.value)}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="Go">Go</option>
            <option value="Ruby">Ruby</option>
            <option value="TypeScript">TypeScript</option>
            <option value="PHP">PHP</option>
          </select>
          <textarea
            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white h-40"
            placeholder="// Paste your code here"
            value={newRepoCode}
            onChange={(e) => setNewRepoCode(e.target.value)}
          />
        </div>
        <button
          onClick={handleRepoSubmit}
          className="w-full mt-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
        >
          Create Repository
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Your Repositories</h2>
        {repositories.length === 0 ? (
          <p className="text-gray-400 text-center">
            No repositories yet. Create your first repository!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
                onClick={() => setSelectedRepo(repo)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <FaFolder className="text-blue-400 mr-2" />
                      <h3 className="text-lg font-semibold">{repo.name}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">
                      {repo.description || "No description"}
                    </p>
                    <div className="flex items-center mt-2 text-sm">
                      <span className="flex items-center mr-4">
                        <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                        {repo.language}
                      </span>
                      <span className="flex items-center mr-4">
                        <FaStar className="text-yellow-400 mr-1" />
                        {repo.stars}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteRepo(repo.id);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedRepo && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{selectedRepo.name}</h2>
            <div className="flex space-x-2">
              <button
                className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300"
                onClick={() => handleStarRepo(selectedRepo.id)}
              >
                <FaStar /> Star
              </button>
              <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300">
                <FaShare /> Share
              </button>
              <button className="flex items-center gap-1 text-green-400 hover:text-green-300">
                <FaDownload /> Download
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={() => setSelectedRepo(null)}
              >
                ✕
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center text-sm text-gray-400">
            <span className="flex items-center mr-4">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
              {selectedRepo.language}
            </span>
            <span className="mr-4">
              Created: {new Date(selectedRepo.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center mr-4">
              <FaStar className="text-yellow-400 mr-1" />
              {selectedRepo.stars}
            </span>
          </div>

          <div className="mt-4 bg-gray-900 p-4 rounded overflow-x-auto">
            <pre className="text-gray-300 whitespace-pre-wrap">
              <code>{selectedRepo.code || "// No code available"}</code>
            </pre>
          </div>
        </div>
      )}
    </>
  );

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
          <Button
            className={`flex items-center gap-3 text-lg w-full max-w-[400px] justify-start px-6 py-3 ${
              activeSection === "posts" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveSection("posts")}
          >
            <FaHome className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Home</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaEnvelope className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Message</span>
          </Button>
          <Button
            className={`flex items-center gap-3 text-lg w-full justify-start ${
              activeSection === "repository" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveSection("repository")}
          >
            <FaUpload className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Repository</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaEdit className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">New Post</span>
          </Button>
          <Button className="flex items-center gap-3 text-lg w-full justify-start">
            <FaShoppingCart className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Let's Shop</span>
          </Button>
        </nav>
        <div className="mt-auto">
          <Button
            className="flex items-center justify-center w-full py-2 mt-auto space-x-2"
            onClick={() => {
              // Use the navigate function to go to the profile page
              navigate("/profile");
              // You can also log to verify it's being called
              console.log("Navigating to profile page");
            }}
          >
            <FaUser className="w-5 h-5 inline-block flex-shrink-0" />{" "}
            <span className="inline-block ml-2">Profile</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl p-5 mx-auto">
        {activeSection === "posts"
          ? renderPostSection()
          : renderRepositorySection()}
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

export default MainSection;
