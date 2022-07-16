import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Navbar({ input, onChange, handleKeyDownInput }) {
  let navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="brand-logo" onClick={() => navigate("/")}>
        <div className="brand-logo__img">
          <img
            src="https://news.ycombinator.com/y18.gif"
            alt="Hacker News Logo"
          />
        </div>
        <h1 className="brand-logo__title">Hacker News</h1>
      </div>
      <div className="navbar-search">
        <input
          onChange={onChange}
          value={input}
          placeholder="Search here..."
          onKeyDown={handleKeyDownInput}
        />
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  input: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleKeyDownInput: PropTypes.func.isRequired
};
