import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import "./GenreDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenre, setSelectedGenre } from "../../../app/features/genreSlice";
import { useNavigate } from "react-router-dom";

const GenreDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { genreList, selectedGenre } = useSelector((state) => state.genre);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle genre change
  const handleGenreUpdate = (option) => {
    dispatch(setSelectedGenre(option.name));
    // dispatch(fetchMovies(option.id));
    console.log("IDDDD", option.id, option.name);

    if (option.name === "All Genre") {
      navigate("/");
    }
    if (option.name !== "All Genre") {
      navigate(`/searchresult?genre=${option.id}`);
    }

    setOpen(false);
  };

  // Fetch Genre
  useEffect(() => {
    dispatch(fetchGenre());
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* {selected} */}
        {selectedGenre}
        <span className="arrow">
          <MdKeyboardArrowDown />
        </span>
      </button>

      {open && (
        <ul className="dropdown-options">
          {genreList.map((option) => (
            <li
              key={option.id}
              onClick={() => handleGenreUpdate(option)}
              className={option.name === selectedGenre ? "active" : ""}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenreDropdown;
