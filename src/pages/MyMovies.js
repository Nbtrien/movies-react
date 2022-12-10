import React, { memo, useEffect, useState } from 'react';
import MovieGrid from '../components/MovieGrid';
import BouncingLoader from '../components/BoucingLoader';
import useAuth from '../hooks/useAuth';
import usePrivateApi from '../api/usePrivateApi';

function MyMovies() {
    const { auth, isUnexpired } = useAuth();
    const privateApi = usePrivateApi();
    const [movies, setMovies] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await privateApi.getMyMovies(auth.user.id);
                setMovies(response.data.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        auth.user && isUnexpired && getMovies();
    }, [auth.user, isUnexpired]);
    // console.log(movies);
    return (
        <div className='catalog' id='page-content'>
            <div className='section-tltle'>
                <h3>Phim của tôi</h3>
            </div>

            <div id='catalog'>{movies ? <MovieGrid movies={movies} /> : <BouncingLoader />}</div>
        </div>
    );
}

export default memo(MyMovies);
