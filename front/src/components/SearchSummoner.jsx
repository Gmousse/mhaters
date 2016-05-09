import React, { PropTypes } from 'react';

import Search from './reusables/Search.jsx';
import Select from './reusables/Select.jsx';
import Loader from './reusables/Loader.jsx';

const COUNTRIES = ['br', 'eune', 'euw', 'jp', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr'];

function SearchSummoner(props) {
    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
            {
            props.withCountries ? <Select
              value={props.selectValue}
              values={COUNTRIES}
              handleChange={(newSelectValue) => props.handleSelectChange(newSelectValue)}
              style={{width: '80px', marginRight: '1em'}} /> : ''
            }
            <Search
              value={props.searchValue}
              handleChange={(newSearchValue) => props.handleSearchChange(newSearchValue)}
              handleClick={() => props.handleSearchClick()} />
            {
                (() => {
                    switch (props.status) {
                    case 'loading':
                        return <Loader />;
                    case 'ready':
                        return <div>OK</div>;
                    case 'failed':
                        return <div>Retry</div>;
                    default:
                        return '';
                    }
                })()
            }
        </div>
    );
}

SearchSummoner.defaultProps = {
    searchValue: '',
    selectValue: '',
    handleSearchChange: () => {},
    handleSearchClick: () => {},
    handleSelectChange: () => {},
    withCountries: true,
    status: '',
};

SearchSummoner.propTypes = {
    searchValue: PropTypes.string,
    selectValue: PropTypes.string,
    handleSearchChange: PropTypes.func,
    handleSearchClick: PropTypes.func,
    handleSelectChange: PropTypes.func,
    withCountries: PropTypes.bool,
    status: PropTypes.string,
};

export default SearchSummoner;
