import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import "./GenreDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenre, setSelectedGenre } from "../../../app/features/genreSlice";

const GenreDropdown = () => {
  const dispatch = useDispatch();
  const { genreList, selectedGenre } = useSelector((state) => state.genre);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch Genre
  useEffect(() => {
    dispatch(fetchGenre());
  }, [dispatch]);

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
          {genreList.map((option, index) => (
            <li
              key={option}
              onClick={() => {
                // setSelected(option);

                dispatch(setSelectedGenre(option));
                setOpen(false);
              }}
              className={option === selectedGenre ? "active" : ""}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GenreDropdown;
