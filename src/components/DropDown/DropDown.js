import { ReactComponent as History } from '../../assets/history-svgrepo-com.svg';
import { ReactComponent as Film } from '../../assets/film-svgrepo-com.svg';
import { ReactComponent as CaretIcon } from '../../assets/caret.svg';
import { ReactComponent as Logout } from '../../assets/logout-svgrepo-com.svg';
import { ReactComponent as CogIcon } from '../../assets/cog.svg';

import React, { useState, useEffect, useRef, memo } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import styles from './dropdown.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DropDown = (props) => {
    const [open, setOpen] = useState(false);
    const logout = props.logout;

    return (
        <nav className={cx('navbar')}>
            <ul className={cx('navbar-nav')}>
                <li className={cx('nav-item')}>
                    <a href='javascript:void(0)' className={cx('icon-button')} onClick={() => setOpen(!open)}>
                        <CaretIcon />
                    </a>

                    {open && <DropdownMenu logout={logout}></DropdownMenu>}
                </li>
            </ul>
        </nav>
    );
};

function DropdownMenu(props) {
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    const logou = props.logout;

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
    }, []);

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height);
    }

    function DropdownItem(props) {
        return (
            <Link to={props.to || ''} className={cx('menu-item')} onClick={props.onClick}>
                <span className={cx('icon-button')}>{props.leftIcon}</span>
                {props.children}
                <span className={cx('icon-right')}>{props.rightIcon}</span>
            </Link>
        );
    }

    return (
        // style={{ height: menuHeight }}
        <div className={cx('dropdown')} ref={dropdownRef}>
            <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                classNames='menu-primary'
                unmountOnExit
                onEnter={calcHeight}
            >
                <div className={cx('menu')}>
                    <DropdownItem leftIcon={<Film />} to='/mymovies'>
                        Phim của tôi
                    </DropdownItem>
                    <DropdownItem leftIcon={<History />}>Lịch sử xem</DropdownItem>
                    <DropdownItem leftIcon={<CogIcon />}>Cài đặt</DropdownItem>
                    <DropdownItem leftIcon={<Logout />} onClick={logou}>
                        Đăng xuất
                    </DropdownItem>
                </div>
            </CSSTransition>
        </div>
    );
}

export default memo(DropDown);
