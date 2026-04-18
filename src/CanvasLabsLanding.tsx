import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import "./CanvasLabsLanding.css";
import faviconUrl from "@/assets/canvas-labs-favicon.svg";
import pressBiz from "@/assets/biz.jpeg";
import pressCeo from "@/assets/ceo.png";
import pressFeatured from "@/assets/featured.webp";
import pressVoice from "@/assets/voice.jpeg";
import pressYglf from "@/assets/yglf.avif";
import dasmoreUrl from "@/assets/dasmore.png";
import dredgeUrl from "@/assets/dredge.png";
import grwbUrl from "@/assets/grwb.png";
import inkdUrl from "@/assets/inkd.png";
import sardineUrl from "@/assets/sardinepay.png";
import xpollUrl from "@/assets/xpoll.png";
import { ScrollShipDecoration } from "./ScrollShipDecoration";

const MARQUEE_ITEMS = [
  "Web3 Infrastructure",
  "Campaign Technology",
  "AI Publishing Agents",
  "DeFi Intelligence",
  "Digital Twin Modeling",
  "Growth Automation",
  "Custom Development",
  "On-Chain Engagement",
  "AI Production Suite",
  "180-Day Delivery",
] as const;

type PortfolioCat = "all" | "web3" | "ai" | "defi" | "enterprise";

export default function CanvasLabsLanding() {
  const shipGradId = useId().replace(/:/g, "cl-ship-");
  const [menuOpen, setMenuOpen] = useState(false);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [portfolioCat, setPortfolioCat] = useState<PortfolioCat>("all");
  const [submitLabel, setSubmitLabel] = useState("Send inquiry");

  const videoRef = useRef<HTMLVideoElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onNavScroll = () => {
      const hero = heroWrapRef.current;
      const threshold = hero ? hero.offsetHeight - 120 : window.innerHeight * 0.8;
      setNavScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onNavScroll, { passive: true });
    window.addEventListener("resize", onNavScroll);
    onNavScroll();
    return () => {
      window.removeEventListener("scroll", onNavScroll);
      window.removeEventListener("resize", onNavScroll);
    };
  }, []);

  useEffect(() => {
    const ship = document.getElementById("scroll-ship") as HTMLDivElement | null;
    const waves = document.getElementById("scroll-waves") as HTMLDivElement | null;
    if (!ship || !waves) return;
    let ticking = false;
    const updateShip = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / Math.max(docH, 1), 1);
      const heroH = document.querySelector(".hero-wrap")?.clientHeight ?? 600;
      const show = scrollY > heroH * 0.5;
      ship.classList.toggle("visible", show);
      waves.classList.toggle("visible", show);
      if (!show) return;
      const bottomStart = window.innerHeight - 80;
      const topEnd = 80;
      const y = bottomStart - (bottomStart - topEnd) * progress;
      ship.style.bottom = "auto";
      ship.style.top = `${y}px`;
      const sway = Math.sin(progress * Math.PI * 4) * 12;
      ship.style.right = `${32 + sway}px`;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateShip();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateShip);
    updateShip();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateShip);
    };
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    const heroWrap = heroWrapRef.current;
    const fourPillars = servicesRef.current;
    if (!vid || !heroWrap || !fourPillars) return;
    let ticking = false;
    const scrub = () => {
      if (!vid.duration) return;
      const heroTop = heroWrap.offsetTop;
      const pillarsTop = fourPillars.offsetTop;
      const scrollY = window.scrollY;
      const range = pillarsTop - heroTop;
      const progress = Math.max(0, Math.min(1, (scrollY - heroTop) / Math.max(range, 1)));
      vid.currentTime = progress * vid.duration;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrub();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("v");
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".rv").forEach((el, i) => {
      if (!["d1", "d2", "d3", "d4", "d5", "d6"].some((c) => el.classList.contains(c))) {
        el.classList.add("d" + ((i % 6) + 1));
      }
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) return;
    document.querySelectorAll(".marquee-track, [class*='marquee']").forEach((el) => {
      (el as HTMLElement).style.animation = "none";
    });
  }, []);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      projectType: String(fd.get("project_type") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      description: String(fd.get("description") ?? ""),
    };
    console.log("Consultation form submission", payload);
    setSubmitLabel("✓ Sent!");
    window.setTimeout(() => setSubmitLabel("Send inquiry"), 3000);
  };

  const groupHidden = (g: Exclude<PortfolioCat, "all">) =>
    portfolioCat !== "all" && portfolioCat !== g;

  const body = (
    <>
<nav id="nav" className={navScrolled ? "scrolled" : ""}>
  <div className="nav-inner">
    <a href="#" className="nav-logo" aria-label="Canvas Labs">
      <span className="nav-logo-iconwrap">
        <img src={faviconUrl} alt="" className="nav-logo-img" />
      </span>
      <span className="nav-logo-text">Canvas <em>Labs</em></span>
    </a>
    <div className="nav-links">
      <a href="#services"><span className="nav-link-num">i.</span>Pillars</a>
      <a href="#portfolio"><span className="nav-link-num">ii.</span>Fleet</a>
      <a href="#ai-suite"><span className="nav-link-num">iii.</span>Studio</a>
      <a href="#contact"><span className="nav-link-num">iv.</span>Charter</a>
    </div>
    <div className="nav-right">
      <a href="canvas strategies international structure.html" className="nav-ext">Canvas Strategies ↗</a>
      <button type="button" className="nav-cta" onClick={scrollToContact}>Start a project</button>
      <button type="button" className={"nav-hamburger" + (burgerOpen ? " open" : "")} id="hamburger" aria-expanded={burgerOpen} onClick={() => { setBurgerOpen((o) => !o); setMenuOpen((o) => !o); }} aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </div>
  </div>
</nav>

{/* MOBILE NAV */}
<div className={"nav-mobile" + (menuOpen ? " open" : "")} id="nav-mobile" style={{ display: menuOpen ? "flex" : "none" }}>
  <a href="#services" className="mob-link" onClick={() => { setMenuOpen(false); setBurgerOpen(false); }}>Services</a>
  <a href="#portfolio" className="mob-link" onClick={() => { setMenuOpen(false); setBurgerOpen(false); }}>Portfolio</a>
  <a href="#ai-suite" className="mob-link" onClick={() => { setMenuOpen(false); setBurgerOpen(false); }}>AI Suite</a>
  <a href="#contact" className="mob-link" onClick={() => { setMenuOpen(false); setBurgerOpen(false); }}>Contact</a>
  <a href="canvas strategies international structure.html" className="mob-link" onClick={() => { setMenuOpen(false); setBurgerOpen(false); }} style={{fontSize: ".95rem", color: "var(--t3)", marginTop: "16px"}}>Canvas Strategies ↗</a>
</div>

{/* HERO */}
<div className="hero-wrap" ref={heroWrapRef}>
  {/* Background video — Pexels 8782434 */}
  <video id="hero-video" ref={videoRef} className="hero-video-bg" muted preload="auto" playsInline autoPlay loop>
    <source src="https://videos.pexels.com/video-files/8782434/8782434-hd_1920_1080_24fps.mp4" type="video/mp4" />
  </video>
  <div className="hero-video-overlay" />
  <div className="container">
    <div className="hero">
      <div className="hero-meta">
        <span>Manifest 01</span>
        <span className="hero-meta-rule" />
        <span className="hero-meta-coord">41°29′N · 71°43′W</span>
        <span className="hero-meta-rule" />
        <span>Hope Valley, RI · Est. 2025</span>
      </div>
      <span className="hero-eyebrow">A development studio for builders crossing open water.</span>
      <h1>From sandbox<br />to <em>revenue.</em></h1>
      <div className="hero-deck">
        <div className="hero-byline">
          <strong>Capt.</strong> Stanton Terranova<br />
          <strong>Crew</strong> Hurshan · Srivatsava<br />
          <strong>Berth</strong> Hope Valley, RI<br />
          <strong>Cargo</strong> Web3 · AI · Campaign Tech
        </div>
        <div>
          <p className="hero-sub">Canvas Labs designs, builds, and deploys custom digital infrastructure for campaigns, organizations, and businesses too ambitious for off-the-shelf software. Twenty years of tooling experience, six products in production, and a 180-day turnkey delivery — under one roof in Rhode Island.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Charter a project</a>
            <a href="#portfolio" className="btn btn-ghost btn-arrow">See the fleet <span>→</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* MARQUEE */}
<div className="marquee-wrap">
    <div className="marquee-track" id="marquee-track">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
        <span key={`${t}-${i}`} className="marquee-item">
          {t}
          <span className="marquee-dot" />
        </span>
      ))}
    </div>
  </div>

{/* FOUR PILLARS */}
<section id="services" ref={servicesRef} className="pillars">
  <div className="container">
    <div className="sec-header rv">
      <div className="sec-numeral">i.</div>
      <div className="sec-head-body">
        <span className="sec-label label">What We Deliver</span>
        <h2 className="sec-title">Four Pillars<br />of <em>Value.</em></h2>
        <p className="pillars-sub">Equal parts expertise, execution, access, and proof. Here's what you get when you work with Canvas Labs.</p>
      </div>
    </div>
    <div className="pillar-grid">
      <div className="pillar-card rv d1">
        <div className="pillar-img">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" alt="" />
          <div className="pillar-img-overlay" />
        </div>
        <div className="pillar-body">
          <div className="pillar-num">01</div>
          <h3>Expert Team</h3>
          <p>Decades of combined experience in campaign technology, digital infrastructure, and custom software development. Our team has built tools that have powered campaigns at every scale.</p>
          <ul className="pillar-features">
            <li><span className="pillar-ck">&#10003;</span> Senior engineering & design</li>
            <li><span className="pillar-ck">&#10003;</span> Campaign technology specialists</li>
            <li><span className="pillar-ck">&#10003;</span> 20+ years of tooling experience</li>
          </ul>
        </div>
      </div>
      <div className="pillar-card rv d2">
        <div className="pillar-img">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80" alt="" />
          <div className="pillar-img-overlay" />
        </div>
        <div className="pillar-body">
          <div className="pillar-num">02</div>
          <h3>Custom Dev Work</h3>
          <p>Purpose-built tools tailored to your exact needs. From concept to deployment, we build what doesn't exist yet. Turnkey delivery in as little as 180 days.</p>
          <ul className="pillar-features">
            <li><span className="pillar-ck">&#10003;</span> Concept to deployment pipeline</li>
            <li><span className="pillar-ck">&#10003;</span> Proprietary technology development</li>
            <li><span className="pillar-ck">&#10003;</span> Turnkey 180-day delivery</li>
          </ul>
        </div>
      </div>
      <div className="pillar-card rv d3">
        <div className="pillar-img">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="" />
          <div className="pillar-img-overlay" />
        </div>
        <div className="pillar-body">
          <div className="pillar-num">03</div>
          <h3>Institutional Access</h3>
          <p>Full access to the Canvas tool ecosystem — XPoll, GRWB, Dredge, InkD, Sardine — plus connections to broader partner networks, institutional resources, and industry contacts.</p>
          <ul className="pillar-features">
            <li><span className="pillar-ck">&#10003;</span> Full Canvas tool ecosystem</li>
            <li><span className="pillar-ck">&#10003;</span> Partner & institutional networks</li>
            <li><span className="pillar-ck">&#10003;</span> Resource & grant connections</li>
          </ul>
        </div>
      </div>
      <div className="pillar-card rv d4">
        <div className="pillar-img">
          <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80" alt="" />
          <div className="pillar-img-overlay" />
        </div>
        <div className="pillar-body">
          <div className="pillar-num">04</div>
          <h3>Portfolio Projects</h3>
          <p>Proven track record across political campaigns, community platforms, and custom technology builds. We don't just talk — we ship.</p>
          <ul className="pillar-features">
            <li><span className="pillar-ck">&#10003;</span> Political campaign technology</li>
            <li><span className="pillar-ck">&#10003;</span> Community engagement platforms</li>
            <li><span className="pillar-ck">&#10003;</span> Custom enterprise tooling</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

{/* FLEET */}
<section id="portfolio" className="portfolio">
  <div className="container">
    <div className="sec-header rv">
      <div className="sec-numeral">ii.</div>
      <div className="sec-head-body">
        <span className="sec-label label">The Fleet · Selected Work</span>
        <h2 className="sec-title">Six ships, in service.<br /><em>More under construction.</em></h2>
      </div>
    </div>
    <div className="port-tabs rv d1">
      {(
        [
          ["all", "All"],
          ["web3", "Web3"],
          ["ai", "AI / Agents"],
          ["defi", "Data / DeFi"],
          ["enterprise", "Enterprise"],
        ] as const
      ).map(([id, label]) => (
        <button
          key={id}
          type="button"
          className={"port-tab" + (portfolioCat === id ? " active" : "")}
          onClick={() => setPortfolioCat(id)}
        >
          {label}
        </button>
      ))}
    </div>
    <div className="port-grid">

      {/* WEB3 */}
      <div className={"port-group" + (groupHidden("web3") ? " hidden" : "")} data-group="web3">
        <div className="port-card cat-web3 rv d1">
          <div className="port-img">
            <img src={xpollUrl} alt="XPoll Platform" className="port-real-img" />
          </div>
          <div className="port-body">
            <div className="port-meta"><span>No. 01</span><span className="port-meta-sep" /><span>Campaign Tech · Web3</span><span className="port-meta-sep" /><span>In Service 2023</span></div>
            <h3 className="port-name">XPoll — a constituent builder for the open web.</h3>
            <p className="port-desc">Constant-contact engine powering decentralized campaigns. Token-gated constituent outreach, on-chain polling, and multi-channel engagement. Live at xpoll.io, powering active campaigns across three states.</p>
            <dl className="port-specs">
              <div><dt>Client</dt><dd>Canvas Labs (in-house)</dd></div>
              <div><dt>Role</dt><dd>Product, engineering, design</dd></div>
              <div><dt>Stack</dt><dd>React · Solidity · Node</dd></div>
              <div><dt>Visit</dt><dd><a href="https://xpoll.io" target="_blank">xpoll.io ↗</a></dd></div>
            </dl>
          </div>
        </div>
        <div className="port-card cat-web3 rv d2">
          <div className="port-img">
            <img src={grwbUrl} alt="GRWB Engine" className="port-real-img" />
          </div>
          <div className="port-body">
            <div className="port-meta"><span>No. 02</span><span className="port-meta-sep" /><span>Growth Engine · Web3</span></div>
            <h3 className="port-name">GRWB Engine</h3>
            <p className="port-desc">Flash interest builder with automated social mining and intelligent audience targeting. Live at greatrwb.com.</p>
            <dl className="port-specs">
              <div><dt>Client</dt><dd>Canvas Labs</dd></div>
              <div><dt>Visit</dt><dd><a href="https://greatrwb.com" target="_blank">greatrwb.com ↗</a></dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* AI / AGENTS */}
      <div className={"port-group" + (groupHidden("ai") ? " hidden" : "")} data-group="ai">
        <div className="port-card cat-ai rv d1">
          <div className="port-img">
            <img src={inkdUrl} alt="InkD Publishing" className="port-real-img" />
          </div>
          <div className="port-body">
            <div className="port-meta"><span>No. 05</span><span className="port-meta-sep" /><span>Publishing Agents · AI</span></div>
            <h3 className="port-name">InkD Publishing</h3>
            <p className="port-desc">Automated multi-channel content distribution and polling platform with AI publishing agents.</p>
            <dl className="port-specs">
              <div><dt>Status</dt><dd>In production</dd></div>
              <div><dt>Stack</dt><dd>Node · LangChain</dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* DATA / DeFi */}
      <div className={"port-group" + (groupHidden("defi") ? " hidden" : "")} data-group="defi">
        <div className="port-card cat-defi rv d1">
          <div className="port-img">
            <img src={dredgeUrl} alt="Dredge" className="port-real-img" />
          </div>
          <div className="port-body">
            <div className="port-meta"><span>No. 06</span><span className="port-meta-sep" /><span>Data Analytics · DeFi</span></div>
            <h3 className="port-name">Dredge</h3>
            <p className="port-desc">Campaign digital twin for scenario modeling, NLP query, and strategy optimization.</p>
            <dl className="port-specs">
              <div><dt>Client</dt><dd>Canvas Labs</dd></div>
              <div><dt>Visit</dt><dd><a href="https://app.dredge.world/" target="_blank">dredge.world ↗</a></dd></div>
            </dl>
          </div>
        </div>
      </div>

      {/* ENTERPRISE */}
      <div className={"port-group" + (groupHidden("enterprise") ? " hidden" : "")} data-group="enterprise">
        <div className="port-card cat-enterprise rv d1">
          <div className="port-img">
            <img src={dasmoreUrl} alt="Dasmore Solutions" className="port-real-img" />
          </div>
          <div className="port-body">
            <div className="port-meta"><span>No. 08</span><span className="port-meta-sep" /><span>Enterprise Solutions</span></div>
            <h3 className="port-name">Dasmore Solutions</h3>
            <p className="port-desc">End-to-end enterprise software powering organizations with scalable digital infrastructure.</p>
            <dl className="port-specs">
              <div><dt>Client</dt><dd>Dasmore</dd></div>
              <div><dt>Visit</dt><dd><a href="https://www.dasmoresolutions.com/" target="_blank">dasmoresolutions.com ↗</a></dd></div>
            </dl>
          </div>
        </div>
        <div className="port-card cat-enterprise rv d2">
          <div className="port-img">
            <img src={sardineUrl} alt="Sardine Pay" className="port-real-img" />
          </div>
          <div className="port-body">
            <div className="port-meta">
              <span>No. 07</span>
              <span className="port-meta-sep" />
              <span>DeFi Intelligence</span>
            </div>
            <h3 className="port-name">Sardine Pay</h3>
            <p className="port-desc">
              Campaign intelligence, DeFi infrastructure, and competitive landscape monitoring.
            </p>
            <dl className="port-specs">
              <div>
                <dt>Status</dt>
                <dd>In development</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>On-chain intel</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

{/* FEATURED IN */}
<div className="press rv">
  <div className="press-inner">
    <span className="press-label label">As Seen In</span>
    <h3 className="press-headline serif">Canvas Labs in the press.</h3>
    <div className="press-logos">
      <a href="https://www.ibtimes.com/inside-stanton-terranovas-canvas-labs-innovative-space-ideas-that-dont-fit-mold-3791873" target="_blank" className="press-logo-link">
        <img src={pressFeatured} alt="IBTimes" className="press-logo" />
      </a>
      <a href="https://www.villagevoice.com/how-a-new-england-farmer-became-a-builder-of-narrative-platforms-for-communities-seeking-clearer-digital-voices/" target="_blank" className="press-logo-link">
        <img src={pressVoice} alt="Village Voice" className="press-logo" />
      </a>
      <a href="https://www.flipsnack.com/menapublishinggroup/bizpreneur-middle-east-january-2026/full-view.html?p=124" target="_blank" className="press-logo-link">
        <img src={pressBiz} alt="Bizpreneur" className="press-logo" />
      </a>
      <a href="https://ceoweekly.com/from-law-to-systems-innovation-how-stanton-terranova-built-a-life-and-business-around-earned-independence/" target="_blank" className="press-logo-link">
        <img src={pressCeo} alt="CEO Weekly" className="press-logo" />
      </a>
      <a href="https://www.yglf.org/leadership-team" target="_blank" className="press-logo-link">
        <img src={pressYglf} alt="YGLF" className="press-logo" />
      </a>
    </div>
  </div>
</div>

{/* STUDIO */}
<section id="ai-suite" className="ai-suite">
  <div className="container" style={{position: "relative", zIndex: "2"}}>
    <div className="sec-header rv">
      <div className="sec-numeral">iii.</div>
      <div className="sec-head-body">
        <span className="sec-label label">The Studio · Production Services</span>
        <h2 className="sec-title">A full production suite,<br /><em>on retainer or project.</em></h2>
      </div>
    </div>
    <div className="ai-grid">
      <div className="ai-card rv d1"><div className="ai-icon">i.</div><div className="ai-title serif">Graphics</div><p className="ai-desc">AI-augmented campaign graphics, social assets, and brand materials — produced at speed without losing the hand-made feel.</p></div>
      <div className="ai-card rv d2"><div className="ai-icon">ii.</div><div className="ai-title serif">Design</div><p className="ai-desc">Full UX/UI design, web layouts, and visual identity systems built by designers, not templates.</p></div>
      <div className="ai-card rv d3"><div className="ai-icon">iii.</div><div className="ai-title serif">Video</div><p className="ai-desc">Campaign video production, editing, and AI-enhanced post-production for every platform.</p></div>
      <div className="ai-card rv d4"><div className="ai-icon">iv.</div><div className="ai-title serif">Mixed Media</div><p className="ai-desc">Cross-format content blending graphics, video, audio, and interactive elements into cohesive campaign assets.</p></div>
    </div>
    <div className="ai-banner rv">
      <span className="ai-banner-text">Available as a campaign add-on or standalone service. Contact us to learn more.</span>
      <a href="#contact" className="ai-banner-link">Get in touch <span>→</span></a>
    </div>
  </div>
</section>

{/* CHARTER */}
<section id="contact" className="contact">
  <div className="container">
    <div className="sec-header rv">
      <div className="sec-numeral">iv.</div>
      <div className="sec-head-body">
        <span className="sec-label label">Charter a project</span>
        <h2 className="sec-title">Every build starts with<br />a <em>scoping session.</em></h2>
      </div>
    </div>
    <div className="contact-wrap rv">
      <div className="contact-info">
        <h3 className="contact-info-title">Tell us what you're building.<br /><em>We'll tell you what it takes.</em></h3>
        <p className="contact-info-sub">Whether you're launching a new initiative or scaling an existing operation, we'll match you with the right tools and timeline. Our team responds within 24 hours.</p>
        <p className="contact-free">Free initial scoping — no deck required.</p>
        <ul className="contact-bullets">
          <li><span className="ci">i.</span><span>Fast response — our team follows up within 24 hours on all inquiries.</span></li>
          <li><span className="ci">ii.</span><span>All project details kept strictly confidential — NDA available on request.</span></li>
          <li><span className="ci">iii.</span><span>Free initial scoping session for all new projects, no commitment required.</span></li>
        </ul>
      </div>
      <div className="contact-form-wrap">
        <div className="form-title">Request a consultation</div>
        <form onSubmit={onFormSubmit}>
          <div className="form-grid">
            <div className="form-row"><label>Name</label><input name="name" type="text" placeholder="Your full name" required /></div>
            <div className="form-row"><label>Email</label><input name="email" type="email" placeholder="you@example.com" required /></div>
            <div className="form-row form-full"><label>Organization</label><input name="organization" type="text" placeholder="Your organization" /></div>
            <div className="form-row"><label>Project type</label><div className="select-wrap"><select name="project_type" required defaultValue=""><option value="" disabled>Select type</option><option>Custom Development</option><option>AI Production</option><option>Campaign Tools</option><option>Consulting</option><option>White Label / Licensing</option><option>Other</option></select></div></div>
            <div className="form-row"><label>Budget range</label><div className="select-wrap"><select name="budget" required defaultValue=""><option value="" disabled>Select range</option><option>Under $50K</option><option>$50K – $100K</option><option>$100K – $500K</option><option>$500K+</option></select></div></div>
            <div className="form-row form-full"><label>Timeline</label><div className="select-wrap"><select name="timeline" required defaultValue=""><option value="" disabled>Select timeline</option><option>Under 3 months</option><option>3 – 6 months</option><option>6 – 12 months</option><option>12+ months</option></select></div></div>
            <div className="form-row form-full">
              <label>Project description</label>
              <textarea name="description" placeholder="Tell us what you're looking to build..." />
            </div>
          </div>
          <button type="submit" className="form-submit">{submitLabel}</button>
        </form>
      </div>
    </div>
  </div>
</section>

{/* FOOTER */}
<footer>
  <div className="footer-inner">
    <div className="footer-col">
      <a href="#" className="footer-logo" aria-label="Canvas Labs">
        <img src={faviconUrl} alt="" className="footer-logo-img" />
        <span className="footer-wordmark">
          Canvas <em>Labs</em>
        </span>
      </a>
      <p className="footer-brand">A development studio for builders crossing open water.</p>
      <p className="footer-coords">41°29′N · 71°43′W<br />Hope Valley, Rhode Island</p>
    </div>
    <div className="footer-col">
      <h4>Manifest</h4>
      <ul>
        <li><a href="#services">The Manifest</a></li>
        <li><a href="#portfolio">The Fleet</a></li>
        <li><a href="#ai-suite">The Studio</a></li>
        <li><a href="#contact">Charter</a></li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Fleet</h4>
      <ul>
        <li><a href="https://xpoll.io" target="_blank">XPoll ↗</a></li>
        <li><a href="https://greatrwb.com" target="_blank">GRWB ↗</a></li>
        <li><a href="https://client.dredge.world " target="_blank">Dredge ↗</a></li>
        <li><a href="https://www.dasmoresolutions.com/" target="_blank">Dasmore ↗</a></li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Mail us</h4>
      <ul>
        <li><a href="mailto:stanton@canvaslabs.world">stanton@canvaslabs.world</a></li>
        <li><a href="tel:+18606550095">+1 860 655 0095</a></li>
        <li><a href="https://canvasstrategiesinternational.com/">Canvas Strategies ↗</a></li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <span className="footer-copy">© 2026 Canvas Labs · Est. 2025</span>
    <span className="footer-copy">Hope Valley, Rhode Island</span>
  </div>
</footer>
    </>
  );

  return (
    <>
      {body}
      <ScrollShipDecoration gradientId={shipGradId} />
    </>
  );
}
