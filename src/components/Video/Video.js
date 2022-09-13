import React, { useEffect, useState, memo } from 'react';
import { Player } from 'video-react';
import movieApi from '../../api/movieApi';
import { VIDEO_TYPE } from '../../constants/MovieType';
import BouncingLoader from '../BoucingLoader';

const Video = (props) => {
    let id = props.id;
    let movie_id = props.movie_id;
    let type = props.type;
    let byType = props.byType || '';

    let [videoUrl, setvideoUrl] = useState();

    useEffect(() => {
        const getVideo = async () => {
            let response = null;
            try {
                if (id !== undefined) {
                    response = await movieApi.getVideobyId(id);
                } else if (type === VIDEO_TYPE.trailer) {
                    response = await movieApi.getTrailer(movie_id);
                } else {
                    response = await movieApi.getVideo(movie_id, byType);
                }
                setvideoUrl(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getVideo();
    }, [props]);

    return (
        <>
            {videoUrl ? (
                <Player key={videoUrl.url}>
                    <source src={videoUrl.url} />
                </Player>
            ) : (
                <BouncingLoader />
            )}
        </>
    );
};

export default memo(Video);
