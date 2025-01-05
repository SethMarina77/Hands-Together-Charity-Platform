import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "./Modal";

const Browse = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  //checks if the contact is an email
  const isEmail = (contact) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(contact);
  const isPhone = (contact) =>
    /^[+]?[0-9]{1,4}[-\s]?[0-9]{1,3}[-\s]?[0-9]{4,10}$/.test(contact);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/me`,
          {
            withCredentials: true,
          }
        );
        setCurrentUserId(userResponse.data._id);

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/browse`
        );
        const updatedPosts = response.data.map((post) => ({
          ...post,
          image: post.image.startsWith("/uploads/")
            ? `${import.meta.env.VITE_BACKEND_URL}${post.image}`
            : post.image,
        }));
        setPosts(updatedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Failed to load charity posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/${postId}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );
        toast.success("Post deleted successfully!");
      }
    } catch (error) {
      console.error(
        "Error deleting post:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while deleting the post";
      toast.error(errorMessage);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Charity Posts</h2>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.length === 0 ? (
            <p>No charity posts available.</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white p-4 rounded-lg shadow-md transform hover:scale-110 hover:rotate-3 transition-transform duration-300 ease-in-out cursor-pointer"
                onClick={() => handlePostClick(post)}
              >
                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 rounded-md mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-700 mb-2">
                  <strong>Category:</strong> {post.category}
                </p>
                <p className="text-gray-500 mb-2 h-16 overflow-hidden break-words">
                  {post.summary}
                </p>
                <p className="mb-2">
                  <strong>Contact:</strong>{" "}
                  <span className="text-[#2563eb]">{post.contact}</span>
                </p>

                {currentUserId === post.createdBy?.toString() && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        "Delete button clicked for post ID:",
                        post._id
                      );
                      handleDelete(post._id);
                    }}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <Modal isOpen={selectedPost !== null} onClose={handleCloseModal}>
        {selectedPost && (
          <div className="space-y-4">
            {selectedPost.image && (
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            )}
            <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
            <p className="text-lg">
              <strong>Category:</strong> {selectedPost.category}
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">
              {selectedPost.summary}
            </p>

            {/* opens the users default email application on their device and starts an email they can send   */}
            <p className="mb-2">
              <strong>Contact:</strong>{" "}
              {isEmail(selectedPost.contact) ? (
                <a
                  href={`mailto:${selectedPost.contact}`}
                  className="text-[#2563eb]"
                >
                  {selectedPost.contact}
                </a>
              ) : isPhone(selectedPost.contact) ? (
                <a
                  href={`tel:${selectedPost.contact}`}
                  className="text-[#2563eb]"
                >
                  {selectedPost.contact}
                </a>
              ) : (
                selectedPost.contact
              )}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Browse;
