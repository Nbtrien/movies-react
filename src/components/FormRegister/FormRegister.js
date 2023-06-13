import { text } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import styles from '../../layouts/LoginLayout/login.module.scss';
import FormInput from '../FormInput/FormInput';
import Button from '../Button';
import useAuth from '../../hooks/useAuth';
import movieApi from '../../api/movieApi';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function FormRegister() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const { auth, setAuth, setIsUnexpired } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

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
            pattern: '.{8,30}',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = {
                name: values.name,
                email: values.email,
                password: values.password,
            };
            console.log(params);
            const response = await movieApi.logout(params);

            const access_token = response?.data?.access_token;
            const user = response?.data?.user;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('access_token', access_token);
            setAuth({ user, access_token });
            setIsUnexpired(true);
            navigate(from);
        } catch (error) {
            if (!error?.response) {
                console.log('No Serve Response');
            } else if (error.response?.status === 401) {
                console.log('Unauthorized');
                alert('Unauthorized');
            }
        }
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
