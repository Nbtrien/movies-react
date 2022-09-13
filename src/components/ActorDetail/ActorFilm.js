import { memo, useEffect, useState } from 'react';
import movieApi from '../../api/movieApi';
import BouncingLoader from '../BoucingLoader';
import MovieGrid from '../MovieGrid';
import styles from './actor.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const ActorFilm = ({ actor }) => {
    console.log('load actorfilm');
    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const params = {
                    limit: 12,
                };
                const response = await movieApi.getMoviesbyActor(actor.id, { params });
                setMovies(response.data);
                setTotalPage(response.meta.last_page);
                setPage(1);
                console.log('getmovies');
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, [actor]);

    const loadmoreHandleClick = async () => {
        const params = {
            limit: 12,
            page: page + 1,
        };
        try {
            const response = await movieApi.getMoviesbyActor(actor.id, { params });
            setMovies([...movies, ...response.data]);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h3>Phim của {actor.name}</h3>
            <div className={cx('content-wapper')}>
                {movies ? (
                    <MovieGrid
                        movies={movies}
                        page={page}
                        totalPage={totalPage}
                        loadmoreOnClick={loadmoreHandleClick}
                    />
                ) : (
                    <BouncingLoader />
                )}
            </div>
        </>
    );
};

export default memo(ActorFilm);
