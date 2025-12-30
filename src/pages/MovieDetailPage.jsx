import "./MovieDetailPage.css";

const MovieDetailPage = () => {
  return (
    <div className="movie-detail-section">
      <div
        className="movie-detail-background"
        style={{
          "--movie-detail-background-image": `url("https://imgs.search.brave.com/q8WAioMcav20VJPgHzRhhy9tFuQjZ0Bgql1lr3jVzAo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL1Mv/c29uYXRhLWltYWdl/cy1wcm9kL1VTXzNQ/X1NWT0RfQU1pbmVj/cmFmdE1vdmllLzI4/MDFlMDk4LTZiMmEt/NDU3NC04MTkzLWI3/Zjc1ODFmOTg3NS5f/VVIzODQwLDE0NDBf/U1gyMTYwX0ZNanBn/Xy5qcGc")`,
        }}
      ></div>
    </div>
  );
};

export default MovieDetailPage;
