import { useSearchParams } from "react-router";
import "./MovieDetailPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieByID } from "../app/features/searchSlice";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

const MovieDetailPage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, movieByID } = useSelector((state) => state.search);
  const [searchParams] = useSearchParams();

  const movieID = searchParams.get("movie");

  useEffect(() => {
    if (movieID) {
      dispatch(fetchMovieByID(movieID));
    }
  }, [dispatch, movieID]);

  console.log("BY IDDDDDDD", movieID, movieByID);

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="movie-detail-section">
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

          <div className="movie-detail-genre-list">
            {/* {movieByID.genres.map((genre) => {
              return <span>{genre.name}</span>;
            })} */}
          </div>
          <div className="movie-detail-rating">
            {Array.from({ length: 5 }, (_, index) => {
              const rating = movieByID.vote_average / 2; // convert 10 scale to 5
              if (index + 1 <= Math.floor(rating)) {
                return <span key={index}>★</span>; // full star
              } else if (index < rating) {
                return <span key={index}>☆</span>; // half star could be handled with an icon library
              } else {
                return <span key={index}>☆</span>; // empty star
              }
            })}
            ({movieByID.vote_average})
          </div>
          <p>{movieByID.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
