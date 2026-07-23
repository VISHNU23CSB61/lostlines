import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <h2>LostLines</h2>

                <p>
                    Making Lost & Found management simple, secure and efficient.
                </p>

                <div className="footer-links">
                    <a href="#">GitHub</a>
                    <a href="#">LinkedIn</a>
                    <a href="#">Email</a>
                </div>

                <p className="copyright">
                    © 2026 LostLines • Built with React, Node.js, Express & MongoDB
                </p>

            </div>
        </footer>
    );
}

export default Footer;