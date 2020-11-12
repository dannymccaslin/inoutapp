import React from 'react';

const RadioButton = (props) => {
    const isChecked = props.checked;
    const value = props.value
    const name = props.name

    return(
        <input type='radio' id={value} name={name} value={value} checked={isChecked} />
    )
}
export default RadioButton;