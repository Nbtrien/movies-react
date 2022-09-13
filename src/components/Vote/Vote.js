import classNames from 'classnames/bind';
import { Fragment, useState } from 'react';
import styles from './vote.module.scss';
const cx = classNames.bind(styles);
function Vote({ avgrating }) {
    const numberStars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const [checked, setChecked] = useState(avgrating.toFixed());
    console.log(checked);

    return (
        <div className={cx('vote')}>
            <div className={cx('point')}>Đánh giá phim: {avgrating}/10</div>
            <div className={cx('stars')}>
                <input type='hidden' name='idtovote' id='idtovote' value='{{ $movie->id }}' />
                <form action=''>
                    {numberStars.map((number) => {
                        // let checked = '';
                        // number.toString() === starChecked ? (checked = 'checked') : (checked = '');
                        return (
                            <Fragment key={number}>
                                <input
                                    // {...{ checked }}
                                    checked={checked === number}
                                    className={cx('star', `star-${number}`)}
                                    id={`star-${number}`}
                                    type='radio'
                                    name='star[]'
                                    onChange={() => {
                                        setChecked(number);
                                    }}
                                    value={number}
                                />
                                <label className={cx('star', `star-${number}`)} htmlFor={`star-${number}`} />
                            </Fragment>
                        );
                    })}
                </form>
            </div>
        </div>
    );
}

export default Vote;
