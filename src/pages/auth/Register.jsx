import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import authBgPhoto from "../../..//public/assets/auth_bg2.jpeg";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
// import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice"; // Correct import path
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
      });
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered", {
          position: "top-center",
        });
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || "Registration failed", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <section className="bg-[#0f0f10] min-h-screen justify-center flex flex-wrap pb-20 px-4 sm:px-8 md:px-12">
      <div
        className="mt-[5rem] border border-white rounded-md px-8 sm:px-12 md:px-16 py-12 sm:py-16 md:py-20 bg-[#000000] bg-no-repeat bg-cover bg-blur"
        style={{
          backgroundImage: `url(${authBgPhoto})`,
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-white">
          Register
        </h1>

        <form
          onSubmit={submitHandler}
          className="container w-full sm:w-[80%] md:w-[40rem]"
        >
          <div className="my-[1.5rem] sm:my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm sm:text-base font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 sm:p-3 border rounded w-full text-white bg-transparent"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="my-[1.5rem] sm:my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 sm:p-3 border rounded w-full text-white bg-transparent"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[1.5rem] sm:my-[2rem] relative">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-medium text-white"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 p-2 sm:p-3 border rounded w-full text-white bg-transparent"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
            >
              {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>
          </div>

          <div className="my-[1.5rem] sm:my-[2rem] relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm sm:text-base font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="mt-1 p-2 sm:p-3 border rounded w-full text-white bg-transparent"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={handleToggleConfirmPassword}
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
            >
              {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
            </button>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded cursor-pointer my-[1rem] w-full sm:w-auto"
          >
            {isLoading ? (
              <span className="flex gap-2">
                Loading{" "}
                <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl" />
              </span>
            ) : (
              "Register"
            )}
          </button>

          {isLoading}
        </form>

        <div className="mt-4">
          <p className="text-white text-sm sm:text-base">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
