import React, { useState } from "react";
import { FaHeart, FaComment, FaEllipsisH, FaRegBookmark, FaBookmark, FaShare } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const demoPosts = [
    {
      id: 1,
      author: "Elon Musk",
      text: "Tesla Bot (Optimus) is now performing useful tasks in our factories. Full autonomy coming sooner than expected!",
      image: "src/activities/feed/givhqq8y.png",
      likes: 5243,
      comments: [
        { author: "Bill Gates", text: "Impressive progress!" },
        { author: "AI Researcher", text: "What's the current failure rate?" }
      ],
      timestamp: "2023-11-15T09:30:00Z"
    },
    {
      id: 2,
      author: "OpenAI",
      text: "Introducing GPT-5: Our most capable and aligned model yet, now with multimodal reasoning capabilities",
      video: "src/activities/feed/openai-unleashes-a-revolutionary-gpt-5-robot-that-shocks-the-world-confirmed-release-ytshorts.savetube.me.mp4",
      likes: 8921,
      comments: [
        { author: "Tech CEO", text: "When will API access be available?" },
        { author: "Developer", text: "The demo was mind-blowing!" }
      ],
      timestamp: "2023-11-14T14:15:00Z"
    },
    {
      id: 3,
      author: "Boston Dynamics",
      text: "Our Atlas robots can now perform parkour routines with 95% success rate in real-world conditions",
      image: "src/activities/feed/xzktqg8g.png",
      likes: 15327,
      comments: [
        { author: "Robotics Fan", text: "This is both amazing and terrifying" },
        { author: "Engineer", text: "What's the power source duration?" }
      ],
      timestamp: "2023-11-13T11:45:00Z"
    },
    {
      id: 4,
      author: "NVIDIA",
      text: "Just unveiled our new AI superchip that delivers 10x performance for large language model training",
      image: "src/activities/feed/n1qarrl5.png",
      likes: 7210,
      comments: [
        { author: "Data Scientist", text: "Pricing?" },
        { author: "AI Lead", text: "Game changer for our research" }
      ],
      timestamp: "2023-11-12T16:20:00Z"
    },
    {
      id: 5,
      author: "Neuralink",
      text: "First human trials of our brain-computer interface begin next month. Applications now open for qualified participants",
      video: "src/activities/feed/elon-musk-s-neuralink-live-demo-actually-shocks-the-enite-industry-elon-musk-neuralink-update-ytshorts.savetube.me.mp4",
      likes: 18432,
      comments: [
        { author: "Neurosurgeon", text: "What safety measures are in place?" },
        { author: "Futurist", text: "This is the beginning of human evolution" }
      ],
      timestamp: "2023-11-11T10:10:00Z"
    },
    {
      id: 6,
      author: "Quantum AI Labs",
      text: "Breakthrough: We've achieved quantum supremacy for certain machine learning tasks. 1000x speedup over classical computers",
      image: "src/activities/feed/aowez8wm.png",
      likes: 6321,
      comments: [
        { author: "Physicist", text: "What error correction method are you using?" },
        { author: "Tech Investor", text: "When will this be commercially available?" }
      ],
      timestamp: "2023-11-10T13:25:00Z"
    },
    {
      id: 7,
      author: "MIT Robotics",
      text: "New soft robotics technology can heal itself when damaged, just like biological tissue",
      video: "src/activities/feed/self-healing-robots-that-feel-pain-ytshorts.savetube.me.mp4",
      likes: 4875,
      comments: [
        { author: "Material Scientist", text: "What's the healing mechanism?" },
        { author: "MedTech", text: "Potential for prosthetics is huge" }
      ],
      timestamp: "2023-11-09T15:40:00Z"
    },
    {
      id: 8,
      author: "AI Ethics Board",
      text: "Publishing our new framework for responsible AI development. All companies working with AGI should follow these guidelines",
      image: "src/activities/feed/avto5zft.png",
      likes: 3298,
      comments: [
        { author: "Policy Maker", text: "Will these become regulations?" },
        { author: "CEO", text: "We're adopting these immediately" }
      ],
      timestamp: "2023-11-08T12:15:00Z"
    },
    {
      id: 9,
      author: "SpaceX AI",
      text: "Our autonomous Starship landing system now has 99.9% success rate in simulations. First AI-piloted landing attempt next month",
      video: "src/activities/feed/starship-launch-animation-ytshorts.savetube.me.mp4",
      likes: 11245,
      comments: [
        { author: "Astronaut", text: "How does it handle unexpected wind conditions?" },
        { author: "Space Enthusiast", text: "The future is here!" }
      ],
      timestamp: "2023-11-07T18:30:00Z"
    },
    {
      id: 10,
      author: "DeepMind",
      text: "Our new AlphaFold 3 can predict protein interactions with unprecedented accuracy, accelerating drug discovery",
      image: "src/activities/feed/tkb3ztbk.png",
      likes: 8765,
      comments: [
        { author: "Biologist", text: "This will save years of research" },
        { author: "Pharma CEO", text: "Already implementing in our pipeline" }
      ],
      timestamp: "2023-11-06T10:50:00Z"
    },
    {
      id: 11,
      author: "AI Artist",
      text: "Created this entire animated short film using only AI tools (Midjourney + Runway + ElevenLabs). No human artists were involved!",
      video: "src/activities/feed/videoplayback.mp4",
      likes: 15432,
      comments: [
        { author: "Film Director", text: "This changes everything" },
        { author: "Animator", text: "Worried about my job now..." }
      ],
      timestamp: "2023-11-05T14:20:00Z"
    },
    {
      id: 12,
      author: "DARPA",
      text: "Our AI fighter pilot just defeated 5 human pilots in simulated dogfights. The algorithm learns from each engagement",
      image: "src/activities/feed/2d5x1pbi.png",
      likes: 9876,
      comments: [
        { author: "Military Pilot", text: "We need to adapt our training" },
        { author: "Ethicist", text: "Should we automate warfare?" }
      ],
      timestamp: "2023-11-04T11:15:00Z"
    },
    {
      id: 13,
      author: "Tesla AI",
      text: "Full Self-Driving v12 achieves 0.01 disengagements per 100 miles in city driving. Regulatory approval pending",
      video: "src/activities/feed/videoplayback (1).mp4",
      likes: 12345,
      comments: [
        { author: "Regulator", text: "We're reviewing the safety data" },
        { author: "Tesla Owner", text: "Can't wait to try it!" }
      ],
      timestamp: "2023-11-03T16:45:00Z"
    },
    {
      id: 14,
      author: "AI Venture Capital",
      text: "Investing $500M in robotics startups this quarter. Focus areas: home assistants, construction, and elder care",
      image: "src/activities/feed/hj1qer0g.png",
      likes: 4321,
      comments: [
        { author: "Startup Founder", text: "How do we apply?" },
        { author: "Economist", text: "This sector will boom in 2024" }
      ],
      timestamp: "2023-11-02T13:10:00Z"
    },
    {
      id: 15,
      author: "Google AI",
      text: "New multimodal Gemini model understands text, images, audio, and video simultaneously. Demo shows it solving complex physics problems from video",
      video: "src/activities/feed/videoplayback (2).mp4",
      likes: 15678,
      comments: [
        { author: "Researcher", text: "Architecture details?" },
        { author: "Teacher", text: "This will revolutionize education" }
      ],
      timestamp: "2023-11-01T09:30:00Z"
    },
    {
      id: 16,
      author: "AI Law Firm",
      text: "Our AI lawyer just won its first case in small claims court. It analyzed precedents and crafted arguments autonomously",
      image: "src/activities/feed/m3pusu47.png",
      likes: 7654,
      comments: [
        { author: "Attorney", text: "Bar association is reviewing this" },
        { author: "Legal Tech", text: "Disruption is coming fast" }
      ],
      timestamp: "2023-10-31T14:50:00Z"
    },
    {
      id: 17,
      author: "Robotics Startup",
      text: "Our kitchen robot can now prepare 100+ meals from scratch. Pre-orders open for 2024 delivery",
      video: "src/activities/feed/kitchen-robot-that-will-cook-meals-from-scratch-unveiled-ytshorts.savetube.me.mp4",
      likes: 8765,
      comments: [
        { author: "Chef", text: "How does it handle delicate tasks?" },
        { author: "Homeowner", text: "Take my money!" }
      ],
      timestamp: "2023-10-30T12:20:00Z"
    },
    {
      id: 18,
      author: "AI Climate",
      text: "Our new AI model optimized wind farm layouts to increase energy output by 22%. Deploying globally next year",
      image: "src/activities/feed/h992qawe.png",
      likes: 5432,
      comments: [
        { author: "Environmentalist", text: "This is the kind of AI we need" },
        { author: "Engineer", text: "What parameters does it optimize?" }
      ],
      timestamp: "2023-10-29T15:30:00Z"
    },
    {
      id: 19,
      author: "Space Robotics",
      text: "Autonomous robots just assembled a solar array in orbit without human intervention. Next step: lunar base construction",
      video: "src/activities/feed/robots-in-space-meet-the-experts-ytshorts.savetube.me.mp4",
      likes: 10987,
      comments: [
        { author: "Astronaut", text: "This enables long-term habitats" },
        { author: "Investor", text: "The space economy is real" }
      ],
      timestamp: "2023-10-28T18:15:00Z"
    },
    {
      id: 20,
      author: "AI Education",
      text: "Our AI tutor now provides personalized education to 1M+ students worldwide, adapting to each learning style in real-time",
      image: "src/activities/feed/z1gpbq7h.png",
      likes: 6543,
      comments: [
        { author: "Teacher", text: "How does it assess understanding?" },
        { author: "Parent", text: "My child's grades improved 30%" }
      ],
      timestamp: "2023-10-27T10:05:00Z"
    }
  ];

const PostSection = ({ user }) => {
  const [posts, setPosts] = useState(demoPosts);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);

  const handlePostSubmit = () => {
    if (!newPost.trim() || !user) {
      toast.error('Post cannot be empty');
      return;
    }

    const post = {
      id: Date.now(),
      text: newPost,
      author: user.fullName,
      authorAvatar: user.avatar || '/images/default-avatar.jpg',
      comments: [],
      likes: 0,
      timestamp: new Date().toISOString(),
      isSaved: false
    };

    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    setNewPost("");
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    toast.success('Post created!');
  };

  const handleAddComment = (postId) => {
    if (!comments[postId]?.trim() || !user) {
      toast.error('Comment cannot be empty');
      return;
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            { 
              author: user.fullName,
              authorAvatar: user.avatar || '/images/default-avatar.jpg',
              text: comments[postId] 
            }
          ]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setComments((prev) => ({ ...prev, [postId]: "" }));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    toast.success('Liked post!');
  };

  const handleSavePost = (postId) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    );
    setPosts(updatedPosts);
    
    if (updatedPosts.find(p => p.id === postId).isSaved) {
      setSavedPosts([...savedPosts, postId]);
      toast.success('Post saved!');
    } else {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      toast.success('Post unsaved!');
    }
    
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img 
                  src={post.authorAvatar || '/images/default-avatar.jpg'} 
                  alt={post.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-white">{post.author}</h3>
                  <p className="text-xs text-gray-400">{formatDate(post.timestamp)}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white p-1">
                <FaEllipsisH />
              </button>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-gray-100 mb-4">{post.text}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full rounded-lg mb-4 max-h-96 object-cover"
                />
              )}
              
              {post.video && (
                <video 
                  controls 
                  className="w-full rounded-lg mb-4"
                >
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              {/* Post Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 border-b border-gray-700 pb-3 mb-3">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <FaHeart className="text-red-500 mr-1" />
                    {post.likes} likes
                  </span>
                  <span className="flex items-center">
                    <FaComment className="text-blue-400 mr-1" />
                    {post.comments.length} comments
                  </span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="flex justify-between text-gray-400">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 flex-1"
                >
                  <FaHeart className={post.likes > 0 ? "text-red-500" : ""} />
                  <span>Like</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 flex-1">
                  <FaComment />
                  <span>Comment</span>
                </button>
                <button 
                  onClick={() => handleSavePost(post.id)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 flex-1"
                >
                  {post.isSaved ? (
                    <FaBookmark className="text-yellow-400" />
                  ) : (
                    <FaRegBookmark />
                  )}
                  <span>Save</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 flex-1">
                  <FaShare />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-900/50 p-4 border-t border-gray-700">
              {post.comments.length > 0 && (
                <div className="space-y-3 mb-4">
                  {post.comments.slice(0, 3).map((comment, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <img 
                        src={comment.authorAvatar || '/images/default-avatar.jpg'} 
                        alt={comment.author}
                        className="w-8 h-8 rounded-full object-cover mt-1"
                      />
                      <div className="bg-gray-800 rounded-lg p-3 flex-1">
                        <h4 className="font-medium text-sm text-white">{comment.author}</h4>
                        <p className="text-gray-300 text-sm">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                  {post.comments.length > 3 && (
                    <button className="text-blue-400 text-sm ml-12 hover:underline">
                      View all {post.comments.length} comments
                    </button>
                  )}
                </div>
              )}

              {/* Add Comment */}
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.avatar || '/images/default-avatar.jpg'} 
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1 flex bg-gray-800 rounded-full">
                  <input
                    type="text"
                    className="flex-1 bg-transparent border-none text-white text-sm px-4 py-2 focus:outline-none"
                    placeholder="Write a comment..."
                    value={comments[post.id] || ""}
                    onChange={(e) => 
                      setComments({...comments, [post.id]: e.target.value})
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-3 text-blue-400 hover:text-blue-300 disabled:text-gray-500"
                    disabled={!comments[post.id]?.trim()}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostSection;