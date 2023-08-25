import React from "react";
import '../Home.css'
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <div className="text-4xl md:text-6xl lg:text-8xl font-bold mb-8 text-center leading-none">
        <span>Welcome to</span>
        <br />
        <span className="typing-animation leading-tight">MyLib</span>
      </div>
      <div className="text-xl md:text-2xl lg:text-3xl animate-bounce m-6">
        <Link to="/browse" className="border-b-2 border-white">Start Exploring</Link>
      </div>
    </div>
  );
};

export default Home;
