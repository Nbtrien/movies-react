import useAuth from '../../hooks/useAuth';
import usePrivateApi from '../../api/usePrivateApi';
import classNames from 'classnames/bind';
import styles from './comment.module.scss';
import Button from '../Button';
import { useEffect, useState } from 'react';
import { Form } from 'reactstrap';

const cx = classNames.bind(styles);

const CommentForm = (props) => {
    const value = props.value;

    // useEffect(() => {

    // })

    // const handleSubmit = async (e) => {
    //     try {
    //         const params = {
    //             user_id: auth.user.id,
    //             movie_id: movie_id,
    //             content: content,
    //         };
    //         console.log(params);
    //         const response = await privateApi.createComment(params);
    //         console.log(response);
    //         if (response.status) {
    //             setContent('');
    //             createHandle();
    //         }
    //     } catch (error) {
    //         if (!error?.response) {
    //             console.log('No Serve Response');
    //         }
    //     }
    // };

    // const handleChange = (event) => {
    //     // console.log(event.target.value);
    //     setContent(event.target.value);
    // };
    return (
        <>
            <Form onSubmit={props.onSubmit}>
                <div className={cx('enter-comment-wrapper')}>
                    <div className={cx('rounded-corners')}>T</div>
                    <div className={cx('enter-comment')}>
                        <textarea
                            id='input-comment-content'
                            rows='2'
                            placeholder='Viết bình luận ...'
                            onChange={props.onChange}
                            value={value}
                            required
                        ></textarea>
                    </div>
                    <div className={cx('btn-wapper')}>
                        <Button
                            btnColor='red'
                            type='rounded'
                            borderRadius='35px'
                            labelColor='white'
                            fontSize='1rem'
                            // onClick={handleSubmit}
                            disabled={value.length < 1}
                            submit='submit'
                        >
                            Thêm
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default CommentForm;
