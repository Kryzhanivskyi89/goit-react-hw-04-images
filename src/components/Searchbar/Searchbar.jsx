import { Component } from 'react'
import PropTypes from 'prop-types';
import style from '../styles.module.css'

class Searchbar extends Component {
	state = {
		value: '',
	}
	
	handleChange = (e) => {
		this.setState({ value:e.target.value })		
	}
	
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.handleSearch(this.state.value)
	}

	
	render() {
		return (
            <>
				<header className={style.searchbar}>
                <form className={style.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={style.SearchformButton}>
                        <span className={style.searchform__button__label}>Search</span>
                    </button>

                    <input
                        className={style.searchform__input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </form>
            </header>				
			</>
		)
	}
}

export default Searchbar

Searchbar.propTypes = {
    handleSearch: PropTypes.func.isRequired,
};