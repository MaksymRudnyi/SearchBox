import React, {useEffect, useState} from 'react';
import Autocomplete from 'react-autocomplete';

import axios from 'axios';

const Input = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    const onChange = (e) => setValue(e.target.value);

    useEffect(() => {
        if (!value) {
            return;
        }

        axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${value}&limit=5`)
            .then(function (response) {
                // handle success
                console.log(response);
                const responseItems = [];
                const {data} = response;

                for(let i = 0; i < data[1].length; i++) {
                    responseItems.push({id: data[1][i], label: data[3][i]});
                }

                setItems(responseItems)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                setItems([])
            });
    }, [value]);



    return <Autocomplete
        items={items}
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