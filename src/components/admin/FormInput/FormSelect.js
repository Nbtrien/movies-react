import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

export default function FormSelect(props) {
    const { options, ...inputProps } = props;

    return (
        <Multiselect
            name={props.name}
            placeholder={props.placeholder}
            options={options} // Options to display in the dropdown
            onSelect={props.onChange} // Function will trigger on select event
            onRemove={props.onChange} // Function will trigger on remove event
            displayValue='name' // Property name to display in the dropdown options
            selectedValues={inputProps?.selectedValues}
        />
    );
}
