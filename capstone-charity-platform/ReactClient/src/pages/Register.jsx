import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "user", // Default to "user" //not was going to use this same logic for the makePost category but decided a dropdown is more effective and easier to manage in that situation
  });
  const [loading, setLoading] = useState(false);

  const toggleAccountType = (type) => {
    setData({ ...data, accountType: type });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password } = data;
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  //in the future add a check for symbols/numbers being included in the firstName and lastName

  const registerUser = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const { firstName, lastName, email, password, accountType } = data;
    try {
      const { data } = await axios.post("/Register", { //data in this situation refers to the entire object that is returned from the axios call. so i can change the data by using something like "data.firstName" to get the first name of the user or even to modify it later on
        firstName,
        lastName,
        email,
        password,
        accountType,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          accountType: "user",
        });
        toast.success("Registration Successful. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen justify-center h-screen items-center relative bg-[url(https://images.pexels.com/photos/6994982/pexels-photo-6994982.jpeg?cs=srgb&dl=pexels-julia-m-cameron-6994982.jpg&fm=jpg)] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-col w-1/3 h-4/5 rounded-lg justify-center items-center rounded-xl border-gray border-2 bg-gradient-to-br from-teal-300 to-lime-300 dark:text-white  focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
        <div className="text-black text-xl font-semibold font-sans mb-4">
          Will you be posting as a charity or interacting as a User?
        </div>
        <form className="space-y-6" onSubmit={registerUser}>
          <div className="flex justify-center space-x-4 my-4">
            <button
              type="button"
              className={`w-24 h-10 px-4 py-2 text-sm font-medium rounded-lg ${
                data.accountType === "user"
                  ? "bg-teal-400 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => toggleAccountType("user")}
            >
              User
            </button>
            <button
              type="button"
              className={`w-24 h-10 px-4 py-2 text-sm font-medium rounded-lg ${
                data.accountType === "charity"
                  ? "bg-teal-400 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => toggleAccountType("charity")}
            >
              Charity
            </button>
          </div>

          {/* First Name */}
          <label className="block text-sm/6 font-medium text-gray-900">
            First Name
          </label>
          <input
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="text"
            placeholder="First Name"
            value={data.firstName}
            onChange={(event) =>
              setData({ ...data, firstName: event.target.value })
            }
          />

          {/* Last Name */}
          <label className="block text-sm/6 font-medium text-gray-900">
            Last Name
          </label>
          <input
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            type="text"
            placeholder="Last Name"
            value={data.lastName}
            onChange={(event) =>
              setData({ ...data, lastName: event.target.value })
            }
          />

          {/* Email */}
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

          {/* Password */}
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
            disabled={loading}
            className="my-2 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800 border-2 border-transparent hover:border-black"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {loading ? "Registering..." : "Register"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
