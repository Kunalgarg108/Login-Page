import './App.css'
import React, { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [count, setCount] = useState(0)
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Google Sign-In Function
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast.success(`Welcome, ${result.user.displayName}!`);
      navigate("/");
    } catch (error) {
      toast.error("Google Sign-In Error");
    }
  };

  // Email/Password Sign-In Function
  const handleSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      toast.success(`Welcome, ${result.user.email}!`);
      navigate("/");
    } catch (error) {
      toast.error("Sign-In Error ");
    }
  };

  // Email/Password Sign-Up Function
  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      await updateProfile(result.user, { displayName: userData.name });
      toast.success(`Welcome, ${result.user.email}!`);
      navigate("/");
    } catch (error) {
      toast.error("Sign-Up Error");
    }
  };

  return (
    <div className="bg-white px-10 py-9 rounded-3xl border-gray-200">
      <ToastContainer />
      <h1 className="text-5xl font-semibold">{isSignUp ? "Sign Up" : "Welcome!"}</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        {isSignUp ? "Create your account" : "Please enter your credentials."}
      </p>
      <div className="mt-8">
        {isSignUp && (
          <div>
            <label className="text-lg font-medium">Name</label>
            <input
              className="w-full border-2 border-gray-300 rounded-xl p-4 m-1 bg-transparent"
              placeholder="Enter your name"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label className="text-lg font-medium">Email</label>
          <input
            className="w-full border-2 border-gray-300 rounded-xl p-4 m-1 bg-transparent"
            placeholder="Enter your email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-lg font-medium">Password</label>
          <input
            className="w-full border-2 border-gray-300 rounded-xl p-4 m-1 bg-transparent"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-8 justify-between items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label className="ml-2 font-medium text-base" htmlFor="remember">
              Remember me for 30 days
            </label>
          </div>
          {!isSignUp && (
            <button className="font-medium text-base text-orange-300 mt-2">
              Forgot password?
            </button>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={isSignUp ? handleSignUp : handleSignIn}
            className="py-3 rounded-xl bg-orange-400 text-white text-lg font-bold"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="flex border-2 border-gray-100 items-center justify-center gap-2 py-3 rounded-xl"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Logo" className="w-6 h-6" />
            Sign in with Google
          </button>
          <div className="mt-1 flex justify-center items-center gap-4">
            <p className="font-medium text-base">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-orange-500 text-base font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
