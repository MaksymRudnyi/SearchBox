import React, {useState} from 'react';
import Autocomplete from 'react-autocomplete';

const Input = () => {
    const [value, setValue] = useState('');

    return <Autocomplete
        items={[
            { id: 'foo', label: 'foo' },
            { id: 'bar', label: 'bar' },
            { id: 'baz', label: 'baz' },
        ]}
        shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.label}
        renderItem={(item, highlighted) =>
            <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}
            >
                {item.label}
            </div>
        }
        value={value}
        onChange={e => setValue(e.target.value)}
        onSelect={value => setValue( value )}
    />;
};

export default Input;