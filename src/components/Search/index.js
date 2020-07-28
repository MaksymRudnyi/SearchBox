import React from 'react';

import SearchInput from '../../Input';
import SearchFormContainer from '../Container';

// import './styles.scss';

const SearchFormSimple = () => (
    <SearchFormContainer>
        {({ searchValue, onSearchChange, items }) =>
                <SearchInput value={searchValue} onChange={onSearchChange} items={items}/>
        }
    </SearchFormContainer>
);

export default SearchFormSimple;
