import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../components/imageUpload";

const Profile = () => {
  const { user, refreshUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [refreshUser]);

  useEffect(() => {
    if (user?.profileImage) {
      setImageUrl(user.profileImage);
    }
  }, [user]);

  const handleImageUpload = async (imageUrl) => {
    try {
      console.log("Updating profile with image:", imageUrl);
      const response = await axios.patch("/update-profile", {
        profileImage: imageUrl,
      });
      console.log("Update response:", response.data);
      await refreshUser();
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error updating profile image:", error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-4">User not found</div>;
  }

  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to your{" "}
        {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}{" "}
        Profile
      </h1>
      <div className="bg-white shadow-md rounded-lg p-16 h-2/3">
        <div className="flex flex-col items-center mb-8">
          <img
            src={
              //note there is a bug where before an image is uploaded the default image is not displayed and it glitches a little. working
              imageUrl
                ? `http://localhost:3000${imageUrl}`
                : "https://placehold.co/600x400"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
            onError={(e) => {
              console.log("Image load error, using default");
              e.target.src = "/uploads/duckPixel.png";
            }}
          />
          <ImageUpload onImageUpload={handleImageUpload} />
        </div>
        <p className="mb-12">
          <strong className="text-gray-700">First Name:</strong>{" "}
          {user.firstName}
        </p>
        <p className="mb-12">
          <strong className="text-gray-700">Last Name:</strong> {user.lastName}
        </p>
        <p className="mb-12">
          <strong className="text-gray-700">Email:</strong> {user.email}
        </p>
        <p className="mb-12">
          <strong className="text-gray-700">Account Type:</strong>{" "}
          {user.accountType}
        </p>
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Profile;
