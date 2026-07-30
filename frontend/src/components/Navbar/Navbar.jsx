import "./Navbar.css";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          aria-label="Go to Home"
          onClick={handleHomeClick}
        >
          <Icon icon="pixelarticons:arrow-left" />
          <span>HOME</span>
        </button>
      </div>

      <div className="navbar-right">
        <span>{title}</span>
      </div>
    </nav>
  );
}

export default Navbar;