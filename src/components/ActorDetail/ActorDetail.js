import { useEffect, useState } from 'react';
import movieApi from '../../api/movieApi';
import styles from './actor.module.scss';
import classNames from 'classnames/bind';
import BouncingLoader from '../BoucingLoader';
import Tabs from '../Tabs';
import ActorInfo from './ActorInfo';
import ActorFilm from './ActorFilm';

const cx = classNames.bind(styles);

const ActorDetail = ({ id }) => {
    console.log(id);
    const [actor, setActor] = useState(null);
    const [tabContent, setTabContent] = useState(null);

    useEffect(() => {
        const getActor = async () => {
            try {
                const response = await movieApi.getActor(id);
                setActor(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getActor();
    }, [id]);

    const tabs = [
        {
            id: 1,
            title: 'TIỂU SỬ',
            content: <ActorInfo actor={actor} />,
        },
        {
            id: 2,
            title: 'PHIM',
            content: <ActorFilm actor={actor} />,
        },
        {
            id: 3,
            title: 'NỘI DUNG KHÁC',
            content: <></>,
        },
    ];
    return (
        <>
            {actor ? (
                <div className={cx('wrapper')}>
                    <div className={cx('actor-backg')}>
                        <div className={cx('actor-thumb')}>
                            <div className={cx('img-section')}>
                                <img src={actor.image.image_url} alt='' />
                            </div>
                            <div className={cx('name-section')}>
                                <h2>{actor.name}</h2>
                            </div>
                        </div>
                    </div>

                    <div className={cx('actor-detail')}>
                        <div className={cx('action-wrapper')}>
                            <Tabs tabs={tabs} onTabClick={setTabContent} />
                        </div>
                        <div className={cx('tab-content')}>{tabContent || <ActorInfo actor={actor} />}</div>
                    </div>
                </div>
            ) : (
                <BouncingLoader />
            )}
        </>
    );
};

export default ActorDetail;
