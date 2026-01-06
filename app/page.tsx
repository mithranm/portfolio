"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);
  const [projects, setProjects] = useState<
    { file: string; url: string; title: string; description: string }[]
  >([]);
  const [projectsDescription, setProjectsDescription] = useState("");

  // 1. Scroll Handler
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 2. Email Copy Handler
  const handleCopyEmail = () => {
    const email = "mithran@mithran.org";
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch((err) => {
        console.error("Failed to copy:", err);
      });
    } else {
      window.location.href = `mailto:${email}`;
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
        const response = await fetch("/projects/manifest.json");
        if (!response.ok) return;
        const data = await response.json();
        const manifestProjects = Array.isArray(data?.projects) ? data.projects : [];
        setProjectsDescription(typeof data?.description === "string" ? data.description : "");
        setProjects(
          manifestProjects.map((project: { file?: string; url?: string; title?: string; description?: string }) => ({
            file: project.file || "",
            url: project.url || "",
            title: project.title || "",
            description: project.description || "",
          })),
        );
      } catch {
        setProjects([]);
        setProjectsDescription("");
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
        <div className="logo-frame">
          <div className="logo-stack">
            <span className="logo-circle" aria-hidden="true" />
            <div className="logo-mark">
              <img src="/mithran-logo.png" alt="Mithran logo" />
            </div>
          </div>
          <h1 className="name">Mithran Mohanraj</h1>
        </div>

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
          <h2 className="section-title">Projects</h2>
          {projectsDescription ? (
            <p className="section-description">{projectsDescription}</p>
          ) : null}
          <div className="project-grid">
            {projects.map((p) => (
              <a className="project-card" key={p.file} href={p.url} target="_blank" rel="noreferrer">
                <div className="project-thumb">
                  <img src={`/projects/${p.file}`} alt={p.title} />
                </div>
                <div className="project-meta">
                  <p className="project-title">{p.title}</p>
                  <p className="project-subtitle">{p.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        {/* 
           FIX: The container is centered via CSS. 
           The inner img rotates via Motion. 
           No transform conflicts.
        */}
        <div className="contact-bg-star">
          <motion.img
            src="/mithran-logo.png"
            alt=""
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="contact-content-large">
          <h2 className="contact-label">Let's Build Something</h2>

          <button
            className="contact-email-large"
            onClick={handleCopyEmail}
          >
            mithran@mithran.org
          </button>

          <p className="contact-footer">Click email to copy</p>
        </div>

        <AnimatePresence>
          {copied && (
            <motion.div
              className="copy-feedback-overlay"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              COPIED!
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
