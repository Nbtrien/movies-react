import React from 'react';
import { FormGroup, Row, Col } from 'reactstrap';

const FormCheckBox = (props) => {
    const { options, valuesSelected, ...inputProps } = props;
    return (
        <FormGroup>
            <Row>
                {options.map((option, index) => (
                    <Col md='2' key={index} className='flex'>
                        <label htmlFor={option.name} className='checkbox'>
                            {option.name}
                        </label>
                        <input
                            name={props.name}
                            id={option.name}
                            type='checkbox'
                            value={option.id}
                            onChange={props.onChange}
                            checked={valuesSelected.includes(option.id + '')}
                        />
                    </Col>
                ))}
            </Row>
        </FormGroup>
    );
};

export default FormCheckBox;
