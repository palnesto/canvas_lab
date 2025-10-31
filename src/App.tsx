import { useEffect, useMemo, useRef } from "react";
import Leader from "./components/Leader";

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
    <div>
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
        <section className="mt-16 md:mt-24 text-center space-y-4">
          {" "}
          <h2 className="text-4xl md:text-7xl font-bold mb-10">
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
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-20">
            <a
              href=""
              target="_blank"
              aria-label="Open xpoll.io"
              className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/cardona.jpg"
                alt="Xpoll Project"
                className="w-full h-full object-cover"
              />
            </a>
            <a
              href="https://www.dasmoresolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open greatrwb.com"
              className="relative block w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/dasmore.jpg"
                alt="GRWB Project"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 md:px-0">
            <figure className="relative w-full md:w-1/2 h-100 rounded-4xl overflow-hidden shadow-lg">
              <img
                src="/rs.jpg"
                alt="RS Project"
                className="w-full h-full object-cover object-right"
              />

              {/* Button container centered on image */}
              <div className="absolute top-32 left-3 md:left-auto md:right-10 flex items-center justify-center gap-6">
                <a
                  href="https://drive.google.com/file/d/1GZJVctmQr4bmQdUJEFBjdZKCx6cukVvQ/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all"
                >
                  Visit Now
                </a>

                <a
                  href="https://www.figma.com/proto/wo2HNrGXOA4WFkeRy86wzy/RSA-Prototype?node-id=88-4285&t=vsdUvzHAslcQg70d-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=88%3A4285&show-proto-sidebar=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-gray-800 transition-all"
                >
                  Launch Preview
                </a>
              </div>
            </figure>
          </div>
        </section>

        {/* ---------- Last Section (with centered overlay text) ---------- */}
        <section className="relative w-full ">
          <img
            src="/lastsectionimage.png"
            alt="Last Section"
            className="w-full h-[50svh] md:h-[70vh] object-cover object-bottom"
            loading="lazy"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black px-4">
            {/* Book cover ABOVE the heading, centered & larger */}
            <img
              src="/bookcard.jpg"
              alt="Book Cover"
              className="mb-6 w-full h-auto sm:w-full md:w-[32rem] lg:w-[36rem] xl:w-[40rem] rounded-3xl shadow-2xl cursor-pointer object-cover object-left sm:object-center"
              onClick={() =>
                window.open(
                  "https://www.amazon.com/dp/B0FNYGSRLV?ref=cm_sw_r_ffobk_cso_cp_mwn_dp_DAX3MFB73JRR5PF2QSBQ_1&ref_=cm_sw_r_ffobk_cso_cp_mwn_dp_DAX3MFB73JRR5PF2QSBQ_1&social_share=cm_sw_r_ffobk_cso_cp_mwn_dp_DAX3MFB73JRR5PF2QSBQ_1&bestFormat=true&titleSource=true",
                  "_blank"
                )
              }
            />
          </div>
        </section>
      </div>
      <div className="text-3xl md:text-6xl font-extrabold tracking-tight text-center mt-4">
        OUR TEAM
      </div>
      <Leader />
    </div>
  );
}
