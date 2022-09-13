import React, { useState } from 'react';
import './header.scss';
import logo from '../../../assets/log3.png';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassCheers, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';

const headerNav = [
    {
        display: 'Trang chủ',
        path: '/',
    },
    {
        display: 'Phim lẻ',
        path: '/category/phim-le',
    },
    {
        display: 'Phim bộ',
        path: '/category/phim-bo',
    },
    {
        display: 'Phim chiếu rạp',
        path: '/genre/phim-chieu-rap',
    },
    {
        display: 'Anime',
        path: '/genre/phim-anime',
    },
    {
        display: 'Tin tức',
        path: '/news',
    },
];

const dropdownNav = [
    {
        display: 'Phim thuyết minh',
        path: '/phim-thuyet-minh',
    },
    {
        display: 'Phim phụ đề',
        path: '/phim-phu-de',
    },
    {
        display: 'Phim lồng tiếng',
        path: '/phim-long-tieng',
    },
];

function Header() {
    const { auth } = useAuth();

    const navigate = useNavigate();
    const [keySearch, setKeySearch] = useState('');

    const searchHandleChange = (event) => {
        setKeySearch(event.target.value);
    };

    const searchHandleClick = () => {
        navigate('/search/' + keySearch);
    };
    return (
        <div id='header'>
            <div className='header-logo'>
                <Link className='logo' to='/' title='Xem phim mới chất lượng HD'>
                    <img className='img_log' src={logo} />
                </Link>
            </div>
            <div className='menu1'>
                <nav className='navbar navbar-expand-lg  navbar-dark' id='headercolor'>
                    <div className='container cc'>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-toggle='collapse'
                            data-target='#collapsible'
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                        <div className='collapse navbar-collapse' id='collapsible'>
                            <ul className='navbar-nav nav-header'>
                                {headerNav.map((nav, index) => (
                                    <li className='nav-item' key={index}>
                                        <Link className='m' to={nav.path}>
                                            {nav.display}
                                        </Link>
                                    </li>
                                ))}
                                <li className='nav-item'>
                                    <div className='dropdownxt'>
                                        <Link className='dropbtnxt m' to=''>
                                            Xem thêm
                                        </Link>
                                        <div className='dropdown-contentxt'>
                                            {dropdownNav.map((dnav, index) => (
                                                <Link to={dnav.path} key={index}>
                                                    {dnav.display}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className='search-wrapper'>
                <input placeholder='Search' value={keySearch} onChange={searchHandleChange} />
                <button className='search-btn' onClick={() => searchHandleClick()}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className='action'>
                {/* <Button btnColor='red'>Login</Button> */}
                {auth.user ? (
                    <Button href='/logout' btnColor='red'>
                        Logout
                    </Button>
                ) : (
                    <Button href='/login' btnColor='red'>
                        Login
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;
