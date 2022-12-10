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
import { Link, useLocation } from 'react-router-dom';
import CommentForm from './CommentForm';
import usePrivateApi from '../../api/usePrivateApi';

const cx = classNames.bind(styles);

const Comment = (props) => {
    const { auth } = useAuth();
    const location = useLocation();
    const privateApi = usePrivateApi();

    const id = props.id;
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [isCreated, setIsCreated] = useState(false);

    const [isReply, setIsReply] = useState();
    const [content, setContent] = useState('');
    const [contentReply, setContentReply] = useState('');

    useEffect(() => {
        const getComments = async () => {
            const params = {
                limit: 6,
            };
            try {
                const response = await movieApi.getComments(id, { params });
                setComments(response.data);
                setTotalPage(response.meta.last_page);
                setTotalComments(response.meta.total);
                setPage(1);
            } catch (error) {
                console.log(error);
            }
            if (isCreated) {
                setIsCreated(false);
            }
        };
        getComments();
    }, [props, isCreated]);

    // console.log(isCreated);
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
            setTotalPage(response.meta.last_page);
            setTotalComments(response.meta.total);
            setPage(1);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const params = {
                user_id: auth.user.id,
                movie_id: id,
                content: content,
            };
            console.log(params);
            const response = await privateApi.createComment(params);
            console.log(response);
            if (response.status) {
                setContent('');
                setIsCreated(true);
            }
        } catch (error) {
            if (!error?.response) {
                console.log('No Serve Response');
            }
        }
        // setIsCreated(true);
    };

    const handleReply = async (e) => {
        e.preventDefault();
        console.log(isReply + ' ' + contentReply);
        try {
            const params = {
                user_id: auth.user.id,
                movie_id: id,
                parent_id: isReply,
                content: contentReply,
            };
            console.log(params);
            const response = await privateApi.createComment(params);
            console.log(response);
            if (response.status) {
                setContentReply('');
                setIsCreated(true);
            }
        } catch (error) {
            if (!error?.response) {
                console.log('No Serve Response');
            }
        }
    };

    const handleReplyClick = (e, id) => {
        e.preventDefault();
        setContentReply('');
        setIsReply(id);
    };

    const handleReplyChange = (event) => {
        setContentReply(event.target.value);
    };

    const likeClickHandle = () => {};

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('total')}>{totalComments} bình luận</div>
                <div className={cx('line')}></div>
                {auth.user ? (
                    <CommentForm value={content} onSubmit={handleCreate} onChange={handleChange} />
                ) : (
                    <Link to='/login' state={{ from: location }}>
                        Đăng nhập để bình luận{' '}
                    </Link>
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
                                        <button
                                            className={cx('action-section')}
                                            onClick={likeClickHandle}
                                            disabled={!auth.access_token}
                                        >
                                            <FontAwesomeIcon icon={faThumbsUp} className={cx('action-icon')} />
                                            <span>0</span>
                                        </button>
                                        <button className={cx('action-section')} disabled={!auth.access_token}>
                                            <FontAwesomeIcon icon={faThumbsDown} className={cx('action-icon')} />
                                            <span>0</span>
                                        </button>
                                        <button
                                            className={cx('action-section')}
                                            disabled={!auth.access_token}
                                            onClick={(e) => handleReplyClick(e, comment.id)}
                                        >
                                            <FontAwesomeIcon icon={faReply} className={cx('action-icon')} />
                                            <span>{comment.replies.length}</span>
                                        </button>
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
                                                    <button
                                                        className={cx('action-section')}
                                                        disabled={!auth.access_token}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faThumbsUp}
                                                            className={cx('action-icon')}
                                                        />
                                                        <span>0</span>
                                                    </button>
                                                    <button
                                                        className={cx('action-section')}
                                                        disabled={!auth.access_token}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faThumbsDown}
                                                            className={cx('action-icon')}
                                                        />
                                                        <span>0</span>
                                                    </button>
                                                    <button
                                                        className={cx('action-section')}
                                                        disabled={!auth.access_token}
                                                        id='showrepcomm[]'
                                                        at=''
                                                    >
                                                        <FontAwesomeIcon icon={faReply} className={cx('action-icon')} />
                                                        <span>0</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                {comment.id === isReply && (
                                    // <CommentForm movie_id={id} comment_id={comment.id} createHandle={handleReply} />
                                    <CommentForm
                                        value={contentReply}
                                        onSubmit={handleReply}
                                        onChange={handleReplyChange}
                                    />
                                )}

                                {/*  */}
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
