import { useNavigate } from "react-router";
import VerticalCard from "../../../common/components/Cards/VerticalCard";
import "./MoviesSection.css";

const MoviesSection = ({ heading, moviesList }) => {
  const posterUrl = import.meta.env.VITE_IMAGE_PATH;
  const navigate = useNavigate();

  return (
    <div className="movies-section">
      <h3>{heading}</h3>
      <div className="vertical-movie-card-container">
        {/* Movie card */}

        {moviesList.map((movie) => {
          return (
            <VerticalCard
              movie={movie}
              onClick={() => navigate(`/MovieDetail?movie=${movie.id}`)}
            />
            // <div
            //   key={movie.id}
            //   className="vertical-movie-card"
            //   style={{
            //     "--vertical-movie-card-background": `url("${posterUrl}${movie.poster_path}")`,
            //   }}
            // >
            //   <h4>
            //     {movie.original_title} <br />{" "}
            //     <span>({movie.release_date.split("-")[0]})</span>
            //   </h4>

            //   <p>{movie.overview}</p>
            // </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoviesSection;
