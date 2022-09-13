import React from 'react';
import classNames from 'classnames/bind';
import styles from './not-found.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <>
            <div className={cx('not-found-component')}>
                <a href='https://codepen.io/uiswarup/full/wvqNWOY' target='_blank'>
                    <header className={cx('top-header')}></header>

                    <div>
                        <div className={cx('starsec')}></div>
                        <div className={cx('starthird')}></div>
                        <div className={cx('starfourth')}></div>
                        <div className={cx('starfifth')}></div>
                    </div>

                    <div className={cx('lamp__wrap')}>
                        <div className={cx('lamp')}>
                            <div className={cx('cable')}></div>
                            <div className={cx('cover')}></div>
                            <div className={cx('in-cover')}>
                                <div className={cx('bulb')}></div>
                            </div>
                            <div className={cx('light')}></div>
                        </div>
                    </div>

                    <section className={cx('error')}>
                        <div className={cx('error__content')}>
                            <div className={cx('error__message message')}>
                                <h1 className={cx('message__title')}>Page Not Found</h1>
                                <p className={cx('message__text')}>
                                    We're sorry, the page you were looking for isn't found here. The link you followed
                                    may either be broken or no longer exists. Please try again, or take a look at our.
                                </p>
                            </div>
                            <div className={cx('error__nav e-nav')}>
                                <a href='/' target='' className={cx('e-nav__link')}></a>
                            </div>
                        </div>
                    </section>
                </a>
            </div>
        </>
    );
}

export default NotFound;
