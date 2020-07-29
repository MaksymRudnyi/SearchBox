import React from 'react';

import './styles.scss';

const AllResults = ({...props}) => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const query = params.get('query');

    return (
        <div className="all-results-container">
            {query}
        </div>
    )
};

export default AllResults
