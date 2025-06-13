import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>📝 BlogApp</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {accessToken && (
          <>
            <Link to="/admin" style={styles.link}>Admin</Link>
            <Link to="/create" style={styles.link}>+ Create</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        )}
        {!accessToken && <Link to="/login" style={styles.link}>Login</Link>}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    backgroundColor: "#24292e",
    color: "white",
    flexWrap: "wrap",
  },
  logo: {
    margin: 0,
    fontSize: "1.5rem",
  },
  links: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    padding: "0.3rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
  }
};

export default Navbar;
