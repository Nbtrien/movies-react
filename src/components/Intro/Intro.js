import { Fragment } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './intro.module.scss';

const cx = classNames.bind(styles);

function Intro({ movie }) {
    return (
        <Fragment>
            <div className={cx('intro')}>
                <div className={cx('property')}>Thời lượng</div>
                <div className={cx('value')}>{movie.runtime} phút</div>
            </div>
            <div className={cx('intro')}>
                <div className={cx('property')}>Đạo diễn</div>
                <div className={cx('value')}>
                    {movie.directors.map((director, index) => (
                        <a href='' key={index}>
                            {director.name + ', '}
                        </a>
                    ))}
                </div>
            </div>
            <div className={cx('intro')}>
                <div className={cx('property')}>Diễn viên</div>
                <div className={cx('value')}>
                    {movie.casts.map((cast, index) => (
                        <Link to={`/actor/${cast.name}/${cast.id}`} key={index}>
                            {cast.name + ', '}
                        </Link>
                    ))}
                </div>
            </div>
            {movie.category === 'phim bộ' && (
                <div className={cx('intro')}>
                    <div className={cx('property')}>Số tập</div>
                    <div className={cx('value')}>
                        {movie.newepisode}/{movie.episodes}
                    </div>
                </div>
            )}
            <div className={cx('intro')}>
                <div className={cx('property')}>Quốc gia </div>
                <div className={cx('value')}>{movie.country}</div>
            </div>
            <div className={cx('intro')}>
                <div className={cx('property')}>Thể loại </div>
                <div className={cx('value')}>
                    {movie.genres.map((genre, index) => (
                        <a href='' key={index}>
                            {genre.name + ', '}
                        </a>
                    ))}
                </div>
            </div>
            <div className={cx('intro')}>
                <div className={cx('property')}>Phát hành </div>
                <div className={cx('value')}>{moment(movie.releasedate).format('DD/MM/YYYY')}</div>
            </div>
        </Fragment>
    );
}

export default Intro;
