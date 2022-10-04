import classNames from 'classnames/bind';
import styles from './button.module.scss';

const cx = classNames.bind(styles);

function Button({ to, href, children, onClick }) {
    let Comp = 'button';

    const classes = cx('wrapper');

    return (
        <Comp classNames={classes}>
            <span>{children}</span>
        </Comp>
    );
}

export default Button;
