import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import movieApi from '../api/movieApi';
import BouncingLoader from '../components/BoucingLoader';
import MovieGrid from '../components/MovieGrid';

function Search() {
    const params = useParams();
    const key = params.key;

    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const params = {
                    limit: 12,
                };
                const response = await movieApi.getMoviesbyKey(key, { params });
                setMovies(response.data);
                setTotalPage(response.meta.last_page);
                setPage(1);
                console.log('getmovies');
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, [params, key]);
    console.log(movies);

    const loadmoreHandleClick = async () => {
        const params = {
            limit: 12,
            page: page + 1,
        };
        try {
            const response = await movieApi.getMoviesbyKey(key, { params });
            setMovies([...movies, ...response.data]);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='catalog' id='page-content'>
            <div className='section-tltle'>
                <h3>{`Kết quả tìm kiếm '${key}'`}</h3>
            </div>

            <div id='catalog'>
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
        </div>
    );
}

export default Search;
