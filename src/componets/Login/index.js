// src/components/Login.js
import React from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Login</h1>
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-500 text-white p-2 rounded mb-2"
      >
        Login com Google
      </button>
    
    </div>
  );
};

export default Login;
