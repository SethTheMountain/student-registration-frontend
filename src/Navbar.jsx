import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Student Registration</h1>
      <div>
        <Link to="/">Register</Link>
        <Link to="/students">Student List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
