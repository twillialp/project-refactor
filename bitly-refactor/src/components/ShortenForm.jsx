import { useState } from "react";

function ShortenForm({ onShorten, error, loading }) {
  const [value, setValue] = useState("");

  function isLikelyUrl(url) {
    return /^https?:\/\/.+/i.test(url);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) {
      alert("Please add a link");
      return;
    }

    if (!isLikelyUrl(trimmed)) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    onShorten(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="shorten-form">
      <input
        id="urlEntered"
        type="text"
        placeholder="Shorten a link here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={error ? "input-error" : ""}
      />
      <button id="submitBtn" type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten It!"}
      </button>
      {error && <p className="error-msg">{error}</p>}
    </form>
  );
}

export default ShortenForm;
