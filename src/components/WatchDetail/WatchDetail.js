import classNames from 'classnames/bind';
import Intro from '../Intro';
import Vote from '../Vote';
import styles from './watchdetail.module.scss';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import usePrivateApi from '../../api/usePrivateApi';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';

const cx = classNames.bind(styles);
function WatchDetail({ movie, episode }) {
    const { auth } = useAuth();
    const { isChecked } = useOutletContext();
    const privateApi = usePrivateApi();
    const [isMyMovie, setIsMyMovie] = useState(false);

    useEffect(() => {
        const checkMovie = async () => {
            try {
                const response = await privateApi.checkMovie(auth?.user.id, movie.id);
                setIsMyMovie(response.data.status);
            } catch (err) {
                console.log(err);
            }
        };
        auth?.user && isChecked && checkMovie();
    }, [auth, isChecked]);

    const likeClickHandle = async () => {
        setIsMyMovie(true);
        try {
            const params = {
                user_id: auth.user.id,
                movie_id: movie.id,
            };
            console.log(params);
            const response = await privateApi.createUserMovie(params);
            setIsMyMovie(response.data.status);
        } catch (error) {
            if (!error?.response) {
                console.log('No Serve Response');
            }
        }
    };

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
                    <Button
                        type='outlineStyles'
                        fontSize='1rem'
                        disabled={isMyMovie}
                        className={cx('btn', 'btn-like', 'btn-checked')}
                        onClick={likeClickHandle}
                    >
                        {isMyMovie ? <i class='fas fa-check'></i> : <i className='fas fa-heart'></i>}
                        <span>Yêu thích</span>
                    </Button>
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
