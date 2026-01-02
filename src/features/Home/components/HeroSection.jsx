import "./HeroSection.css";
import { FaStar } from "react-icons/fa6";
import { MdAirplay } from "react-icons/md";

import ButtonWithIconAndTitle from "../../../common/components/Buttons/ButtonWithIconAndTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const HeroSection = ({ recentMovies }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const posterUrl = import.meta.env.VITE_IMAGE_PATH;

  // const currentIndex = Math.floor(Math.random() * recentMovies.length);

  const updateCurrentIndex = (index) => {
    setCurrentIndex(index);
  };

  // useEffect(() => {
  //   if (recentMovies.length > 0) {
  //     setCurrentIndex(Math.floor(Math.random() * recentMovies.length));
  //   }
  // }, [recentMovies]);

  // Update currentIndex every 30 seconds
  useEffect(() => {
    if (recentMovies.length === 0) return;

    // const interval = setInterval(() => {
    //   setCurrentIndex((prevIndex) => {
    //     // pick a new random index different from previous
    //     let newIndex;
    //     do {
    //       newIndex = Math.floor(Math.random() * recentMovies.length);
    //     } while (newIndex === prevIndex && recentMovies.length > 1);
    //     return newIndex;
    //   });
    // }, 30000);
    const interval = setInterval(() => {
      setCurrentIndex((preIndex) => {
        if (preIndex === recentMovies.length - 1) {
          return 0;
        }
        return preIndex + 1;
      });
    }, 30000);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [recentMovies.length]);

  if (!recentMovies || recentMovies.length === 0) {
    return <div>Loading... </div>;
  }
  return (
    <div
      className="hero-section"
      style={{
        "--hero-background-image": `url("${posterUrl}${recentMovies[currentIndex].backdrop_path}")`,
      }}
    >
      {/* Movie detail */}
      <div className="hero-movie-detail-container">
        <div className="hero-image">
          <img
            src={`${posterUrl}${recentMovies[currentIndex].poster_path}`}
            alt="Movie poster"
          />
        </div>
        <div className="hero-movie-detail">
          <h2>{recentMovies[currentIndex].original_title}</h2>
          <p>{recentMovies[currentIndex].release_date}</p>
          {/* <p>{recentMovies[randomIndex].genra_id}</p> */}
          <div className="rating">
            <FaStar />
            <span>{recentMovies[currentIndex].vote_average}</span>
          </div>
          <p className="hero-overview">{recentMovies[currentIndex].overview}</p>
          <div className="hero-button-container">
            <ButtonWithIconAndTitle
              background_color="var(--secondary-button-color)"
              title="Watch Trailer"
              icon={<MdAirplay />}
            />
            <ButtonWithIconAndTitle
              onClick={() =>
                navigate(`MovieDetail?movie=${recentMovies[currentIndex].id}`)
              }
              background_color="var(--primary-button-color"
              title="View More"
            />
          </div>
        </div>
      </div>

      {/* Recent releases */}
      <div className="recent-movies-container">
        <h4>Recent Releases</h4>
        <div className="recent-movies-card-container">
          {recentMovies.map((recentMovie, index) => {
            return (
              <div
                key={recentMovie.id}
                className={`horizontal-movie-card ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => updateCurrentIndex(index)}
              >
                <img
                  src={`${posterUrl}${recentMovie.backdrop_path}`}
                  alt="Movie poster"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
