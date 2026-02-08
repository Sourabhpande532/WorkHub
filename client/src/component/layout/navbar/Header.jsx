import { Link, useNavigate } from "react-router-dom";
import { usePortal } from "../../../context/JobContext";
import API from "../../../api/axios";
import toast from "react-hot-toast";
import "./navbar.css";

const Header = () => {
  const { isLoggedIn } = usePortal();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await API.get("/auth/logout");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className='custom-navbar'>
      <div className='container d-flex justify-content-between align-items-center'>
        {/* Brand */}
        <Link to='/' className='nav-brand'>
          Intern House
        </Link>

        {/* Toggle */}
        <input type='checkbox' id='nav-toggle' />
        <label htmlFor='nav-toggle' className='nav-toggle-label'>
          ☰
        </label>

        {/* Links */}
        <ul className='nav-links'>
          <li>
            <Link to='/'>Job Postings</Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link to='/post-job'>Post a Job</Link>
            </li>
          )}

          <li className='auth-btn'>
            {isLoggedIn ? (
              <button onClick={logout}>Logout</button>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { Header };
