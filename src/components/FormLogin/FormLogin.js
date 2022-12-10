import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../../layouts/LoginLayout/login.module.scss';
import FormInput from '../FormInput/FormInput';
import useAuth from '../../hooks/useAuth';
import movieApi from '../../api/movieApi';

const cx = classNames.bind(styles);

function FormLogin() {
    const { auth, setAuth, setIsUnexpired } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    if (auth.user) {
        navigate(from);
    }

    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'E-mail Address',
            errorMessage: 'Email is invalid',
            label: 'E-mail Address',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage: 'Password is invalid',
            label: 'Password',
            required: true,
            // pattern: '(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
        },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const params = {
                email: values.email,
                password: values.password,
            };
            const response = await movieApi.login(params);

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
    // console.log(values);
    return (
        <Fragment>
            <div className={cx('card-header')}>Login</div>
            <div className={cx('card-body ')}>
                <form onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange} />
                    ))}
                    <div className={cx('form-group row mb-0')}>
                        <div className={cx('col-md-8 offset-md-4')}>
                            <button type='submit' className={cx('btn btn-primary')}>
                                Login
                            </button>
                            <Link className={cx('btn btn-link')} to=''>
                                Forgot Your Password?
                            </Link>
                            <div className={cx('btn-text')}>
                                <p>
                                    Don't have an account?
                                    <Link className={cx('btn btn-link')} to='/register'>
                                        Register
                                    </Link>
                                </p>
                            </div>
                            <Link to='' className={cx('btn btn-secondary')}>
                                Google Sign in
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

export default FormLogin;
