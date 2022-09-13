import React, { useEffect, useState } from 'react';
import movieApi, { movieCategory, movieGenres, movieType } from '../api/movieApi';
import { useParams, useNavigate } from 'react-router-dom';
import { MOVIE_GENRE, MOVIE_CATEGORY, MOVIE_CATEGORIES, MOVIE_GENRES } from '../constants/MovieType';
import MovieGrid from '../components/MovieGrid';
import PageNotFound from './PageNotFound';
import BouncingLoader from '../components/BoucingLoader';

function Catalog() {
    const navigate = useNavigate();
    const params = useParams();

    const typeParam = Object.keys(params)[0];

    let cate_key;
    let genr_key;

    const [inValid, setInValid] = useState(null);

    const [movies, setMovies] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [paramsApi, setParamsApi] = useState(null);

    useEffect(() => {
        switch (typeParam) {
            case MOVIE_GENRE: {
                genr_key = Object.keys(MOVIE_GENRES).find((key) => MOVIE_GENRES[key] === params[typeParam]);
                setParamsApi({ genre: movieGenres[genr_key] });
                movieGenres[genr_key] ? setInValid('Phim ' + movieGenres[genr_key]) : setInValid(undefined);
                break;
            }
            case MOVIE_CATEGORY: {
                cate_key = Object.keys(MOVIE_CATEGORIES).find((key) => MOVIE_CATEGORIES[key] === params[typeParam]);
                setParamsApi({ category: movieCategory[cate_key] });
                movieCategory[cate_key] ? setInValid(movieCategory[cate_key]) : setInValid(undefined);
                break;
            }
        }
        let updatedValue = {};
        updatedValue = { keyword: movieType.new_movie, limit: 12 };
        setParamsApi((paramsApi) => ({
            ...paramsApi,
            ...updatedValue,
        }));
    }, [params]);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await movieApi.getMovies({ params: paramsApi });
                setMovies(response.data);
                setTotalPage(response.meta.last_page);
                setPage(1);
            } catch (error) {
                console.log(error);
            }
        };
        paramsApi && getMovies();
    }, [paramsApi]);

    const loadmoreHandleClick = async () => {
        const newParams = { ...paramsApi };
        newParams.page = page + 1;
        try {
            const response = await movieApi.getMovies({ params: newParams });
            setMovies([...movies, ...response.data]);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(inValid);
    if (inValid === undefined) {
        return <PageNotFound />;
    }

    return (
        <div className='catalog' id='page-content'>
            <div className='section-tltle'>
                <h3>{inValid}</h3>
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

export default Catalog;
