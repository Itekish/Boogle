import React from "react";
import { Link } from "react-router-dom";
import boogleLogo from "/boogle-removebg.png";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/boogle-removebg.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          Experience the Night with <span className=" text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d6d] via-[#ffcc33] to-[#0099ff] drop-shadow-lg" style={{ textShadow: "2px 2px 5px rgba(255, 77, 109, 0.7)" }}>
            Boogle
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
          Discover, organize, and elevate your events – all in one place.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            to="/create-event"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Create Event
          </Link>
          <Link
            to="/events"
            className="border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
