import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({ dataInputValue, onChange }) => {
    return (
        <form action="">
            <input
                type="text"
                className="form-control"
                aria-label="Username"
                aria-describedby="addon-wrapping"
                placeholder="Search..."
                name="userName"
                id="userName"
                value={dataInputValue}
                onChange={onChange}
            />
        </form>
    );
};

SearchForm.propTypes = {
    dataInputValue: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchForm;
