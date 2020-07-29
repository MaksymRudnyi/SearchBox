import {useEffect, useState, useRef, useCallback} from 'react';
import axios from 'axios';

export const useSearchForm = (/*history*/) => {
    const [searchValue, setSearchValue] = useState();

    const onSearchChange = useCallback((ev) => {
        setSearchValue(ev.target.value);
    }, []);

    // const onSearchSubmit = useCallback((ev) => {
    //     ev.preventDefault();
    //     history.push(`/search?query=${encodeURIComponent(searchValue)}`);
    // }, [searchValue, history]);

    return { searchValue, onSearchChange/*, onSearchSubmit */};
};

export const useSearch = (query, limit = 5) => {
    const cancelToken = useRef(null);
    const [state, setState] = useState({
        search: {
            articles: []
        },
        status: 'IDLE',
        error: undefined
    });

    useEffect(() => {
        if (cancelToken.current) {
            cancelToken.current.cancel('message');
        }

        if (!query || query.length < 3) {
            setState((state) => ({ ...state, search: { articles: [] } }));
            return;
        }

        cancelToken.current = axios.CancelToken.source();

        setState((state) => ({ ...state, status: 'PENDING' }));

        axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${query}&limit=${limit}`, {
            cancelToken: cancelToken.current.token
        })
            .then((res) => res.data)
            .then((data) => {

                const responseItems = [];

                for(let i = 0; i < data[1].length; i++) {
                    responseItems.push({id: data[1][i], label: data[3][i]});
                }

                setState({
                    search: {
                        articles: responseItems
                    },
                    error: undefined,
                    status: 'SUCCESS'
                });
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    return;
                }

                setState({
                    search: {
                        articles: []
                    },
                    error,
                    status: 'ERROR'
                });
            });

        return () => {
            if (cancelToken.current) {
                cancelToken.current.cancel();
                cancelToken.current = null;
            }
        };
    }, [ query ]);

    return state;
};

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};