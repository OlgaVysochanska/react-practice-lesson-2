import { Component } from 'react';

import styles from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc(e) {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  }

  render() {
    const {
      currentImage: { alt, src },
      closeModal,
    } = this.props;

    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <button
            type="button"
            className={styles.btnClose}
            onClick={closeModal}
          >
            Close
          </button>
          <img src={'https://image.tmdb.org/t/p/w500/' + src} alt={alt} />
        </div>
      </div>
    );
  }
}
