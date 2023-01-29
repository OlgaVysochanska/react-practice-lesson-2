const MoviesGallery = ({ movies, openModal }) => {
  return (
    <ul>
      {movies.map(({ id, title, vote_count: votes, backdrop_path: image }) => {
        return (
          <li key={id}>
            <p>{title}</p>
                <p>Votes: { votes }</p>
                <button type="button" onClick={() => {openModal({src: image, alt: title})}}>Show Poster</button>
          </li>
        );
      })}
    </ul>
  );
};

export default MoviesGallery;
