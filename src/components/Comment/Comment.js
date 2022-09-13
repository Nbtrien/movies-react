import React, { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { memo } from 'react';
import classNames from 'classnames/bind';
import { faReply, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from '../../hooks/useAuth';
import movieApi from '../../api/movieApi';
import styles from './comment.module.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Comment = (props) => {
    const { auth } = useAuth();

    const id = props.id;
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        const getComments = async () => {
            const params = {
                limit: 6,
            };
            try {
                const response = await movieApi.getComments(id, { params });
                setComments(response.data);
                setTotalPage(response.last_page);
                setTotalComments(response.total);
                setPage(1);
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, [props]);

    const loadmore = async () => {
        let response = null;
        const params = {
            limit: 6,
            page: page + 1,
        };
        try {
            const response = await movieApi.getComments(id, { params });
            setComments([...comments, ...response.data]);
            setPage(page + 1);
        } catch (error) {
            console.log(error);
        }
    };

    const hide = async () => {
        const params = {
            limit: 6,
            page: 1,
        };
        try {
            const response = await movieApi.getComments(id, { params });
            setComments(response.data);
            setTotalPage(response.last_page);
            setTotalComments(response.total);
            setPage(1);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('total')}>{totalComments} bình luận</div>
                <div className={cx('line')}></div>
                {auth.user ? (
                    <div className={cx('enter-comment-wrapper')}>
                        <div className={cx('rounded-corners')}>T</div>
                        <div className={cx('enter-comment')}>
                            <textarea id='input-comment-content' rows='2' placeholder='Viết bình luận ...'></textarea>
                            <input type='hidden' id='id_p' value='' />
                            <input type='hidden' id='id_u' value='<?php echo $id_us ?>' />
                            <input type='hidden' id='user_name' value='<?php echo $usn ?>' />
                        </div>
                        <div className={cx('btn-wapper')}>
                            <Button
                                btnColor='red'
                                type='rounded'
                                borderRadius='35px'
                                labelColor='white'
                                fontSize='1rem'
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                ) : (
                    <Link to='/login'>Đăng nhập để bình luận </Link>
                )}

                <div className={cx('new-comment')} id='new-comment'></div>
                <div className={cx('comment-list')}>
                    {comments.map((comment, index) => (
                        <Fragment key={index}>
                            <div className={cx('comment-wrapper')}>
                                <div>
                                    <div className={cx('rounded-corners')}>{comment.user.name.substring(0, 1)}</div>
                                </div>
                                <div>
                                    <div className={cx('section-name')}>
                                        <div className={cx('username')}>{comment.user.name}</div>
                                        <div className={cx('comment-time')}>{comment.time}</div>
                                    </div>
                                    <div className={cx('comment-content')}>{comment.content}</div>
                                    <div className={cx('comment-action')}>
                                        <a className={cx('action-section')} href=''>
                                            <FontAwesomeIcon icon={faThumbsUp} className={cx('action-icon')} />
                                            <span>0</span>
                                        </a>
                                        <a className={cx('action-section')} href=''>
                                            <FontAwesomeIcon icon={faThumbsDown} className={cx('action-icon')} />
                                            <span>0</span>
                                        </a>
                                        <a className={cx('action-section')} href='' id='showrepcomm[]' at=''>
                                            <FontAwesomeIcon icon={faReply} className={cx('action-icon')} />
                                            <span>0</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('rep_comm')}>
                                <div id='new_repcomm[{{ $comment->id }}]'></div>
                                {comment.replies.length != 0 &&
                                    comment.replies.map((reply, index) => (
                                        <div className={cx('comment-wrapper')} key={index}>
                                            <div>
                                                <div className={cx('rounded-corners')}>
                                                    {reply.user.name.substring(0, 1)}
                                                </div>
                                            </div>
                                            <div>
                                                <div className={cx('section-name')}>
                                                    <div className={cx('username')}>{reply.user.name}</div>
                                                    <div className={cx('comment-time')}>{reply.time}</div>
                                                </div>
                                                <div className={cx('comment-content')}>{reply.content}</div>
                                                <div className={cx('comment-action')}>
                                                    <a className={cx('action-section')} href=''>
                                                        <FontAwesomeIcon
                                                            icon={faThumbsUp}
                                                            className={cx('action-icon')}
                                                        />
                                                        <span>0</span>
                                                    </a>
                                                    <a className={cx('action-section')} href=''>
                                                        <FontAwesomeIcon
                                                            icon={faThumbsDown}
                                                            className={cx('action-icon')}
                                                        />
                                                        <span>0</span>
                                                    </a>
                                                    <a
                                                        className={cx('action-section')}
                                                        href=''
                                                        id='showrepcomm[]'
                                                        at=''
                                                    >
                                                        <FontAwesomeIcon icon={faReply} className={cx('action-icon')} />
                                                        <span>0</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </Fragment>
                    ))}
                </div>
                {page < totalPage ? (
                    <div className={cx('section-btn')}>
                        <Button
                            btnColor='black'
                            type='outlineStyles'
                            labelColor='white'
                            fontSize='1rem'
                            onClick={loadmore}
                        >
                            Load more
                        </Button>
                    </div>
                ) : (
                    totalPage > 1 && (
                        <div className={cx('section-btn')}>
                            <Button
                                btnColor='black'
                                type='outlineStyles'
                                labelColor='white'
                                fontSize='1rem'
                                onClick={hide}
                            >
                                Hide
                            </Button>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default memo(Comment);
