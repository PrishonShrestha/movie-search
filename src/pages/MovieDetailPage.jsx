import { useNavigate, useSearchParams } from "react-router";
import "./MovieDetailPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieByID } from "../app/features/searchSlice";
import { FaStar, FaPlay, FaHeart } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import ButtonWithIconAndTitle from "../common/components/Buttons/ButtonWithIconAndTitle";
import HorizontalCard from "../common/components/Cards/HorizontalCard";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

const MovieDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, movieByID, casts, similarMovies } = useSelector(
    (state) => state.search
  );
  const [searchParams] = useSearchParams();

  const movieID = searchParams.get("movie");

  useEffect(() => {
    if (movieID) {
      dispatch(fetchMovieByID(movieID));
    }
  }, [dispatch, movieID]);

  console.log("BY IDDDDDDD", movieID, movieByID, casts, similarMovies);

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="movie-detail-section">
      <div className="back-button" onClick={() => navigate(-1)}>
        <ButtonWithIconAndTitle
          icon={<BiArrowBack />}
          title="Back"
          background_color=""
        />
      </div>

      <div
        className="movie-detail-background-image"
        style={{
          "--movie-detail-background-image": `url(${imagePath}${movieByID.backdrop_path})`,
        }}
      ></div>
      <div className="movie-detail-container">
        <div className="movie-detail-poster">
          <img src={`${imagePath}${movieByID.poster_path}`} alt="" />
        </div>
        <div className="movie-detail">
          <h2>{movieByID.original_title}</h2>

          <div className="movie-info">
            <span>{movieByID.release_date}</span>
            <span>•</span>
            <span>{movieByID.runtime} min</span>
            <span>•</span>
            <span>
              <FaStar /> ({movieByID.vote_average})
            </span>
          </div>
          {/* Genre List */}
          <div className="movie-detail-genre-list">
            {movieByID?.genres?.map((genre) => {
              return <span>{genre.name}</span>;
            })}
          </div>

          {/* Overview */}
          <p>{movieByID.overview}</p>
          {/* Button Container */}
          <div className="movie-detail-button-container">
            <ButtonWithIconAndTitle
              icon={<FaPlay />}
              title="Watch Trailer"
              background_color="var(--secondary-button-color)"
            />
            <ButtonWithIconAndTitle
              icon={<FaHeart />}
              title="Add To Favourite"
              background_color="var(--red-button-color)"
            />
          </div>

          {/* Casts */}
          <h4>Casts</h4>
          <div className="casts-container">
            {casts?.map((cast) => {
              return (
                <img
                  src={`${imagePath}${cast.profile_path}`}
                  alt=""
                  height={100}
                  width={100}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="similar-movies-container">
        <h3>Similar Movies</h3>
        <div className="similar-movies-card-container">
          {similarMovies.map((similarMovies) => {
            return (
              // <div key={similarMovies.id} className="horizontal-movie-card">
              //   <img
              //     src={`${imagePath}${similarMovies.backdrop_path}`}
              //     alt="Movie poster"
              //   />
              // </div>
              <HorizontalCard
                movies={similarMovies}
                onClick={() =>
                  navigate(`/MovieDetail?movie=${similarMovies.id}`)
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
