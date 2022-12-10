import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './button.module.scss';

const Button = ({
    children,
    href,
    onClick,
    btnColor = 'teal',
    labelColor,
    disabled,
    type,
    style,
    fontSize,
    margin,
    padding,
    classn,
    borderRadius,
    ...props
}) => {
    const cx = classNames.bind(styles);
    const [hover, setHover] = useState(false);
    const toggleHover = () => {
        setHover(!hover);
    };
    const commonStyles = {
        backgroundColor: btnColor,
        color: labelColor || 'white',
        padding: padding || '25px',
        fontSize: fontSize || '1.3rem',
        margin: margin || '0',
    };
    const outlineStyles = {
        border: `1px solid ${btnColor}`,
        color: btnColor,
        backgroundColor: 'white',
        padding: padding || '25px',
        margin: margin || '0',
        // font-size :
        fontSize: fontSize || '1.3rem',
    };
    const outlineHoverStyle = {
        color: labelColor || 'white',
        backgroundColor: btnColor,
        padding: padding || '25px',
        margin: margin || '0',
        fontSize: fontSize || '1.3rem',
    };

    const roundedStyle = {
        backgroundColor: btnColor,
        color: labelColor || 'white',
        borderRadius: borderRadius || '25px',
        padding: padding || '25px',
        margin: margin || '0',
        fontSize: fontSize || '1.3rem',
    };
    const disabledStyle = {
        cursor: 'default',
        backgroundColor: btnColor,
        color: labelColor || 'white',
        opacity: 0.4,
        padding: padding || '25px',
        margin: margin || '0',
        fontSize: fontSize || '1.3rem',
    };
    const blockStyles = {
        backgroundColor: btnColor,
        color: labelColor || 'white',
        padding: padding || '25px',
        margin: margin || '0',
        fontSize: fontSize || '1.3rem',
    };
    let btnStyle;
    switch (type) {
        case 'rounded':
            btnStyle = roundedStyle;
            break;
        case 'block':
            btnStyle = blockStyles;
            break;
        case 'outline':
            if (hover) {
                btnStyle = outlineHoverStyle;
            } else {
                btnStyle = outlineStyles;
            }
            break;
        default:
            btnStyle = {
                backgroundColor: btnColor,
                color: labelColor || 'white',
            };
            break;
    }
    return (
        <>
            {href ? (
                <Link
                    to={href}
                    style={
                        disabled
                            ? { ...commonStyles, ...btnStyle, ...disabledStyle, ...style }
                            : { ...commonStyles, ...btnStyle, ...style }
                    }
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    {...props}
                    type='button'
                    onClick={!disabled ? onClick : () => {}}
                    // className={styles.btn}
                    className={cx('btn')}
                >
                    {children}
                </Link>
            ) : (
                <button
                    style={
                        disabled
                            ? { ...commonStyles, ...btnStyle, ...disabledStyle, ...style }
                            : { ...commonStyles, ...btnStyle, ...style }
                    }
                    onMouseEnter={toggleHover}
                    onMouseLeave={toggleHover}
                    {...props}
                    type={props.submit || 'button'}
                    onClick={!disabled ? onClick : () => {}}
                    // className={styles.btn}
                    className={cx('btn')}
                >
                    {children || 'button'}
                </button>
            )}
        </>
    );
};

export default Button;
