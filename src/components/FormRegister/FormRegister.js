import { text } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import styles from '../../layouts/LoginLayout/login.module.scss';
import FormInput from '../FormInput/FormInput';
import Button from '../Button';

const cx = classNames.bind(styles);

function FormRegister() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            errorMessage: 'Name is invalid',
            label: 'Name',
            required: true,
            pattern: '[A-Za-z]{3,}',
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            placeholder: 'E-mail Address',
            errorMessage: 'Email is invalid',
            label: 'E-mail Address',
            required: true,
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage: 'Password is invalid',
            label: 'Password',
            required: true,
            pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
        },
        {
            id: 4,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            errorMessage: "Password don't match",
            label: 'Confirm Password',
            required: true,
            pattern: values.password,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    console.log(values);
    return (
        <Fragment>
            <div className={cx('card-header')}>Register</div>
            <div className={cx('card-body ')}>
                <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                    ))}
                    <div class='form-group row mb-0'>
                        <div class='col-md-6 offset-md-4'>
                            <button type='submit' class='btn btn-primary'>
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default FormRegister;
