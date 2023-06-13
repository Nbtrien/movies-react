import classNames from 'classnames/bind';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import movieApi, { movieType, movieCategory } from '../../api/movieApi';
import BouncingLoader from '../BoucingLoader';
import MovieCart from '../MovieCard';
import { Link } from 'react-router-dom';

import styles from './movieblock.module.scss';
import { stringToSlug } from '../../constants/MovieType';

const cx = classNames.bind(styles);
function MovieBlock(props) {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                keyword: movieType.new_movie,
                category: props.category || '',
                genre: props.genre || '',
                page: 1,
                limit: 12,
            };
            try {
                const response = await movieApi.getMovies({ params });
                setMovieItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-wrapper')}>
                <h3 className={cx('inline-til')}>{props.category || `Phim ${props.genre}`} mới</h3>
                <span>
                    <Link
                        className={cx('link-more')}
                        to={`/${props.type}/${
                            (props.category && stringToSlug(props.category)) ||
                            (props.genre && stringToSlug(props.genre))
                        }`}
                    >
                        Xem tất cả{' '}
                    </Link>
                    {/* </a> */}
                </span>
            </div>
            <div className={cx('cl-div')}></div>
            {movieItems ? (
                <div className={cx('row', 'item-list-wrapper')}>
                    {movieItems.map((movieItem, index) => (
                        <div className={cx('item', 'col-6', 'col-sm-4', 'col-md-3', 'col-lg-2')} key={index}>
                            <MovieCart item={movieItem} />
                        </div>
                    ))}
                </div>
            ) : (
                <BouncingLoader />
            )}
        </div>
    );
}

export default MovieBlock;
