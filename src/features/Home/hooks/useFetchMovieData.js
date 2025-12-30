import { useEffect, useState } from "react";

const useFetchMovieData = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // API
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  // Fetch recent release
  const fetchRecentRelease = async () => {
    await fetch(`${apiUrl}now_playing?language=en&page=1&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => setRecentMovies(res.results))
      .catch((err) => console.error(err));

    console.log("Recent ---------" + recentMovies);
  };

  // Fetch Upcoming movies
  const fetchUpcomingMovies = async () => {
    await fetch(`${apiUrl}upcoming?language=en&page=1&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => setUpcomingMovies(res.results))
      .catch((err) => console.error(err));
  };

  //Fetch Popular movies
  const fetchPopularMovies = async () => {
    await fetch(`${apiUrl}popular?language=en&page=1&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => setPopularMovies(res.results))
      .catch((err) => console.error(err));
  };

  // Top rated
  const fetchTopRatedMovies = async () => {
    await fetch(`${apiUrl}top_rated?language=en&page=1&api_key=${apiKey}`)
      .then((res) => res.json())
      .then((res) => setTopRatedMovies(res.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUpcomingMovies();
    fetchRecentRelease();
    fetchPopularMovies();
    fetchTopRatedMovies();
  }, []);

  return { upcomingMovies, recentMovies, popularMovies, topRatedMovies };
};

export default useFetchMovieData;
