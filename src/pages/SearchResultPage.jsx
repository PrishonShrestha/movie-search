import { useNavigate, useSearchParams } from "react-router-dom";
import VerticalCard from "../common/components/Cards/VerticalCard";
import "./SearchResultPage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieByGenre,
  fetchMovieByName,
} from "../app/features/searchSlice";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const genre = searchParams.get("genre");
  const query = searchParams.get("query");

  const dispatch = useDispatch();
  const { moviesByName, moviesByGenre, isLoading, error, page } = useSelector(
    (state) => state.search
  );

  const pageNo = page ?? 1;
  //  Handle Card Click
  const handleCardClick = (e, movieID) => {
    e.preventDefault(), navigate(`/MovieDetail?movie=${movieID}`);
  };

  useEffect(() => {
    if (genre) {
      // dispatch(fetchMovie(genre));
      dispatch(fetchMovieByGenre({ genreID: genre, pageNo }));
    } else if (query && query !== "") {
      dispatch(fetchMovieByName({ query, pageNo }));
    }
  }, [genre, query, dispatch]);

  const searchedMovies = genre ? moviesByGenre : moviesByName;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="search-result-page">
      {searchedMovies?.map((movie) => {
        return (
          <VerticalCard
            key={movie.id}
            movie={movie}
            onClick={(e) => handleCardClick(e, movie.id)}
          />
        );
      })}
    </div>
  );
};

export default SearchResultPage;
