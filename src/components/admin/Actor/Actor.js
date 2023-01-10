import Tables from '../Tables';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import movieApi from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { movieCategory } from '../../../api/movieApi';
import moment from 'moment';

const Actor = () => {
    const [actors, setActors] = useState(null);
    const [table, setTable] = useState(null);

    useEffect(() => {
        const getActors = async () => {
            try {
                const params = { limit: 25 };
                const response = await movieApi.getActors({ params });
                setActors(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getActors();
    }, []);

    useEffect(() => {
        const theads = ['STT', 'Tên', 'Ngày sinh', 'Giới tính', 'Phim tham gia', 'Tác vụ'];
        const tfbody = [];

        const setProps = () => {
            actors.map((actor, index) => {
                const item = [];

                item.push(index + 1);
                item.push(actor.name);
                item.push(moment(actor.birthday).format('DD/MM/YYYY'));
                item.push(actor.gender);
                const movies = actor.movies.reduce((total, movie) => {
                    return total + movie.name + ', ';
                }, '');
                item.push(movies);

                let text = `<a href=''><i class='fas fa-fw fa-wrench'></i><span>Sửa</span></a><br/><a href=''><i class="fas fa-fw fa-trash-alt"></i><span>Xóa</span></a>`;
                item.push(text);

                tfbody.push(item);
            });
            setTable({ theads, tfbody });
        };

        actors && setProps();
    }, [actors]);

    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý diễn viên</CardTitle>
                    <span className='card-category'>Danh sách diễn viên</span>
                    <span className='right-card-link'>
                        <Link to='/admin/actors/create'>
                            <i class='fas fa-fw fa-plus-circle'></i>
                            <span>Thêm diễn viên mới</span>
                        </Link>
                    </span>
                </CardHeader>
                <CardBody>{table && <Tables table={table} />}</CardBody>
            </Card>
        </div>
    );
};

export default Actor;
