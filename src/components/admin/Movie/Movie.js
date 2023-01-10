import Tables from '../Tables';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import movieApi from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { movieCategory } from '../../../api/movieApi';

const Movie = () => {
    const [movies, setMovies] = useState(null);
    const [table, setTable] = useState(null);

    useEffect(() => {
        const getMovies = async () => {
            try {
                const params = { limit: 0 };
                const response = await movieApi.getMovies({ params });
                setMovies(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getMovies();
    }, []);

    useEffect(() => {
        const theads = ['STT', 'Phim', 'Danh mục', 'Thể loại', 'Lượt xem', 'Tác vụ'];
        const tfbody = [];

        const setProps = () => {
            movies.map((movie, index) => {
                const item = [];
                let text = '';

                item.push(index + 1);
                item.push(movie.name);
                item.push(movie.category);
                const genres = movie.genres.reduce((total, genre) => {
                    return total + genre.name + ', ';
                }, '');
                item.push(genres);
                item.push(movie.view);

                text +=
                    `<a href='/admin/movies/update/` +
                    movie.name +
                    `/` +
                    movie.id +
                    `'><i class='fas fa-fw fa-wrench'></i><span>Sửa</span></a><br/><a href=''><i class="fas fa-fw fa-trash-alt"></i><span>Xóa</span></a>`;
                if (movie.category == movieCategory.series_movie) {
                    text +=
                        `<br/><a href='/admin/movies/create/` +
                        movie.name +
                        `/` +
                        movie.id +
                        `/episode'><i class='fas fa-fw fa-plus-circle'></i><span>Thêm tập</span></a>`;
                }
                item.push(text);

                tfbody.push(item);
            });
            setTable({ theads, tfbody });
        };

        movies && setProps();
    }, [movies]);

    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý phim</CardTitle>
                    <span className='card-category'>Danh sách phim ({movies?.length})</span>
                    <span className='right-card-link'>
                        <Link to='/admin/movies/create'>
                            <i class='fas fa-fw fa-plus-circle'></i>
                            <span>Thêm phim mới</span>
                        </Link>
                    </span>
                </CardHeader>
                <CardBody>{table && <Tables table={table} />}</CardBody>
            </Card>
        </div>
    );
};

export default Movie;
