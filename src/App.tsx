import { useEffect, useMemo, useRef } from "react";

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
    const v = videoRef.current;
    if (!v || !isNoHover) return;

    const tryPlay = () => v.play().catch(() => {});
    // try immediately + when metadata is ready
    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay, { once: true });

    // if browser blocks autoplay, start on first tap
    const onFirstTouch = () => {
      tryPlay();
      window.removeEventListener("touchend", onFirstTouch);
    };
    window.addEventListener("touchend", onFirstTouch, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", tryPlay as any);
      window.removeEventListener("touchend", onFirstTouch);
    };
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
        className="relative w-full overflow-hidden h-[50svh] md:h-screen"
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
          OUR PROJECTS
        </h2>{" "}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
          {" "}
          {/* First card */} {/* First card → xpoll.io */}
          <a
            href="https://xpoll.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open xpoll.io"
            className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg"
          >
            <img
              src="/xpoll%20(2nd%20section).png"
              alt="Xpoll Project"
              className="w-full h-full object-cover"
            />
          </a>
          {/* Second card → greatrwb.com */}
          <a
            href="https://greatrwb.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open greatrwb.com"
            className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg"
          >
            <img
              src="/grwb%20card.png"
              alt="GRWB Project"
              className="w-full h-full object-cover"
            />
            <img
              src="/Coin%20animation.gif"
              alt="Coin Animation"
              className="absolute top-2 right-2 object-contain
               w-36 h-18
               sm:w-30 sm:h-20
               md:w-40 md:h-24
               xl:w-52 xl:h-32"
            />
          </a>
        </div>{" "}
      </section>

      {/* ---------- Last Section (with centered overlay text) ---------- */}
      <section className="relative w-full mt-16">
        <img
          src="/last%20section%20image.png"
          alt="Last Section"
          className="w-full h-[40svh] md:h-[40vh] object-cover object-bottom"
          loading="lazy"
        />

        {/* Overlay content like hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black px-4">
          <section className="md:space-y-2 py-4">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              The Quantum Mirror Order your Copy now
            </h3>
            <button
              onClick={() => window.open("https://amzn.in/d/0qPPbe9", "_blank")}
              className="hover:bg-[#0e7777] bg-[#0DACAD] px-4 py-2 rounded-full font-bold text-white"
            >
              Order Now
            </button>
          </section>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            How can we help you?
          </h3>
          <a
            href="mailto:stanton@canvaslabs.world"
            className="mt-6 text-lg sm:text-xl md:text-4xl font-semibold   hover:decoration-white"
          >
            stanton@canvaslabs.world
          </a>
        </div>
      </section>
    </div>
  );
}
