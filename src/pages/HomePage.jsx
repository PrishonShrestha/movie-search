import { useDispatch, useSelector } from "react-redux";
import HeroSection from "../features/Home/components/HeroSection";
import MoviesSection from "../features/Home/components/MoviesSection";

import "./HomePage.css";
import { useEffect } from "react";
import { fetchAllMovies } from "../app/features/moviesSlice";

const HomePage = () => {
  // const { recentMovies, popularMovies, upcomingMovies, topRatedMovies } =
  //   useFetchMovieData();

  const dispatch = useDispatch();

  const {
    recentMovies,
    upcomingMovies,
    popularMovies,
    topRatedMovies,
    isLoading,
    error,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchAllMovies());
  }, [dispatch]);

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error...{error}</div>;

  return (
    <div>
      <HeroSection recentMovies={recentMovies} />

      <section className="body-section">
        {/* Upcoming Movies */}
        <MoviesSection
          heading={"Upcoming Movies"}
          // moviesList={upcomingMovies}
          moviesList={upcomingMovies}
        />
        {/* Popular Movies */}
        <MoviesSection
          heading={"Popular Right Now"}
          // moviesList={popularMovies}
          moviesList={popularMovies}
        />
        {/* Top Rated Movies */}
        <MoviesSection
          heading={"Top Rated"}
          //  moviesList={topRatedMovies}
          moviesList={topRatedMovies}
        />
      </section>
    </div>
  );
};

export default HomePage;
