import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import usePrivateApi from '../../api/usePrivateApi';
import useAuth from '../../hooks/useAuth';
import styles from './vote.module.scss';
const cx = classNames.bind(styles);
function Vote({ movie_id, avgrating }) {
    const privateApi = usePrivateApi();
    const { auth } = useAuth();

    const numberStars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const [checked, setChecked] = useState();
    const [isChecked, setIsChecked] = useState(false);
    // console.log(checked);

    const handleChange = (e) => {
        if (auth.user) {
            setChecked(e.target.value);
            setIsChecked(true);
        } else {
            alert('Login, Please!');
        }
    };

    useEffect(() => {
        const addVote = async () => {
            console.log(movie_id + '   ' + checked);
            const params = {
                user_id: auth?.user?.id,
                movie_id: movie_id,
                value: checked,
            };
            const response = await privateApi.addVote(params);
            console.log(response.data);
        };
        isChecked && addVote();
    }, [checked]);

    console.log(avgrating);
    useEffect(() => {
        setChecked(Math.round(avgrating));
    }, [avgrating]);

    return (
        <div className={cx('vote')}>
            <div className={cx('point')}>Đánh giá phim: {checked}/10</div>
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
                                    checked={checked + '' === number + ''}
                                    className={cx('star', `star-${number}`)}
                                    id={`star-${number}`}
                                    type='radio'
                                    name='star[]'
                                    onChange={handleChange}
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
