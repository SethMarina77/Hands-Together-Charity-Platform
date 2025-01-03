import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onImageUpload }) => {
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const response = await axios.post("/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onImageUpload(response.data.imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="imageInput"
      />
      <label
        htmlFor="imageInput"
        className="cursor-pointer bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
      >
        {loading ? "Uploading..." : "Change Profile Picture"}
      </label>
    </div>
  );
};

export default ImageUpload;
