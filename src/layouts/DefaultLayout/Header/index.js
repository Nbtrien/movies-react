import React, { useEffect, useState } from 'react';
// import './header.scss'
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../../../assets/logomovies.png';

import classes from './header.module.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';
import { useOutletContext } from 'react-router-dom';
import DropDown from '../../../components/DropDown';

const headerNav = [
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
];

function Header() {
    // open nav bar
    const [menuOpen, setMenuOpen] = useState(false);
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    const { logout } = useOutletContext();

    useEffect(() => {
        const handlerResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handlerResize);

        return () => window.removeEventListener('resize', handlerResize);
    }, []);

    useEffect(() => {
        if (size.width > 768 && menuOpen) {
            setMenuOpen(false);
        }
    }, [size.width, menuOpen]);

    const menuToggleHander = () => {
        setMenuOpen((p) => !p);
    }; //end open navbar

    const { auth } = useAuth();
    const location = useLocation();

    const navigate = useNavigate();
    const [keySearch, setKeySearch] = useState('');

    const searchHandleChange = (event) => {
        setKeySearch(event.target.value);
    };

    const searchHandleClick = () => {
        navigate('/search/' + keySearch);
    };

    const signOut = () => {
        logout();
        window.location.reload();
    };

    return (
        <header className={classes.header}>
            <div className={classes.header__content}>
                <div className={classes.header__content__logo}>
                    <Link to='/' title='Xem phim mới chất lượng HD'>
                        <img src={logo} />
                    </Link>
                </div>

                <div className={classes.header__content__searchbar}>
                    <input type='text' placeholder='Search' value={keySearch} onChange={searchHandleChange} />
                    <button className='search-btn' onClick={() => searchHandleClick()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <nav className={`${classes.header__content__nav} ${menuOpen ? classes.isMenu : ''}`}>
                    <ul>
                        {headerNav.map((nav, index) => (
                            <li key={index}>
                                <NavLink to={nav.path}>{nav.display}</NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className={classes.header__content__toggle}>
                    {!menuOpen ? (
                        <BiMenuAltRight onClick={menuToggleHander} />
                    ) : (
                        <AiOutlineClose onClick={menuToggleHander} />
                    )}
                </div>
            </div>
            <div className={classes.drp_wrapper}>
                {auth.user ? (
                    <DropDown logout={signOut} />
                ) : (
                    <Button href='/login' state={{ from: location }}>
                        Login
                    </Button>
                )}
            </div>
        </header>
    );
}

export default Header;
