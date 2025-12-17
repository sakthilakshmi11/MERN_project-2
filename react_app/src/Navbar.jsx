import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ cartCount, onLogout }) {
  const navigate = useNavigate();
  
  // reactive login state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // watch localStorage token changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav style={{ background: "#333", padding: 10 }}>
      <Link to="/" style={{ color: "white", margin: 10 }}>Home</Link>
      <Link to="/products" style={{ color: "white", margin: 10 }}>Products</Link>
      <Link to="/cart" style={{ color: "white", margin: 10 }}>Cart ({cartCount})</Link>
      <Link to="/contact" style={{ color: "white", margin: 10 }}>Contact</Link>

      {/* show Login/Register if not logged in */}
      {!isLoggedIn && (
        <>
          <Link to="/login" style={{ color: "white", margin: 10 }}>Login</Link>
          <Link to="/register" style={{ color: "white", margin: 10 }}>Register</Link>
        </>
      )}

      {/* show Logout if logged in */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          style={{
            marginLeft: 10,
            padding: "5px 10px",
            cursor: "pointer",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}