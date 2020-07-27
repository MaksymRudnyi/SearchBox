import {useEffect, useState, useRef} from 'react';
import axios from 'axios';

export const useSearch = (query) => {
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
            console.log('!!Cancel');
            cancelToken.current.cancel('message');
        }

        if (!query || query.length < 3) {
            setState((state) => ({ ...state, search: { articles: [] } }));
            return;
        }

        cancelToken.current = axios.CancelToken.source();

        setState((state) => ({ ...state, status: 'PENDING' }));

        // fetchApi(`${API_PREFIX}/search`, { params: { query } })
        axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${query}&limit=5`, {
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
                    console.log('!!Cancel1');
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
                console.log('!!Cancel2');
                cancelToken.current.cancel();
                cancelToken.current = null;
            }
        };
    }, [ query ]);

    return state;
};