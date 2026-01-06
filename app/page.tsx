"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [projects, setProjects] = useState<
    { file: string; url: string; title: string; subtitle: string }[]
  >([]);

  // 1. Scroll Handler to prevent Hash updates
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sectionIds = ["home", "projects", "contact"];
    const updateActive = () => {
      const midpoint = window.innerHeight * 0.4;
      let current = "home";
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top <= midpoint && rect.bottom >= midpoint) {
          current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/project-thumbnails/links.csv");
        if (!response.ok) return;
        const text = await response.text();
        const rows = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
        const parsed = rows.map((line) => {
          const [file, url] = line.split(",");
          const title = (file || "").replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
          return { file, url, title, subtitle: "Digital Design & Development" };
        });
        setProjects(parsed);
      } catch {
        setProjects([]);
      }
    };
    loadProjects();
  }, []);

  return (
    <main className="page">
      <nav className="nav">
        <a
          className={`nav-link ${activeSection === "home" ? "is-active" : ""}`}
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
        >
          HOME
        </a>
        <a
          className={`nav-link ${activeSection === "projects" ? "is-active" : ""}`}
          href="#projects"
          onClick={(e) => scrollToSection(e, "projects")}
        >
          PROJECTS
        </a>
        <a
          className={`nav-link ${activeSection === "contact" ? "is-active" : ""}`}
          href="#contact"
          onClick={(e) => scrollToSection(e, "contact")}
        >
          CONTACT
        </a>
      </nav>

      <section className="home-section" id="home">
        {/* 1. BRANDING: Logo, Name */}
        <div className="logo-frame">
          <div className="logo-stack">
            <span className="logo-circle" aria-hidden="true" />
            <div className="logo-mark">
              <img src="/mithran-logo.png" alt="Mithran logo" />
            </div>
          </div>
          <h1 className="name">Mithran Mohanraj</h1>
        </div>

        {/* 2. HERO IMAGES */}
        <div className="hero-row">
          <div className="hero-card hero-card-accent">
            <img className="hero-image" src="/hero/one.jpg" alt="Portrait One" />
          </div>
          <div className="hero-card">
            <img className="hero-image" src="/hero/two.jpg" alt="Portrait Two" />
          </div>
          <div className="hero-card">
            <img className="hero-image" src="/hero/three.jpg" alt="Portrait Three" />
          </div>
        </div>

        {/* 3. SOCIAL BUTTONS */}
        <div className="social-row" aria-label="Social links">
          <a className="button button-social" href="https://github.com/mithranm" target="_blank" rel="noreferrer">
            <img className="social-icon" src="/github.svg" alt="" />
            <span>GitHub</span>
          </a>
          <a className="button button-social" href="https://linkedin.com/in/mithran-mohanraj/" target="_blank" rel="noreferrer">
            <img className="social-icon" src="/linkedin.svg" alt="" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* 4. CTA */}
        <a
          className="button button-primary"
          href="#projects"
          onClick={(e) => scrollToSection(e, "projects")}
        >
          View Projects
        </a>
      </section>

      <section className="projects" id="projects">
        <div className="projects-inner">
          <h2 className="section-title">Selected Projects</h2>
          <div className="project-grid">
            {projects.map((p) => (
              <a className="project-card" key={p.file} href={p.url} target="_blank" rel="noreferrer">
                <div className="project-thumb">
                  <img src={`/project-thumbnails/${p.file}`} alt={p.title} />
                </div>
                <div className="project-meta">
                  <p className="project-title">{p.title}</p>
                  <p className="project-subtitle">{p.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <p>Let’s build something thoughtful together.</p>
        <a className="contact-link" href="mailto:hello@mithran.dev">hello@mithran.dev</a>
      </section>
    </main>
  );
}