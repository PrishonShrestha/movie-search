import { useDispatch, useSelector } from "react-redux";
import "./FavouritePage.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { removeFromFavourite } from "../app/features/favouriteSlice";

const imagePath = import.meta.env.VITE_IMAGE_PATH;

const FavouriteiPage = () => {
  const dispatch = useDispatch();
  const favouriteMovies = useSelector(
    (state) => state.favourite?.favouriteMovies ?? []
  );

  //   console.log("Cart", favouriteMovies);
  return (
    <div className="cart-section">
      <h2>Favourites</h2>
      <div className="cart-container">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => {
            return (
              <div className="cart-card">
                <img src={`${imagePath}${movie.poster_path}`} alt="" />
                <h4>
                  {movie.title}
                  <span> ({movie.release_date.split("-")[0]})</span>
                </h4>
                <button onClick={() => dispatch(removeFromFavourite(movie))}>
                  <FaRegTrashAlt />
                </button>
              </div>
            );
          })
        ) : (
          <div>Your favourite list is empty</div>
        )}
      </div>
    </div>
  );
};

export default FavouriteiPage;
