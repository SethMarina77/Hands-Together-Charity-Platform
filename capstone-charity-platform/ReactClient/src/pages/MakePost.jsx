import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const MakePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null); // For storing the uploaded image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the fields are filled
    if (!title || !category || !summary) {
      toast.error("All fields are required!");
      return;
    }

    // Prepare form data to send to backend
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("summary", summary);

    // Only append the image if there is one
    if (image) {
      formData.append("image", image);
    }

    try {
      // Send a POST request to the backend with form data
      const response = await axios.post("/upload-post-image", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // If authentication is required
          "Content-Type": "multipart/form-data", // Important to set for file uploads
        },
      });

      // Success handling
      toast.success("Post created successfully!");
      navigate("/browse"); // Go to the browse page after successful post creation
    } catch (error) {
      console.error("Error posting charity:", error);

      // Handle error from the backend
      const errorMessage =
        error.response?.data?.message || "Error creating charity post";
      toast.error(errorMessage); // Show error message using toast
    }
  };


  return (
    <div className="h-screen container mx-auto mt-8 mb-8 p-6 bg-gray-50 rounded-lg shadow-lg w-1/2">
      <h2 className="text-3xl font-semibold text-teal-600 mb-6">
        Create a Charity Post
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Select Category</option>
            <option value="Health">Health</option>
            <option value="Food">Food</option>
            <option value="Youth">Youth</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="summary"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Post Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakePost;
