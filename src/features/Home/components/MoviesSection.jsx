import { useNavigate } from "react-router";
import VerticalCard from "../../../common/components/Cards/VerticalCard";
import "./MoviesSection.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { fetchAllMovies } from "../../../app/features/moviesSlice";

const MoviesSection = ({ heading, moviesList, category }) => {
  const posterUrl = import.meta.env.VITE_IMAGE_PATH;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);

  const { isLoading, hasMore, page } = useSelector((state) => state.movies);

  const categoryPage = page?.[category] || 1;
  const categoryHasMore = hasMore?.[category] ?? true;

  // Infinite scroll observer
  useEffect(() => {
    if (isLoading || !categoryHasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Dispatch next page fetch
          // dispatch(fetchAllMovies({ page: page + 1 }));
          dispatch(fetchAllMovies({ page: categoryPage + 1, category }));
        }
      },
      {
        root: null, // viewport
        rootMargin: "200px",
        threshold: 0.1, // trigger when 10% visible
      }
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, [isLoading, hasMore, page, dispatch]);

  return (
    <div className="movies-section">
      <h3>{heading}</h3>
      <div className={`vertical-movie-card-container row-${category}`}>
        {/* Movie card */}

        {moviesList.map((movie) => {
          return (
            <VerticalCard
              key={movie.id}
              movie={movie}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/MovieDetail?movie=${movie.id}`);
              }}
            />
          );
        })}

        {/* Horizontal sentinel */}
        <div ref={loadMoreRef} className="sentinel" />

        {/* Loading */}
        {isLoading && categoryHasMore && (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoviesSection;
