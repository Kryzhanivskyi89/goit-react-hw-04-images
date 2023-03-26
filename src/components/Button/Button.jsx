import PropTypes from 'prop-types';
import { Component } from 'react';
import style from '../styles.module.css'

class Button extends Component {
    render() {
        const { searchLoadMore, children } = this.props;
        return (
            <button
                className={style.Button}
                onClick={() => {
                    searchLoadMore();
                }}
            >
                {children}
            </button>
        );
    }
}

Button.propTypes = {
    searchLoadMore: PropTypes.func.isRequired,
};
    

export default Button
