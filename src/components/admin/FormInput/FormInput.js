import { useState } from 'react';
import { FormGroup, Input, Col, Row, Label } from 'reactstrap';
import FormCheckBox from './FormCheckBox';
import FormEditor from './FormEditor';
import FormSelect from './FormSelect';
import INPUT_TYPE from '../../../constants/InputType';

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, type, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <FormGroup row>
            <Col sm={2} className='label-group'>
                <label className='bold'>{label}</label>
            </Col>
            <Col sm={10}>
                {type === INPUT_TYPE.select ? (
                    <Input
                        type={type}
                        {...inputProps}
                        id='frequency'
                        onChange={onChange}
                        style={{ appearance: 'auto' }}
                        className='select-group'
                    >
                        {props.options.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </Input>
                ) : type === INPUT_TYPE.radio ? (
                    <Row>
                        {props.options.map((option, index) => (
                            <Col sm={2} className='label-group' key={index}>
                                <label className='bold'>{option.name}</label>
                                <Input
                                    type='radio'
                                    name={props.name}
                                    value={option.name}
                                    onChange={onChange}
                                    required
                                />
                            </Col>
                        ))}
                    </Row>
                ) : type === INPUT_TYPE.checkbox ? (
                    <FormCheckBox {...inputProps} onChange={onChange} />
                ) : type === INPUT_TYPE.multi_select ? (
                    <FormSelect {...inputProps} onChange={onChange} />
                ) : type === INPUT_TYPE.editor ? (
                    <FormEditor {...inputProps} onChange={onChange} />
                ) : (
                    <Input
                        type={type}
                        {...inputProps}
                        required={false}
                        autoComplete='off'
                        onChange={onChange}
                        onBlur={handleFocus}
                        focused={focused.toString()}
                    />
                )}
            </Col>
        </FormGroup>
    );
};

export default FormInput;
