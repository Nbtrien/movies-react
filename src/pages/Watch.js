import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import movieApi from '../api/movieApi';
import SimilarMovie from '../components/SimilarMovie';
import { SIMILAR_TYPE, VIDEO_TYPE } from '../constants/MovieType';
import Video from '../components/Video';
import Comment from '../components/Comment';
import EpisodeGrid from '../components/EpisodeGrid';
import BouncingLoader from '../components/BoucingLoader';
import WatchDetail from '../components/WatchDetail';

function Watch() {
    const { id, name } = useParams();
    const [movie, setMovie] = useState(null);
    const [videoId, setVideoId] = useState(null);
    const [episode, setEpisode] = useState(null);

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

    useEffect(() => {
        const getVideoId = async () => {
            try {
                if (episode !== null) {
                    const response = await movieApi.getVideoId(id, episode);
                    setVideoId(response.data.video_id);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getVideoId();
    }, [name, id, episode]);

    return (
        <div id='page-content'>
            <div id='movie'>
                {movie ? (
                    <>
                        {movie.category === 'phim bộ' ? (
                            <>
                                {episode === null ? (
                                    <Video movie_id={id} type={VIDEO_TYPE.movie} byType={VIDEO_TYPE.byType.movie} />
                                ) : (
                                    <Video id={videoId} />
                                )}
                                <EpisodeGrid onEpisodeClick={setEpisode} name={movie.name} id={id} ep={episode} />
                            </>
                        ) : (
                            <Video movie_id={id} type={VIDEO_TYPE.movie} byType={VIDEO_TYPE.byType.movie} />
                        )}
                        <div className='bg'>
                            <WatchDetail movie={movie} episode={episode} />
                            <br />

                            <Comment id={movie.id} />

                            <SimilarMovie type={SIMILAR_TYPE.same_series} id={movie.id} />
                            <SimilarMovie type={SIMILAR_TYPE.similar_movie} id={movie.id} />
                        </div>
                    </>
                ) : (
                    <BouncingLoader />
                )}
            </div>
        </div>
    );
}

export default Watch;
