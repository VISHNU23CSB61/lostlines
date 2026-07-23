import "./About.css";
import {
  ShieldCheck,
  Search,
  PackageSearch,
  Code2,
  Database,
  Globe,
} from "lucide-react";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About LostLines</h1>

        <p>
          LostLines is a modern Lost & Found platform built using the MERN
          Stack. It helps students report, search and recover lost belongings
          through a secure and user-friendly application.
        </p>
      </section>

      <section className="about-grid">

        <div className="about-card">
          <ShieldCheck size={45} color="#3B82F6" />
          <h2>Secure</h2>
          <p>
            JWT Authentication keeps every user's data safe and protected.
          </p>
        </div>

        <div className="about-card">
          <Search size={45} color="#10B981" />
          <h2>Smart Search</h2>
          <p>
            Search lost and found items instantly using filters and keywords.
          </p>
        </div>

        <div className="about-card">
          <PackageSearch size={45} color="#F59E0B" />
          <h2>Fast Recovery</h2>
          <p>
            Report missing items quickly and increase recovery chances.
          </p>
        </div>

      </section>

      <section className="tech-stack">

        <h2>Technology Stack</h2>

        <div className="tech-grid">

          <div className="tech-card">
            <Code2 size={35} />
            <span>React</span>
          </div>

          <div className="tech-card">
            <Globe size={35} />
            <span>Express.js</span>
          </div>

          <div className="tech-card">
            <Database size={35} />
            <span>MongoDB</span>
          </div>

          <div className="tech-card">
            <ShieldCheck size={35} />
            <span>JWT Auth</span>
          </div>

        </div>

      </section>

      <section className="developer">

        <h2>Developer</h2>

        <p>
          Built with ❤️ using the MERN Stack to simplify Lost & Found
          management in educational institutions.
        </p>

      </section>

    </div>
  );
}

export default About;