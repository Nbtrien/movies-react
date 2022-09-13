import React, { Fragment } from 'react';
import ChartItem from './ChartItem';
import styles from './moviechart.module.scss';
import { movieCategory } from '../../api/movieApi';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MovieChart() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row', 'movie-chart-wrappwer', 'scrollbar1')} id='style-2'>
                <ChartItem type={movieCategory.all_movie} />
                <ChartItem type={movieCategory.feature_movie} />
                <ChartItem type={movieCategory.series_movie} />
            </div>
        </div>
    );
}

export default MovieChart;
