import React, {useState} from "react";
import * as PropTypes from "prop-types";
import * as cn from "classnames";

const SearchPanel = ({ value, onSearch }) => {

    const [searchInFocus, setSearchInFocus] = useState(false);

    const onChangeSearch = (e) => {
        const key = e.target.value;
        onSearch(key);
    };

    return (
        <div className="Search-panel">
            <label htmlFor="search" className={cn("Search-panel__search-icon", {'Search-panel__search-icon-active': searchInFocus})}>
                <i className="material-icons">search</i>
            </label>
            <input
                id="search"
                name="search"
                className="Search-panel__input"
                value={value}
                onChange={onChangeSearch}
                onFocus={() => setSearchInFocus(true)}
                onBlur={() => setSearchInFocus(false)}
                placeholder="Введите запрос..."
            />
            <div className="Search-panel__delete-icon" onClick={() => onSearch('')}>
                <i className="material-icons">backspace</i>
            </div>
        </div>
    )
};

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchPanel;

