import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import FavouritesPage from "../pages/FavouritesPage";
import SearchResultPage from "../pages/SearchResultPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import FavouritePage from "../pages/FavouritePage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <div>Page not found</div>,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "Favourites",
        Component: FavouritesPage,
      },
      // {
      //   path: "MovieDetail",
      //   Component: MovieDetailPage,
      // },
      {
        path: "SearchResult",
        Component: SearchResultPage,
      },
      {
        path: "Favourite",
        Component: FavouritePage,
      },
    ],
  },
  {
    path: "MovieDetail",
    Component: MovieDetailPage,
  },
]);
export default router;
