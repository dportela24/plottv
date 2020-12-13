import classes from "./Header.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    return (
        <header className={classes.Header}>
            <div className={classes.Search}>
                <input
                    className={classes.SearchBar}
                    placeholder={"Enter TV Series name or IMDB ID"}/>
                <button type="submit" className={classes.SearchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </header>
    )
}

export default Header;