import React from 'react';
import Autocomplete from 'react-autocomplete';

import InputField from "../components/Input";

import './styles.scss';

const Input = ({value, onChange, items}) => (
    <Autocomplete
        items={items}
        renderInput={InputField}
        inputProps={{ placeholder: 'Put any search term!'}}
        // shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}

        renderMenu={(children, value, style) => (
            items && items.length ? (
                <div style={{ ...style, top: 'auto', bottom: 0, left: 0 }}
                     className="autocomplete-menu">
                    {children}
                    <a href={`/search?query=${encodeURIComponent(value)}`} className="search-link">
                        See all results
                    </a>
                </div>
            ) : <></>
        )}

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
        // onSelect={value => {debugger; setValue( value )}}
    />
);

export default Input;