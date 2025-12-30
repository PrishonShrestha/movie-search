import GenreDropdown from "../../components/Dropdown/GenreDropdown";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="navbar-section">
      <div className="logo-section">
        <span>Logo</span>
        <GenreDropdown />
      </div>
      <div className="search-field-container">
        <button>
          <CiSearch />
        </button>
        <input
          className="search-field"
          type="search"
          placeholder="Search by name"
        />
      </div>
    </div>
  );
};

export default Navbar;
