import React, { useState} from 'react';
import Autocomplete from 'react-autocomplete';
// import _ from 'lodash';

import {useSearch, useDebounce} from '../hooks';

const Input = () => {
    const [value, setValue] = useState('');

    const onChange = (e) => setValue(e.target.value);

    const {search: { articles = [] }} = useSearch(useDebounce(value, 500));

    return <Autocomplete
        items={articles}
        // shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
            <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
                <a href={item.label} target="_blank">{item.id}</a>
            </div>
        }
        value={value}
        onChange={onChange}
        onSelect={value => {debugger; setValue( value )}}
    />;
};

export default Input;