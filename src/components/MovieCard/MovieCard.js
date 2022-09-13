import React from 'react';
import { Link } from 'react-router-dom';
import styles from './moviecard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MovieCart(props) {
    const item = props.item;
    return (
        <div className={cx('movie-card')}>
            <Link to={`/movie/${item.name}/${item.id}`} title={item.eng_name}>
                <img className={cx('image-block')} src={item.profileimage} alt={item.eng_name} />
                <div className={cx('type-title')}>new</div>
                <div className={cx('name-title-wrapper')}>
                    <div className={cx('name-title')}>{item.name}</div>
                </div>
            </Link>
        </div>
    );
}

export default MovieCart;
