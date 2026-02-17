export default function Home() {
    return (<>
      <header>
        <div className="container header-inner">
          <a href="/" className="logo">
            <div className="logo-icon">F</div>
            FatedFortress
          </a>
          <nav>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#" className="cta-button">Join Waitlist</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-badge">
              <span>⚡</span> The resume is a lie. Let's end the performance.
            </div>
            
            <h1>
              Build with people<br />
              who <span className="highlight">actually ship.</span>
            </h1>
            
            <p className="hero-subtitle">
              FatedFortress replaces LinkedIn theater with verified contributions. 
              Earn XP through real work. Join Execution Squads. 
              Ship with people who actually deliver.
            </p>
            
            <div className="hero-cta">
              <a href="#" className="primary">Get Early Access</a>
              <a href="#how-it-works" className="secondary">See How It Works</a>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-value">0%</div>
                <div className="stat-label">Resume Required</div>
              </div>
              <div className="stat">
                <div className="stat-value">100%</div>
                <div className="stat-label">Verified Contributions</div>
              </div>
              <div className="stat">
                <div className="stat-value">∞</div>
                <div className="stat-label">Possibilities</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <div className="section-header">
              <h2>Why FatedFortress?</h2>
              <p>The professional network for developers who actually build things.</p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📡</div>
                <h3>Telemetry as Truth</h3>
                <p>
                  Your XP is built on verified code commits, completed tasks, 
                  and code reviews—not self-reported skills.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎭</div>
                <h3>Anonymous or Visible</h3>
                <p>
                  Work under a pseudonym until you're ready to reveal. 
                  Full control over your visibility.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚔️</div>
                <h3>Execution Squads</h3>
                <p>
                  AI assembles teams based on complementary XP profiles. 
                  Find your perfect collaborators.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📉</div>
                <h3>Trust Decay</h3>
                <p>
                  Old XP fades. Recent contributions matter more. 
                  Your reputation reflects what you do now.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Decentralized Trust</h3>
                <p>
                  No central authority. No manipulation. 
                  Just verified contributions and transparent scoring.
                </p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🚀</div>
                <h3>Ship Fast</h3>
                <p>
                  Find teams, complete work, earn XP. 
                  The platform that rewards execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>How It Works</h2>
              <p>From resume to reality in four steps.</p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Connect Your Work</h3>
                  <p>
                    Link your GitHub, GitLab, or Bitbucket. We track your 
                    actual contributions, not your profile.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Earn XP</h3>
                  <p>
                    Complete tasks, review code, ship features. Every verified 
                    contribution earns you XP in multiple axes.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Join a Squad</h3>
                  <p>
                    AI matches you with complementary XP profiles. 
                    Find collaborators who complement your skills.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Ship & Scale</h3>
                  <p>
                    Execute. Deliver. Build your reputation on real work, 
                    not theater. The truth is your credential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="cta-section">
          <div className="container">
            <h2>Ready to end the performance?</h2>
            <p>Join the waitlist. Be first to access the platform.</p>
            <a href="#" className="hero-cta primary">Get Early Access</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-copy">
            © 2026 FatedFortress. Built for builders.
          </div>
        </div>
      </footer>
    </>);
}
//# sourceMappingURL=page.js.map