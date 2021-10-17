import React, {useState} from 'react';

const NameSetter = () => {
    const [value, setValue] = useState('k');

    return (
        <div>
            <h2>{value}</h2>
            <input
                type="text"
                value={value}
                onChange={(event => setValue(event.target.value))}
            />
        </div>
    );
};

export default NameSetter;