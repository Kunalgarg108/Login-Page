import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase"; // Ensure correct path
import { onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          isLoggedIn: true,
          name: user.displayName || "User",
          email: user.email || "",
        });
      } else {
        setUser({ isLoggedIn: false, name: "", email: "" });
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser({ isLoggedIn: false, name: "", email: "" });
      navigate("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="relative h-screen p-4">
      {/* Show Login or Logout Button */}
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
        onClick={user.isLoggedIn ? handleLogout : () => navigate("/login")}
      >
        {user.isLoggedIn ? "Logout" : "Login"}
      </button>

      {/* Display User Name if Logged In */}
      <div className="flex justify-center items-center h-full">
        {user.isLoggedIn ? (
          <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        ) : (
          <h1 className="text-2xl">Please log in.</h1>
        )}
      </div>
    </div>
  );
}

export default Home;
