import classNames from 'classnames/bind';
import { Fragment } from 'react';
import Intro from '../Intro';
import Vote from '../Vote';
import styles from './watchdetail.module.scss';

const cx = classNames.bind(styles);
function WatchDetail({ movie, episode }) {
    return (
        <div className={cx('row')}>
            <div className={cx('img-wrapper', 'col-sm-4', 'col-md-4', 'col-lg-2')}>
                <img src={movie.profileimage} alt={movie.name} />
            </div>
            <div className={cx('detail-wrapper', 'col-sm-8', 'col-md-8', 'col-lg-6')}>
                <div className={cx('movie-title')}>
                    <span className={cx('title-1')}>
                        {movie.name} {episode && ' - Tập ' + episode}
                    </span>
                    <span className={cx('title-2')}>{movie.eng_name}</span>
                </div>
                <div className={cx('btn-wrapper')}>
                    <a href='' className={cx('btn', 'btn-like')} title=''>
                        <i className='fas fa-heart'></i> <span>Yêu thích</span>
                    </a>
                </div>
                <Vote avgrating={movie.avgrating} />
                <div className={cx('description-wrapper')} id='pc-text-dv'>
                    <h4 className={cx('movie-detail-h4')}>Nội dung phim</h4>
                    <div className={cx('description')} id='pc-text-nd'>
                        <div
                            id='textmt'
                            dangerouslySetInnerHTML={{
                                __html: movie.description,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={cx('intro-wrapper', 'col-sm-8', 'col-md-6', 'col-lg-4')}>
                <Intro movie={movie} />
            </div>
        </div>
    );
}

export default WatchDetail;
