import classNames from 'classnames/bind';
import moment from 'moment';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Intro from '../Intro';
import Vote from '../Vote';
import styles from './detailinfo.module.scss';
function DetailInfo({ movie }) {
    const cx = classNames.bind(styles);
    const numberStars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

    return (
        <div className={cx('row')}>
            <div className={cx('img-wrapper', 'col-lg-6', 'col-xl-4', 'col-12')}>
                <img src={movie.profileimage} alt={movie.name} />
            </div>
            <div className={cx('detail-wrapper', 'col-lg-6', 'col-xl-8', 'col-12')}>
                <div className={cx('movie-title')}>
                    <span className={cx('title-1')}>{movie.name}</span>
                    <span className={cx('title-2')}>{movie.eng_name}</span>
                </div>
                <br />
                <div className={cx('btn-wrapper')}>
                    <Link to={`/watch/${movie.name}/${movie.id}`} className={cx('btn', 'btn-watch')} title=''>
                        <i className='fas fa-play-circle'></i> <span>Xem phim</span>
                    </Link>
                    <a href='' className={cx('btn', 'btn-like')} title=''>
                        <i className='fas fa-heart'></i> <span>Yêu thích</span>
                    </a>
                </div>
                <Vote avgrating={movie.avgrating} />
                <Intro movie={movie} />
                <div className={cx('description')} id='pc-text-dv'>
                    <h4 className={cx('movie-detail-h4')}>Nội dung phim</h4>
                    <div className='nd' id='pc-text-nd'>
                        <div
                            id='textmt'
                            dangerouslySetInnerHTML={{
                                __html: movie.description,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailInfo;
