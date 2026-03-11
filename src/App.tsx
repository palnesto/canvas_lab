import { useEffect, useMemo, useRef } from "react";
import Leader from "./components/Leader";
import Project from "./components/project";
import { PartnerWithUsModal } from "./components/modal/partner-with-us-modal";
import { useApiQuery } from "./hooks/useApiQuery";
import featured from "@/assets/featured.webp";
import ibt from "@/assets/ibt.svg";
import biz from "@/assets/biz.jpeg";
import sub from "@/assets/sub.jpg";
import ceo from "@/assets/ceo.png";
import voice from "@/assets/voice.jpeg";
export default function App() {
  const {} = useApiQuery("/health-check");
  const videoRef = useRef<HTMLVideoElement>(null);

  const isNoHover = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? !window.matchMedia("(hover: hover)").matches
        : false,
    [],
  );
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isNoHover) return;

    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("loadedmetadata", tryPlay, { once: true });
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

  const handleEnter = () => {
    if (!isNoHover && videoRef.current) videoRef.current.play().catch(() => {});
  };
  const handleLeave = () => {
    if (!isNoHover && videoRef.current) videoRef.current.pause();
  };

  return (
    <div>
      <PartnerWithUsModal />
      <div className="w-full min-h-screen font-sans">
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
              src="/logo.png" // encode space OR rename file
              alt="Canvas Labs Logo"
              className="w-52 sm:w-64 md:w-72 lg:w-80 xl:w-96 mb-6" /* responsive (replaces md:w-74, xl:w-84) */
            />
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-wide text-center px-4">
              What is Next
            </h1>
          </div>
        </section>
        <section className="h-[50svh] lg:h-screen">
          <img
            src={sub}
            alt=""
            className="w-full h-full object-cover xl:object-fill"
          />
        </section>
        <section className="mt-16 md:mt-32 text-center space-y-4">
          <h2 className="text-4xl md:text-7xl font-bold mb-10">OUR PROJECTS</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="https://xpoll.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open xpoll.io"
              className="relative block w-full md:w-1/2 h-60 lg:h-96 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/xpoll%20(2nd%20section).png"
                alt="Xpoll Project"
                className="w-full h-full object-cover"
              />
            </a>
            <a
              href="https://greatrwb.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open greatrwb.com"
              className="relative block w-full md:w-1/2 h-60 lg:h-96 rounded-4xl overflow-hidden shadow-lg"
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
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/strain.pdf"
              target="_blank"
              aria-label="Open xpoll.io"
              className="relative block w-full md:w-1/2 h-60 lg:h-96 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/strain.png"
                alt="Xpoll Project"
                className="w-full h-full object-cover object-right"
              />
            </a>
            <a
              href="/geo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open greatrwb.com"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-2xl"
            >
              <img
                src="/geo.jpeg"
                alt="GRWB Project"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/amy.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/amy.jpeg"
                alt="RS Project"
                className="w-full h-full object-cover "
              />
            </a>
            <a
              href="https://drive.google.com/file/d/1ezYW7CqAl2qiZYpcCoXI-47d098KdZUw/view?usp=sharing"
              target="_blank"
              aria-label="Open xpoll.io"
              className="relative block w-full md:w-1/2 h-60 lg:h-96 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/cardona.jpg"
                alt="Xpoll Project"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="https://www.dasmoresolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open greatrwb.com"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/dasmore.jpg"
                alt="GRWB Project"
                className="w-full h-full object-cover"
              />
            </a>
            <a className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg">
              <img
                src="/rs.jpg"
                alt="RS Project"
                className="w-full h-full object-cover object-right"
              />
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
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/snitch.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/snitch.png"
                alt="GRWB Project"
                className="w-full h-full"
              />
            </a>
            <a
              href="https://app.xpoll.io/campaigns/all-campaigns/6974dc0d448ae0b1c7fe2ec6"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/shelly.jpg"
                alt="RS Project"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="https://app.dredge.world/"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/dredge.jpg"
                alt="GRWB Project"
                className="w-full h-full"
              />
            </a>
            <a
              href="/terra.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/terra.png"
                alt="RS Project"
                className="w-full h-full"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/meta.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/meta.png"
                alt="GRWB Project"
                className="w-full h-full"
              />
            </a>
            <a
              href="/fair.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img src="/fair.png" alt="RS Project" className="w-full h-full" />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/bc.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img src="/bc.png" alt="GRWB Project" className="w-full h-full" />
            </a>
            <a
              href="/mark.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/mark.png"
                alt="RS Project"
                className="w-full h-full object-cover"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/coffee.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/coffee.png"
                alt="GRWB Project"
                className="w-full h-full"
              />
            </a>
            <a
              href="/curette.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/curette.png"
                alt="RS Project"
                className="w-full h-full"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/cut.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/cut.png"
                alt="GRWB Project"
                className="w-full h-full object-cover"
              />
            </a>
            <a
              href="/chart.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/chart.jpeg"
                alt="RS Project"
                className="w-full h-full"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/three.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/three.png"
                alt="GRWB Project"
                className="w-full h-full object-cover object-right"
              />
            </a>
            <a
              href="/term.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/term.png"
                alt="RS Project"
                className="w-full h-full"
              />
            </a>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-3 lg:px-10">
            <a
              href="/jack.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/jack.png"
                alt="GRWB Project"
                className="w-full h-full object-cover object-right"
              />
            </a>
            <a
              href="/t.pdf"
              target="_blank"
              className="relative block w-full md:w-1/2 h-60 lg:h-100 rounded-4xl overflow-hidden shadow-lg"
            >
              <img
                src="/t.png"
                alt="RS Project"
                className="w-full h-full"
              />
            </a>
          </div>
        </section>
        <section className="relative w-full ">
          <img
            src="/lastsectionimage.png"
            alt="Last Section"
            className="w-full h-[50svh] md:h-[70vh] object-cover object-bottom"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-black px-4">
            <img
              src="/bookCard.jpg"
              alt="Book Cover"
              className="mb-6 w-full h-auto sm:w-full md:w-lg lg:w-xl xl:w-3xl rounded-3xl shadow-2xl cursor-pointer object-cover object-left sm:object-center"
              onClick={() =>
                window.open(
                  "https://www.amazon.com/dp/B0FNYGSRLV?ref=cm_sw_r_ffobk_cso_cp_mwn_dp_DAX3MFB73JRR5PF2QSBQ_1&ref_=cm_sw_r_ffobk_cso_cp_mwn_dp_DAX3MFB73JRR5PF2QSBQ_1&social_share=cm_sw_r_ffobk_cso_cp_mwn_dp_DAX3MFB73JRR5PF2QSBQ_1&bestFormat=true&titleSource=true",
                  "_blank",
                )
              }
            />
          </div>
        </section>
      </div>
      <section className="my-16 md:my-24 text-center space-y-4">
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-10">
          HELM — Launch Queue
        </h2>
        <Project />
      </section>
      <section className="flex flex-col items-center gap-10 pb-28 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-center mt-4">
          Featured in
        </h1>

        <section className="grid grid-cols-1 place-items-center gap-7 px-4 md:grid-cols-2 md:gap-14 md:px-6 xl:grid-cols-5">
          <a
            href="https://www.ibtimes.com/inside-stanton-terranovas-canvas-labs-innovative-space-ideas-that-dont-fit-mold-3791873"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <img src={featured} alt="featured in" className="h-28 xl:h-32" />
          </a>

          <a
            href="https://www.villagevoice.com/how-a-new-england-farmer-became-a-builder-of-narrative-platforms-for-communities-seeking-clearer-digital-voices/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center"
          >
            <img src={voice} alt="Village Voice" className="h-20 xl:h-32" />
          </a>

          <a
            href="https://www.ibtimes.com/ai-doesnt-fail-because-technology-it-fails-when-humans-misunderstand-each-other-3794535"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <img
              src={ibt}
              alt="IBTimes"
              className="h-12 w-60 md:h-20 md:w-96 xl:h-40 xl:w-60"
            />
          </a>

          <a
            href="https://www.flipsnack.com/menapublishinggroup/bizpreneur-middle-east-january-2026/full-view.html?p=124"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <img src={biz} alt="Bizpreneur" className="h-28 xl:h-32" />
          </a>

          <a
            href="https://ceoweekly.com/from-law-to-systems-innovation-how-stanton-terranova-built-a-life-and-business-around-earned-independence/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:col-span-2 xl:col-span-1"
          >
            <img src={ceo} alt="CEO Weekly" className="h-20 xl:h-32" />
          </a>
        </section>
      </section>

      <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-center mt-4">
        OUR TEAM
      </h1>
      <Leader />
    </div>
  );
}
