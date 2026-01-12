import { useNavigate, useSearchParams } from "react-router-dom";
import VerticalCard from "../common/components/Cards/VerticalCard";
import "./SearchResultPage.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieByGenre,
  fetchMovieByName,
} from "../app/features/searchSlice";

import { resetMovies } from "../app/features/searchSlice";

const SearchResultPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const genre = searchParams.get("genre");
  const query = searchParams.get("query");

  const dispatch = useDispatch();
  const { moviesByName, moviesByGenre, isLoading, error, page } = useSelector(
    (state) => state.search
  );

  const observerRef = useRef(null);
  const isFetchingRef = useRef(false);

  //  Handle Card Click
  const handleCardClick = (e, movieID) => {
    e.preventDefault(), navigate(`/MovieDetail?movie=${movieID}`);
  };

  // Initial fetch
  useEffect(() => {
    dispatch(resetMovies());
    if (genre) {
      // dispatch(fetchMovie(genre));
      dispatch(fetchMovieByGenre({ genreID: genre, pageNo: 1 }));
    } else if (query && query !== "") {
      dispatch(fetchMovieByName({ query, pageNo: 1 }));
    }
  }, [genre, query, dispatch]);

  // Fetch next page
  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (isFetchingRef.current) return;

        isFetchingRef.current = true;

        const action = genre
          ? fetchMovieByGenre({ genreID: genre, pageNo: page + 1 })
          : fetchMovieByName({ query, pageNo: page + 1 });

        dispatch(action)
          .unwrap()
          .finally(() => {
            isFetchingRef.current = false;
          });
      },
      { rootMargin: "150px", threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [genre, query, page, dispatch]);

  const searchedMovies = genre ? moviesByGenre : moviesByName;

  // if (isLoading) return <div>Loading...</div>;
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

      {/* Sentinel element */}
      <div ref={observerRef} className="loading-trigger">
        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
