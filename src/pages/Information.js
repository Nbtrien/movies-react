import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import movieApi from '../api/movieApi';
import SimilarMovie from '../components/SimilarMovie';
import { SIMILAR_TYPE, VIDEO_TYPE } from '../constants/MovieType';
import Video from '../components/Video';
import Comment from '../components/Comment';
import BouncingLoader from '../components/BoucingLoader';
import DetailInfo from '../components/DetailInfo';

function Information() {
    const { name, id } = useParams();

    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                const response = await movieApi.getDetail(id);
                setMovie(response);
            } catch (error) {
                console.log(error);
            }
        };
        getMovie();
    }, [name, id]);

    return (
        <div id='page-content'>
            <div id='movie'>
                {movie ? (
                    <div className='bg'>
                        <DetailInfo movie={movie} />
                        <div className={'text-hr'}>Trailer</div>
                        <Video type={VIDEO_TYPE.trailer} movie_id={movie.id} />
                        <div className={'text-hr'}>Bình luận</div>
                        <Comment id={movie.id} />

                        <SimilarMovie type={SIMILAR_TYPE.same_series} id={movie.id} />
                        <SimilarMovie type={SIMILAR_TYPE.similar_movie} id={movie.id} />
                    </div>
                ) : (
                    <BouncingLoader />
                )}
            </div>
        </div>
    );
}

export default Information;
