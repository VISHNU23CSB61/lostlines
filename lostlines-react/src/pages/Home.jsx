import "./Home.css";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  PackageSearch,
  Sparkles,
  Users,
  BadgeCheck
} from "lucide-react";

function Home() {
  return (
    <div className="home">

      {/* Animated Background */}

      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      {/* Hero */}

      <section className="hero">

        <div className="hero-left">

          <span className="hero-badge">
            <Sparkles size={16} />
            Campus Lost & Found Platform
          </span>

          <h1>
            Never Lose
            <br />
            <span>What Matters.</span>
          </h1>

          <p>
            LostLines is a modern platform that helps students
            report, search and recover lost belongings quickly,
            securely and efficiently.
          </p>

          <div className="hero-buttons">

            <Link
              to="/dashboard"
              className="primary-btn"
            >
              Open Dashboard
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              className="secondary-btn"
            >
              Learn More
            </Link>

          </div>

          <div className="hero-stats">

            <div className="mini-stat">

              <BadgeCheck />

              <div>

                <h3>98%</h3>

                <span>Recovery Rate</span>

              </div>

            </div>

            <div className="mini-stat">

              <Users />

              <div>

                <h3>1200+</h3>

                <span>Students</span>

              </div>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="hero-right">

          <div className="dashboard-preview">

            <div className="preview-header">

              <div className="dot red"></div>

              <div className="dot yellow"></div>

              <div className="dot green"></div>

            </div>

            <div className="preview-body">

              <div className="preview-card">

                <PackageSearch
                  size={35}
                  color="#3B82F6"
                />

                <h3>Laptop</h3>

                <span className="status-lost">

                  Lost

                </span>

                <p>

                  Last Seen:
                  <br />

                  Central Library

                </p>

              </div>

              <div className="preview-progress">

                <h4>Recovery Progress</h4>

                <div className="progress">

                  <div className="progress-fill"></div>

                </div>

                <span>92%</span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <div className="feature-card">

          <Search
            size={40}
            color="#3B82F6"
          />

          <h3>Smart Search</h3>

          <p>

            Instantly search lost and found
            belongings using intelligent filters.

          </p>

        </div>

        <div className="feature-card">

          <ShieldCheck
            size={40}
            color="#10B981"
          />

          <h3>Secure Authentication</h3>

          <p>

            JWT authentication keeps every
            account protected and private.

          </p>

        </div>

        <div className="feature-card">

          <PackageSearch
            size={40}
            color="#F59E0B"
          />

          <h3>Fast Recovery</h3>

          <p>

            Report and recover belongings
            across the campus quickly.

          </p>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <h2>

          Ready to reconnect people
          with what matters?

        </h2>

        <p>

          Join LostLines and make your campus
          smarter, safer and more connected.

        </p>

        <Link
          to="/dashboard"
          className="primary-btn"
        >

          Get Started

        </Link>

      </section>

    </div>
  );
}

export default Home;