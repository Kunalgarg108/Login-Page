import React, { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [resendCooldown, setResendCooldown] = useState(false); // Cooldown state
  const [resetEmail, setResetEmail] = useState(""); // For password reset email
  const [isReset, setIsReset] = useState(false); // For toggle between login and reset
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

  // Email/Password Sign-In Function with Email Verification Check
  const handleSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, userData.email, userData.password);
      const user = result.user;

      if (!user.emailVerified) {
        toast.error("Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

      toast.success(`Welcome, ${user.email}!`);
      navigate("/");
    } catch (error) {
      toast.error("Sign-In Error");
    }
  };

  // Email/Password Sign-Up Function with Email Verification
  const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      await updateProfile(result.user, { displayName: userData.name });

      // Send verification email
      await sendEmailVerification(result.user);

      // Sign out user after signup
      await signOut(auth);

      toast.success("Verification email sent! Please check your email before logging in.");
    } catch (error) {
      toast.error("Sign-Up Error");
    }
  };

  // Resend Verification Email
  const handleResendEmail = async () => {
    try {
      if (resendCooldown) {
        toast.warn("Please wait before resending.");
        return;
      }

      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        toast.success("Verification email resent!");

        // Set cooldown to prevent spam clicking
        setResendCooldown(true);
        setTimeout(() => setResendCooldown(false), 30000); // 30 seconds cooldown
      } else {
        toast.error("No user found. Try signing in first.");
      }
    } catch (error) {
      toast.error("Error resending email.");
    }
  };

  // Password Reset Function
  const handlePasswordReset = async () => {
    try {
      if (!resetEmail) {
        toast.error("Please enter an email to reset password.");
        return;
      }

      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");
      setIsReset(false); // Close reset form after email sent
    } catch (error) {
      toast.error("Error sending password reset email.");
    }
  };

  return (
    <div className="bg-white px-10 py-9 rounded-3xl border-gray-200">
      <ToastContainer />
      <h1 className="text-5xl font-semibold">{isSignUp ? "Sign Up" : isReset ? "Reset Password" : "Welcome!"}</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        {isSignUp ? "Create your account" : isReset ? "Enter your email to reset password" : "Please enter your credentials."}
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
          {!isSignUp && !isReset && (
            <button className="font-medium text-base text-orange-300 mt-2" onClick={() => setIsReset(true)}>
              Forgot password?
            </button>
          )}
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          {isReset ? (
            <div>
              <input
                type="email"
                placeholder="Enter your email for password reset"
                className="w-full border-2 border-gray-300 rounded-xl p-4 m-1 bg-transparent"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              <button
                onClick={handlePasswordReset}
                className="mt-4 text-blue-500 text-base font-medium px-10"
              >
                Send Reset Link
              </button>
              <button
                onClick={() => setIsReset(false)}
                className="mt-4 text-blue-500 text-base font-medium"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
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

              {/* Resend Email Section */}
              {!isSignUp && (
                <button
                  onClick={handleResendEmail}
                  className={`text-blue-500 text-base font-medium ${resendCooldown ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={resendCooldown}
                >
                  {resendCooldown ? "Please wait..." : "Resend Verification Email"}
                </button>
              )}
            </>
          )}
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

export default Login;
