import "./HorizontalCard.css";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

const HorizontalCard = ({ movies, onClick }) => {
  return (
    <div key={movies.id} className="horizontal-movie-card" onClick={onClick}>
      <img src={`${imagePath}${movies.backdrop_path}`} alt="Movie poster" />
    </div>
  );
};

export default HorizontalCard;
