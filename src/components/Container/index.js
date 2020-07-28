import React from 'react';
import {useDebounce, useSearch, useSearchForm} from "../../hooks";

const Container = ({children}) => {
    const {searchValue, onSearchChange} = useSearchForm();

    const {search: { articles = [] }} = useSearch(useDebounce(searchValue, 500));

    return children({ searchValue, onSearchChange, items: articles });

};

export default Container