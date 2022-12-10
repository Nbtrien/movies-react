import Tables from '../Tables';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import usePrivateApi from '../../../api/usePrivateApi';
import { useEffect, useState } from 'react';
import movieApi from '../../../api/movieApi';
import { Link } from 'react-router-dom';

const Series = () => {
    const [series, setSeries] = useState(null);
    const [table, setTable] = useState(null);

    useEffect(() => {
        const getSeries = async () => {
            const response = await movieApi.getSeries();
            setSeries(response.data);
        };

        getSeries();
    }, []);

    useEffect(() => {
        const theads = ['Series', 'Danh sách phim', 'Lượt xem', 'Tác vụ'];
        const tfbody = [];

        const setProps = () => {
            series.map((serie, index) => {
                const item = [];
                let text = '';

                item.push(serie.name);
                const movies = serie.movies.reduce((total, movie) => {
                    return total + movie.name + ', ';
                }, '');
                item.push(movies);

                const views = serie.movies.reduce((total, movie) => {
                    return total + movie.view;
                }, 0);
                item.push(views);

                text +=
                    `<a href='/admin/series/update/` +
                    series.name +
                    `/` +
                    series.id +
                    `'><i class='fas fa-fw fa-wrench'></i><span>Sửa</span></a><br/><a href=''><i class="fas fa-fw fa-trash-alt"></i><span>Xóa</span></a>`;
                item.push(text);

                tfbody.push(item);
            });
            setTable({ theads, tfbody });
        };

        series && setProps();
    }, [series]);

    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý danh sách xem</CardTitle>
                    <span className='card-category'>Danh sách xem</span>
                    <span className='right-card-link'>
                        <Link to='/admin/list/create'>
                            <i class='fas fa-fw fa-plus-circle'></i>
                            <span>Thêm danh sách mới</span>
                        </Link>
                    </span>
                </CardHeader>
                <CardBody>{table && <Tables table={table} />}</CardBody>
            </Card>
        </div>
    );
};

export default Series;
