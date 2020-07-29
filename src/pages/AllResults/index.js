import React from 'react';

import { useSearch } from "../../hooks";

import './styles.scss';

const AllResults = ({...props}) => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const query = params.get('query');
    const RESULTS_COUNT = 50;

    const {search: { articles = [] }} = useSearch(query, RESULTS_COUNT);

    return (
        <div className="all-results-container">
            {articles.map(article => <div key={article.label}><a target="_blank" href={article.label}>{article.id}</a></div>)}
        </div>
    )
};

export default AllResults
