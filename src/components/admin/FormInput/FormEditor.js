import JoditEditor from 'jodit-react';
import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const FormEditor = (props) => {
    const handleChange = props.onChange;

    return (
        <>
            <JoditEditor name={props.name} onChange={props.onChange} {...props} />
        </>
    );
};
export default FormEditor;
