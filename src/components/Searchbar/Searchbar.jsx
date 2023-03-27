import { useState } from 'react'
import PropTypes from 'prop-types';
import style from '../styles.module.css'

const Searchbar = ({handleSearch}) => {	
    const [value, setValue] = useState('');

	const handleChange = (e) => {
		setValue( e.target.value )		
	}
	
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(value);
    };
    return (
        <>
			<header className={style.searchbar}>
            <form className={style.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={style.SearchformButton}>
                    <span className={style.searchform__button__label}>Search</span>
                </button>

                <input
                    className={style.searchform__input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handleChange}
                    value={value}
                />
            </form>
            </header>				
			</>
	)	
	
}

export default Searchbar

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};