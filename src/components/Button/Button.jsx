import PropTypes from 'prop-types';
import style from '../styles.module.css'

function Button ({searchLoadMore, children}) {
    return (
            <button
                className={style.Button}
                onClick={() => {
                    searchLoadMore();}}
            >
                {children}
            </button>
        );
}

Button.propTypes = {
    searchLoadMore: PropTypes.func.isRequired,
};
    

export default Button
