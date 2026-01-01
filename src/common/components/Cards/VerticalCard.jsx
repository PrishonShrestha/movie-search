import "./VerticalCard.css";

const imagePath = import.meta.env.VITE_IMAGE_PATH;
const VerticalCard = ({ movie = {}, onClick }) => {
  return (
    <div
      onClick={onClick}
      key={movie.id}
      className="vertical-movie-card"
      style={{
        "--vertical-movie-card-background": `url(${imagePath}${movie.poster_path})`,
      }}
    >
      <h4>
        {movie.original_title}
        <br /> <span>({movie.release_date.split("-")[0]})</span>
      </h4>

      <p>{movie.overview}</p>
    </div>
  );
};

export default VerticalCard;
