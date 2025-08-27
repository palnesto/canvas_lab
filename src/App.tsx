import React, { useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detect devices that don't support hover (most touch/mobile)
  const isNoHover = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? !window.matchMedia("(hover: hover)").matches
        : false,
    []
  );

  // Ensure autoplay on mobile / no-hover devices
  useEffect(() => {
    if (isNoHover && videoRef.current) {
      videoRef.current.play().catch(() => {
        /* ignore autoplay rejections */
      });
    }
  }, [isNoHover]);

  // Hover controls (desktop)
  const handleEnter = () => {
    if (!isNoHover && videoRef.current) videoRef.current.play().catch(() => {});
  };
  const handleLeave = () => {
    if (!isNoHover && videoRef.current) videoRef.current.pause();
  };

  return (
    <div className="w-full min-h-screen font-sans">
      {/* ---------- Hero Section ---------- */}
      <section
        className="relative w-full overflow-hidden h-[100svh] md:h-screen"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/video_firstsection.mp4" // ensure file is in /public
          muted
          loop
          playsInline
          autoPlay={isNoHover} // mobile/tablets autoplay
          preload="metadata"
        />

        {/* Content overlay - allow hover to pass by not catching pointer events */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white bg-black/40 pointer-events-none select-none">
          <img
            src="/canvas%20labs%20logo.png" // encode space OR rename file
            alt="Canvas Labs Logo"
            className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 mb-6" /* responsive (replaces md:w-74, xl:w-84) */
          />
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-wide text-center px-4">
            What is Next
          </h1>
        </div>
      </section>

      {/* ---------- Middle Section ---------- */}
      {/* ---------- Middle Section (FULL-BLEED + TALL) ---------- */}
      <section className="mt-16 md:mt-24 text-center">
        {" "}
        <h2 className="text-4xl md:text-7xl font-bold mb-12">
          OUR PROJECT
        </h2>{" "}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
          {" "}
          {/* First card */}{" "}
          <div className="relative w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg ">
            {" "}
            <img
              src="/xpoll%20(2nd%20section).png"
              alt="Xpoll Project"
              className="w-full h-full object-cover"
            />{" "}
          </div>{" "}
          {/* Second card with GIF in top-right */}{" "}
          <div className="relative w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg">
            {" "}
            <img
              src="/grwb%20card.png"
              alt="GRWB Project"
              className="w-full h-full object-cover"
            />{" "}
            <img
              src="/Coin%20animation.gif"
              alt="Coin Animation"
              className="absolute top-2 right-2 w-50 h-30"
            />{" "}
          </div>{" "}
        </div>{" "}
        <button className="mt-16 px-10 py-3 text-lg font-bold bg-gray-700 text-white rounded-lg hover:bg-blue-700 transition">
          {" "}
          Book your Consultant{" "}
        </button>{" "}
      </section>

      {/* ---------- Last Section ---------- */}
      <section className="w-full mt-16">
        <img
          src="/last%20section%20image.png"
          alt="Last Section"
          className="w-full h-[40svh] md:h-[40vh] object-cover object-bottom"
          loading="lazy"
        />
      </section>
    </div>
  );
}
