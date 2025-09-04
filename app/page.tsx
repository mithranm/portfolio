// Minimal Portfolio Page - Hackathons & Projects Focus
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header Section */}
        <header className="text-center mb-16">
          <h1 className="glitch-text text-4xl md:text-6xl font-bold mb-4" data-text="Mithran Mohanraj">
            Mithran Mohanraj
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-6 uppercase tracking-wider">
            Software Engineer
          </p>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Computer Science student at George Mason University. Building AI systems, winning hackathons, 
            and creating innovative software solutions.
          </p>
        </header>

        {/* Projects Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-foreground/20 pb-2">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-foreground/20 p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a 
                  href="https://devpost.com/software/transitnest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  TransitNest
                </a>
              </h3>
              <p className="text-foreground/80 mb-4">🏆 Hackathon Winner • Transportation Innovation</p>
              <p className="text-foreground/60 mb-4 text-sm">
                Real-time transit optimization platform connecting riders with available transportation. 
                Built with React, Node.js, and real-time APIs.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">React</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Node.js</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">APIs</span>
              </div>
            </div>

            <div className="border border-foreground/20 p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a 
                  href="/githubissues.html" 
                  className="hover:text-accent transition-colors"
                >
                  GitHub Issue Analysis
                </a>
              </h3>
              <p className="text-foreground/80 mb-4">Machine Learning • Data Analysis</p>
              <p className="text-foreground/60 mb-4 text-sm">
                Predictive system for GitHub issue resolution times using machine learning. 
                Analyzes repository patterns and contributor behavior.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Python</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">ML</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">GitHub API</span>
              </div>
            </div>

            <div className="border border-foreground/20 p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a 
                  href="https://docs.google.com/document/d/1uJeKufqz0bwICVl9XAIDhgQJ146TrlVQRaWQlDkX528/edit?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  S2S Alchemy Paper
                </a>
              </h3>
              <p className="text-foreground/80 mb-4">Research • Academic Publication</p>
              <p className="text-foreground/60 mb-4 text-sm">
                Research project focused on realtime speech translation on mobile devices without internet connectivity
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Research</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Cryptography</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Security</span>
              </div>
            </div>

            <div className="border border-foreground/20 p-6">
              <h3 className="text-xl font-semibold mb-2">
                <a 
                  href="https://devpost.com/software/honeycar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Patriot Hacks 2023
                </a>
              </h3>
              <p className="text-foreground/80 mb-4">🏆 Hackathon Participant • Innovation Challenge</p>
              <p className="text-foreground/60 mb-4 text-sm">
                Competitive hackathon project focused on solving real-world problems through technology. 
                Rapid prototyping and collaborative development.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Hackathon</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Prototype</span>
                <span className="px-2 py-1 bg-foreground/10 border border-foreground/20">Innovation</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-foreground/20 pb-2">
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Languages</h3>
              <div className="space-y-2 text-foreground/80">
                <div>Python</div>
                <div>JavaScript/TypeScript</div>
                <div>Java</div>
                <div>C/C++</div>
                <div>SQL</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Technologies</h3>
              <div className="space-y-2 text-foreground/80">
                <div>React/Next.js</div>
                <div>Node.js</div>
                <div>Machine Learning</div>
                <div>AWS/Cloud</div>
                <div>Git/GitHub</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Focus Areas</h3>
              <div className="space-y-2 text-foreground/80">
                <div>Full-Stack Development</div>
                <div>AI/ML Systems</div>
                <div>Hackathon Development</div>
                <div>Research Projects</div>
                <div>Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider border-b border-foreground/20 pb-2">
            Contact
          </h2>
          
          <div className="flex flex-wrap gap-6 text-lg">
            <a 
              href="mailto:mithran.mohanraj@gmail.com" 
              className="hover:text-accent transition-colors border-b border-transparent hover:border-foreground uppercase tracking-wider"
            >
              Email
            </a>
            <a 
              href="https://github.com/mithranm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors border-b border-transparent hover:border-foreground uppercase tracking-wider"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/mithran-mohanraj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors border-b border-transparent hover:border-foreground uppercase tracking-wider"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/20 py-8">
        <div className="container mx-auto px-4 text-center text-foreground/60 text-sm uppercase tracking-wider">
          © {new Date().getFullYear()} Mithran Mohanraj
        </div>
      </footer>
    </div>
  );
}