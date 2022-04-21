import classes from './Header.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { motionDefaultProps } from "@nivo/core"
import { useState } from "react"

const Header = (props) => {
    console.log("In header")
    const [query, setQuery] = useState();


    const onSubmit = (e) => {
        e.preventDefault();


        props.onSubmit(query);
        setQuery("");        
    }

    return (
        <header className={classes.Header}>
            <form onSubmit={onSubmit} className={classes.Search}>
                <input
                    value={query}
                    className={classes.SearchBar}
                    placeholder={"Enter TV Series name or IMDb Id"}
                    onChange={e => setQuery(e.target.value)}/>
                <button type="submit" className={classes.SearchButton}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </header>
    )
}

export default Header;