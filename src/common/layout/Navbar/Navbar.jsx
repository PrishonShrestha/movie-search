import { useDispatch, useSelector } from "react-redux";
import GenreDropdown from "../../components/Dropdown/GenreDropdown";
import "./Navbar.css";
import { CiSearch } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { useNavigate } from "react-router";
import { fetchMovieByName } from "../../../app/features/searchSlice";
import { IoIosCart } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";

const imagePath = import.meta.env.VITE_IMAGE_PATH;
const Navbar = () => {
  const searchContainerRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const [isSearchActive, setIsSearchActive] = useState(false);

  const { moviesByName, isLoading, error } = useSelector(
    (state) => state.search
  );
  const debounceSearchTerm = useDebounce(searchTerm, 1000);

  // handle search
  const handleSearch = () => {
    if (searchTerm !== "") {
      navigate(`/SearchResult?query=${searchTerm.trim()}`);
      setIsSearchActive(false);
    }
  };

  // handle search on key press
  const handleSearchOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Recommendation
  useEffect(() => {
    if (debounceSearchTerm.trim() === "") return;
    setIsSearchActive(true);
    // dispatch(fetchMovieByName(searchTerm.toLowerCase()));
    dispatch(fetchMovieByName(debounceSearchTerm.toLowerCase()));
  }, [debounceSearchTerm, dispatch]);

  return (
    <div className="navbar-section">
      <div className="logo-section">
        <span onClick={() => navigate("/")}>Logo</span>
        <GenreDropdown />
      </div>
      <div className="nav-right-section">
        <div className="search-field-container">
          <button onClick={() => handleSearch()}>
            <CiSearch />
          </button>
          <input
            className="search-field"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchOnKeyPress}
            placeholder="Search by name"
          />

          {/* Search results */}
          <div
            ref={searchContainerRef}
            className={`search-result-container ${
              isSearchActive && searchTerm !== "" ? "active" : ""
            } `}
          >
            {moviesByName
              .map((movie) => {
                return (
                  <div
                    className="search-result-card-container"
                    onClick={() => navigate(`/MovieDetail?movie=${movie.id}`)}
                  >
                    <img
                      src={`${imagePath}${movie.poster_path}`}
                      alt="Image poster"
                    />
                    <div className="searh-card-movie-detail-container">
                      <h5>{movie.original_title}</h5>
                      <span>{movie.release_date.split("-")[0]}</span>
                    </div>
                  </div>
                );
              })
              .slice(0, 10)}
          </div>
        </div>

        {/* Cart */}
        <button
          className="favourite-button"
          onClick={() => navigate("Favourite")}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
