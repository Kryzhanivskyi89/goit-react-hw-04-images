import { Component } from 'react';
import PropTypes from 'prop-types';

import style from '../styles.module.css'

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.closeModal();
        }
    };

    handleCloseModal = event => {
        if (event.currentTarget === event.target) {
            this.props.closeModal();
        }
    };

    render() {
        const { largeImageURL } = this.props;
        return (
            <div className={style.Overlay} onClick={this.handleCloseModal}>
                <div className={style.Modal}>
                    <img
                        className={style.ModalImage}
                        src={largeImageURL}
                        alt=""
                    />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
};

export default Modal