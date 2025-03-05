import { useState } from "react";
import { Element } from "react-scroll";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";

const Posts = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ text: "", media: null });

  const handleReviewSubmit = () => {
    if (newReview.text.trim() || newReview.media) {
      setReviews([...reviews, newReview]);
      setNewReview({ text: "", media: null });
    }
  };

  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      <Element name="reviews">
        <div className="container">
          <h1 className="mb-6 h1 text-p4 uppercase text-center">User Reviews</h1>
          <p className="max-w-440 mb-10 body-2 text-center mx-auto">
            Share your experiences, thoughts, and media about Anantrit.
          </p>
          
          {/* Navigation Link */}
          <div className="text-center mb-6">
            <Link to="/posts" className="text-blue-500 hover:underline">
              Go to Posts
            </Link>
          </div>

          {/* Review Input Section */}
          <div className="max-w-xl mx-auto p-6 bg-white/10 border border-blue-500 rounded-lg shadow-lg backdrop-blur-md">
            <textarea
              className="w-full p-3 text-white bg-transparent border border-blue-500 rounded-md"
              placeholder="Write your review..."
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
            />
            <input
              type="file"
              accept="image/*,video/*"
              className="mt-3 text-white"
              onChange={(e) => setNewReview({ ...newReview, media: e.target.files[0] })}
            />
            <button
              onClick={handleReviewSubmit}
              className="mt-4 w-full py-3 px-6 text-white font-semibold rounded-lg bg-blue-500 shadow-lg transition-all duration-300 hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>

          {/* Display Reviews */}
          <div className="mt-10 max-w-xl mx-auto">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="p-4 mb-4 bg-white/10 border border-blue-500 rounded-lg">
                  <p className="text-white">{review.text}</p>
                  {review.media && (
                    <div className="mt-2">
                      {review.media.type.startsWith("image") ? (
                        <img src={URL.createObjectURL(review.media)} alt="Uploaded" className="w-full rounded-md" />
                      ) : (
                        <video controls className="w-full rounded-md">
                          <source src={URL.createObjectURL(review.media)} type={review.media.type} />
                        </video>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-white">No reviews yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Posts;
