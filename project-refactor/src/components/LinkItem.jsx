import { useState } from "react";

function LinkItem({ original, short }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(short);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
      alert("Unable to copy. Please copy manually.");
    }
  }

  return (
    <div className="link-row">
      <p className="original-url">{original}</p>
      <div className="short-url-container">
        <a
          className="short-url"
          href={short}
          target="_blank"
          rel="noopener noreferrer"
        >
          {short}
        </a>
        <button
          type="button"
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default LinkItem;
