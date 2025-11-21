import { useEffect, useState } from "react";
import ShortenForm from "./components/ShortenForm";
import LinksList from "./components/LinksList";

const STORAGE_KEY = "shortLinks";
const BITLY_ENDPOINT = "https://api-ssl.bitly.com/v4/shorten";

// You explicitly asked to expose the token, so we'll hardcode it here.
// Fine for class projects; DO NOT do this in real production.
const BITLY_TOKEN = "Bearer 7a32e1dbc7d361c59ce06ceb7b4acd221421ebab";

function App() {
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Load saved links on first render
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setLinks(parsed);
      }
    } catch (e) {
      console.error("Error reading from localStorage", e);
    }
  }, []);

  // Save whenever links change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
    } catch (e) {
      console.error("Error writing to localStorage", e);
    }
  }, [links]);

  // Called by ShortenForm when user submits a valid URL
  async function handleShorten(url) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(BITLY_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: BITLY_TOKEN,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: url,
          domain: "bit.ly",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.link) {
        throw new Error(data.message || "Error shortening URL");
      }

      const newEntry = {
        id: Date.now().toString(),
        original: url,
        short: data.link,
      };

      setLinks((prev) => [newEntry, ...prev]);
    } catch (e) {
      console.error(e);
      setError(e.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <div id="navbar">
        <img src="/logo.svg" alt="site logo" />
        <div id="links">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div>
        {/* Blue area: form + list */}
        <div id="bluebg">
          <ShortenForm onShorten={handleShorten} error={error} loading={loading} />
        </div>

        <div id="shortenedUrl">
          <LinksList links={links} />
        </div>

        {/* Features section (your original text) */}
        <div id="features" className="centered">
          <h2 className="large-margin">Advanced Statistics</h2>
          <p>
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>

          <div className="features">
            <img
              src="/icon-brand-recognition.svg"
              alt="decorative"
              className="decorative-circle"
            />
            <h3>Brand Recognition</h3>
            <p className="features-text">
              Boost your brand recognition with each click. Generic links don't
              mean a thing. Branded links help instil confidence in your content.
            </p>
          </div>

          <div className="features">
            <img
              src="/icon-detailed-records.svg"
              alt="decorative"
              className="decorative-circle"
            />
            <h3>Detailed Records</h3>
            <p>
              Gain insights into who is clicking your links. Knowing when and
              where people engage with your content helps inform better decisions
            </p>
          </div>

          <div className="features">
            <img
              src="/icon-fully-customizable.svg"
              alt="decorative"
              className="decorative-circle"
            />
            <h3>Fully Customizable</h3>
            <p>
              Improve brand awareness and content discoverability through
              customizable links, supercharging audience engagement.
            </p>
          </div>
        </div>

        {/* Boost section */}
        <div id="boost-links">
          <br />
          <h2>Boost your links today</h2>
          <button id="boost-links-btn">Get Started</button>
        </div>

        {/* Footer */}
        <div className="footer">
          <br />
          <h2>Shortly</h2>
          <h3>Featured</h3>
          <ul>
            <li>Link Shortening</li>
            <li>Branded Links</li>
            <li>Analytics</li>
          </ul>

          <h3>Resources</h3>
          <ul>
            <li>Blog</li>
            <li>Developers</li>
            <li>Support</li>
          </ul>

          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Our Team</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>

          <div id="social-icons">
            <img src="/icon-facebook.svg" alt="facebook social link" />
            <img src="/icon-twitter.svg" alt="twitter social link" />
            <img src="/icon-pinterest.svg" alt="pinterest social link" />
            <img src="/icon-instagram.svg" alt="instagram social link" />
          </div>
          <br />
        </div>
      </div>
    </>
  );
}

export default App;
