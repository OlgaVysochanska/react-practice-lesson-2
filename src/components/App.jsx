import { Component } from 'react';

import fetchMovies from 'services/moviesApi';
import { Button } from 'components/Button/Button';
import MoviesGallery from './MoviesGallery/MoviesGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    isMoviesShown: false,
    page: 1,
    movies: [],
    isLoading: false,
    currentImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { isMoviesShown, page } = this.state;
    if (
      (prevState.isMoviesShown !== isMoviesShown && isMoviesShown) ||
      (prevState.page !== page && isMoviesShown)
    ) {
      this.getMovies();
    }

    if (prevState.isMoviesShown !== isMoviesShown && !isMoviesShown) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showFilmList = () => {
    this.setState(prevState => ({
      isMoviesShown: !prevState.isMoviesShown,
    }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => console.log(error))
      .finally(() => this.setState({ isLoading: false }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    const { showFilmList, loadMore, openModal } = this;
    const { isMoviesShown, movies, currentImage } = this.state;
    return (
      <>
        <Button
          clickHandler={showFilmList}
          text={isMoviesShown ? 'Hide movies list' : 'Show movies list'}
        />
        {isMoviesShown && (
          <>
            <MoviesGallery movies={movies} openModal={openModal} />
            <Button text="Load More" clickHandler={loadMore} />
          </>
        )}

        {currentImage && (
          <Modal currentImage={currentImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
