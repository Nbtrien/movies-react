import classNames from 'classnames/bind';
import React, { Fragment, useEffect, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import movieApi from '../../api/movieApi';

import styles from './episodegrid.module.scss';
const cx = classNames.bind(styles);

const EpisodeGrid = (props) => {
    const id = props.id;
    const name = props.name;
    const ep = props.ep || null;

    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const getEpisodes = async () => {
            const params = {
                ep: ep,
            };
            try {
                const response = await movieApi.getEpisodes(id, { params });
                setEpisodes(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEpisodes();
    }, [props]);

    return (
        <Fragment>
            <h4 className={cx('section-title')}>Tập phim</h4>
            {episodes && episodes.length !== 0 && (
                <div className={cx('div_ep')}>
                    <ul className={cx('list_ep')}>
                        {episodes.map((episode, index) => {
                            let isCurrentEp = '';
                            if (ep === null && index === 0) {
                                isCurrentEp = 'curep';
                            } else if (episode.episode === ep) {
                                isCurrentEp = 'curep';
                            }
                            return (
                                <button
                                    key={index}
                                    className={cx('ep', `${isCurrentEp}`)}
                                    onClick={() => props.onEpisodeClick(episode.episode)}
                                    title=''
                                >
                                    {episode.episode}
                                </button>
                            );
                        })}
                    </ul>
                </div>
            )}
        </Fragment>
    );
};

export default memo(EpisodeGrid);
