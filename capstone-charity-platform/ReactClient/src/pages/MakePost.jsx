import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const MakePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(null); // For storing the uploaded image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any inputs are missing
    if (!title || !category || !summary || !contact) {
      toast.error("All fields are required!");
      return;
    }

    // setup form to be sent back to the server
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("summary", summary);
    formData.append("contact", contact); // Add contact to formData

    // Only append the image if there is one I've set a default image in the backend
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/create`,
        formData,
        {
          withCredentials: true, // For cookies
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Success handling
      toast.success("Post created successfully!");
      navigate("/browse");
    } catch (error) {
      console.error("Error posting charity:", error);
      const errorMessage =
        error.response?.data?.message || "Error creating charity post";
      toast.error(errorMessage);
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
            maxLength={250} // Set max length to 250 charz
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <p className="text-sm text-gray-600 mt-1">
            {summary.length}/250 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="contact"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Contact Information
          </label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            placeholder="Email or phone number"
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
