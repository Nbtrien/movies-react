import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Intro from '../Intro';
import Vote from '../Vote';
import styles from './detailinfo.module.scss';
import usePrivateApi from '../../api/usePrivateApi';
import useAuth from '../../hooks/useAuth';
import Button from '../Button';

function DetailInfo({ movie }) {
    const cx = classNames.bind(styles);
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
    }, [auth, isChecked, movie]);

    const likeClickHandle = async () => {
        setIsMyMovie(true);
        try {
            const params = {
                user_id: auth.user.id,
                movie_id: movie.id,
            };
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
                    <Button
                        href={`/watch/${movie.name}/${movie.id}`}
                        type='outlineStyles'
                        fontSize='1rem'
                        margin='1rem'
                        className={cx('btn', 'btn-watch')}
                    >
                        <i className='fas fa-play-circle'></i> <span>Xem phim</span>
                    </Button>

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
                <Vote movie_id={movie.id} avgrating={movie.avgrating} />
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
