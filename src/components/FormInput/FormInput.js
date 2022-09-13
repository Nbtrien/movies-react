import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './formInput.module.scss';
const cx = classNames.bind(styles);

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };
    return (
        <div className={cx('form-group', 'row')}>
            <label className={cx('col-md-4', 'col-form-label', 'text-md-right')}>{label}</label>

            <div className={cx('col-md-8')}>
                <input
                    {...inputProps}
                    onChange={onChange}
                    className={cx('form-control ')}
                    onBlur={handleFocus}
                    focused={focused.toString()}
                />
                <span className={cx('error')}>{errorMessage}</span>
            </div>
        </div>
    );
};

export default FormInput;
