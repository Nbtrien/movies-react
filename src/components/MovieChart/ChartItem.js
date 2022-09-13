import React, { Fragment, useEffect, useRef, useState } from 'react';
import styles from './moviechart.module.scss';

import movieApi, { movieType, movieCategory } from '../../api/movieApi';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function ChartItem(props) {
    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {
                keyword: movieType.popular_movie,
                category: props.type,
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
    return (
        <div className={cx('col-lg-4', 'col-md-6', 'col-sm-12', 'col-12', 'chart-item-wrapper')}>
            <h4 className={cx('section-title')}>{props.type || 'Phim'} xem nhiều</h4>
            <div className={cx('scrollbar', 'style-1')}>
                <div className={cx('force-overflow')}>
                    {movieItems.map((movieItem, index) => (
                        <Fragment key={index}>
                            <Link
                                to={`movie/${movieItem.name}/${movieItem.id}`}
                                className={cx('item-link')}
                                title={movieItem.name}
                            >
                                <div className={cx('row')}>
                                    <div className={cx('col-sm-4', 'col-4')}>
                                        <img
                                            className={cx('image-block')}
                                            src={movieItem.profileimage}
                                            alt={movieItem.name}
                                        />
                                    </div>
                                    <div className={cx('col-sm-8', 'col-8')}>
                                        <div className={cx('name-title-wrapper')}>
                                            <div className={cx('name-title')}>{movieItem.name}</div>
                                            <div className={cx('engname-title')}>
                                                {movieItem.eng_name}
                                                <div className={cx('infor-title')}>Lượt xem: {movieItem.view}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className={cx('line-1')}></div>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChartItem;
