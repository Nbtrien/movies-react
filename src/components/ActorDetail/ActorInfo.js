import styles from './actor.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
const ActorInfo = ({ actor }) => {
    return (
        <div className={cx('tab-infor')}>
            <h3>Tiểu sử {actor.name}</h3>
            <div className={cx('content-wapper')}>
                <p className={cx('actor-pro')}>
                    Tên thật: <span className={cx('actor-value')}>{actor.name}</span>
                </p>
                <p className={cx('actor-pro')}>
                    Ngày sinh: <span className={cx('actor-value')}>{actor.birthday}</span>
                </p>
                <p className={cx('actor-pro')}>
                    Giới tính: <span className={cx('actor-value')}>{actor.gender}</span>
                </p>
                <p className={cx('actor-pro')}>
                    Quốc tịch: <span className={cx('actor-value')}>{actor.country_id}</span>
                </p>
                <p className={cx('actor-pro')}>
                    <span className={cx('actor-value')} dangerouslySetInnerHTML={{ __html: actor.story }}></span>
                </p>
            </div>
        </div>
    );
};

export default ActorInfo;
