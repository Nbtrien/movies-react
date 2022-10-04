import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './movieslider.module.scss';
import movieApi, { movieType } from '../../api/movieApi';
import { ALL_MOVIE, POPULAR_MOVIE, NEW_MOVIE } from '../../constants/MovieType';
import { Link } from 'react-router-dom';
import BouncingLoader from '../BoucingLoader';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Slide() {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                keyword: movieType.new_movie,
                page: 1,
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

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 391 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 390, min: 0 },
            items: 1,
        },
    };

    return (
        <div className={cx('wrapper')}>
            {movieItems ? (
                <div className={cx('slide-movie-wrapper')}>
                    <Carousel responsive={responsive} infinite={true}>
                        {movieItems.map((movieItem, index) => {
                            return (
                                <div className={cx('slide-item')} key={index}>
                                    <div className={cx('item-block')}>
                                        <Link to={`movie/${movieItem.name}/${movieItem.id}`} title={movieItem.eng_name}>
                                            <img
                                                className={cx('img-fluid', 'mx-auto', 'd-block')}
                                                src={movieItem.profileimage}
                                            />
                                            <div className={cx('name-title-wrapper', 'mx-auto', 'd-block')}>
                                                <div className={cx('name-title')}>{movieItem.name}</div>
                                                <div className={cx('engname-title')}>{movieItem.eng_name}</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            ) : (
                <BouncingLoader />
            )}
        </div>
    );
}

export default Slide;
