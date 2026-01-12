import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../features/Home/components/HeroSection";
import MoviesSection from "../features/Home/components/MoviesSection";

import "./HomePage.css";
import { useEffect, useRef } from "react";
import { fetchAllMovies } from "../app/features/moviesSlice";

const HomePage = () => {
  // const { recentMovies, popularMovies, upcomingMovies, topRatedMovies } =
  //   useFetchMovieData();

  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);

  const {
    recentMovies,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    hasMore,
    page,
    isLoading,
    error,
  } = useSelector((state) => state.movies);

  // Initial Fetch
  useEffect(() => {
    // if (page === 1) {
    //   dispatch(fetchAllMovies({ page: 1 }));
    // }

    if (recentMovies.length === 0) {
      dispatch(fetchAllMovies({ page: 1, category: "recent" }));
    }
    if (upcomingMovies.length === 0) {
      dispatch(fetchAllMovies({ page: 1, category: "upcoming" }));
    }
    if (popularMovies.length === 0) {
      dispatch(fetchAllMovies({ page: 1, category: "popular" }));
    }
    if (topRatedMovies.length === 0) {
      dispatch(fetchAllMovies({ page: 1, category: "topRated" }));
    }
  }, [dispatch, page]);

  // Intersection Observer
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch(fetchAllMovies({ page: page + 1 }));
        }
      },
      { rootMargin: "300px" }
    );

    const target = loadMoreRef.current;
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, [dispatch, isLoading, hasMore, page]);

  // if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error...{error}</div>;

  return (
    <div>
      <HeroSection recentMovies={recentMovies} />

      <section className="body-section">
        {/* Upcoming Movies */}
        <MoviesSection
          heading={"Upcoming Movies"}
          moviesList={upcomingMovies}
          category="upcoming"
        />
        {/* Popular Movies */}
        <MoviesSection
          heading={"Popular Right Now"}
          moviesList={popularMovies}
          category="popular"
        />
        {/* Top Rated Movies */}
        <MoviesSection
          heading={"Top Rated"}
          moviesList={topRatedMovies}
          category="topRated"
        />
      </section>
    </div>
  );
};

export default HomePage;
