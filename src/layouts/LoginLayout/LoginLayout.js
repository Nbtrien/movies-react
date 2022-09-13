import styles from './login.module.scss';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/log3.png';

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
    return (
        <div className={cx('modal')}>
            <Link to='/'>
                <img src={logo} />
            </Link>
            <div className={cx('container ')}>
                <div className={cx('row', 'justify-content-center')}>
                    <div className={cx('col-md-8')}>
                        <div className={cx('card', 'modal-content')}>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginLayout;
