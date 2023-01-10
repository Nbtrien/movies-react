import Tables from '../Tables';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import movieApi from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { movieCategory } from '../../../api/movieApi';
import moment from 'moment';
import usePrivateApi from '../../../api/usePrivateApi';
import { Fragment } from 'react';

const Comment = () => {
    const [comments, setComments] = useState(null);
    const [table, setTable] = useState(null);
    const privateApi = usePrivateApi();
    const [seed, setSeed] = useState(false);

    useEffect(() => {
        const getComments = async () => {
            try {
                const params = { limit: 0 };
                const response = await movieApi.getAllComments({ params });
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getComments();
    }, [seed]);

    useEffect(() => {
        const theads = ['STT', 'user', 'Bình luận', 'Ngày', 'Tác vụ'];
        const tfbody = [];

        const setProps = () => {
            comments.map((comment, index) => {
                const item = [];

                item.push(index + 1);
                item.push(comment.user.name);
                item.push(comment.content);
                item.push(moment(comment.created_at).format('DD/MM/YYYY'));
                // let text = `<button ><i class="fas fa-fw fa-trash-alt"></i><span>Xóa</span></button>`;
                // item.push(text);
                const btn = {
                    type: 'btn',
                    name: 'Xóa',
                    icon: 'fas fa-fw fa-trash-alt',
                    id: comment.id,
                };
                item.push(btn);

                tfbody.push(item);
            });
            setTable({ theads, tfbody });
        };

        comments && setProps();
    }, [comments]);

    const handleBtnClick = async (e, id) => {
        e.preventDefault();
        const response = await privateApi.deleteComment(id);
        if (response.data.status) {
            alert('Succesful!');
            setSeed(!seed);
        }
    };

    return (
        <Fragment key={seed}>
            <div className='content'>
                <Card className='card-plain'>
                    <CardHeader>
                        <CardTitle tag='h4'>Quản lý bình luận</CardTitle>
                        <span className='card-category'>Danh sách bình luận</span>
                        {/* <span className='right-card-link'>
                    <Link to='/admin/movies/create'>
                        <i class='fas fa-fw fa-plus-circle'></i>
                        <span>Thêm phim mới</span>
                    </Link>
                </span> */}
                    </CardHeader>
                    <CardBody>{table && <Tables table={table} onClick={handleBtnClick} />}</CardBody>
                </Card>
            </div>
        </Fragment>
    );
};

export default Comment;
