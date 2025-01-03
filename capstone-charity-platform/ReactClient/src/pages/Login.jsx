import React, { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const { setUser, refreshUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

 const loginUser = async (event) => {
   event.preventDefault();
   const { email, password } = data;

   if (!email || !password) {
     return toast.error("The Email and Password are both Required");
   }

   setLoading(true);

   // TIMEOUT THAT SHOUT FIX THE LOGIN  ERROR BUG
   const timeoutDuration = 3000; 
   const timeoutPromise = new Promise((_, reject) =>
     setTimeout(() => reject(new Error("Request timed out")), timeoutDuration)
   );

   try {
     const response = await Promise.race([
       axios.post("/Login", { email, password }, { withCredentials: true }),
       timeoutPromise,
     ]);

     if (response.data.error) {
       toast.error(response.data.error);
     } else {
       setData({ email: "", password: "" });
       localStorage.setItem("authToken", response.data.token);
       await refreshUser();
       toast.success("Login successful!");
       navigate("/");
     }
   } catch (error) {
     if (error.message === "Request timed out") {
       toast.error("Login request timed out. Please try again.");
     } else if (error.response?.status === 401) {
       toast.error("Invalid email or password");
     } else if (error.response?.status === 404) {
       toast.error("User not found");
     } else {
       toast.error("An error occurred while logging in");
     }
   } finally {
     setLoading(false);
   }
 };

  return (
    <div className="flex w-screen justify-center h-screen items-center relative bg-[url(https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?cs=srgb&dl=pexels-cottonbro-6590920.jpg&fm=jpg)] bg-cover bg-center bg-no-repeat">
      <div className="flex bg-white flex-col w-1/5 h-3/5 rounded-lg justify-center items-center rounded-xl border-gray border-2 bg-gradient-to-br from-teal-300 to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
        <form className="space-y-6" onSubmit={loginUser}>
          <label className="block text-sm/6 font-medium text-gray-900">
            Email
          </label>
          <input
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(event) =>
              setData({ ...data, email: event.target.value })
            }
          />

          <label className="block text-sm/6 font-medium text-gray-900">
            Password
          </label>
          <input
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(event) =>
              setData({ ...data, password: event.target.value })
            }
          />

          <button
            type="submit"
            className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-700"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
