import movieApi, { movieCategory } from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import FormInput from '../FormInput/FormInput';
import INPUT_TYPE from '../../../constants/InputType';
import { Button, Card, CardHeader, CardBody, CardTitle, Form, Col, Row, FormGroup, Input } from 'reactstrap';
import usePrivateApi from '../../../api/usePrivateApi';
import Multiselect from 'multiselect-react-dropdown';

const CreateSeries = () => {
    const privateApi = usePrivateApi();
    const [values, setValues] = useState({
        // name: '',
    });
    const [movies, setMovies] = useState([]);
    const [seed, setSeed] = useState(false);

    const [moviesSelected, setMoviesSelected] = useState([]);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleMovieSelect = (selectedList, selectedItem) => {
        setMoviesSelected(selectedList);
        const moviesList = [];
        selectedList.map((selected, value) => {
            moviesList.push(selected.id);
        });
        setValues({ ...values, movies: moviesList });
    };

    const handleMovieSearch = async (value) => {
        if (value.length > 0) {
            const response = await movieApi.getMoviesbyKey(value);
            setMovies(response.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await privateApi.createSeries(values);
        console.log(response.data);
        if (response.data.status) {
            alert('Succesful!');
            setValues({});
            setMoviesSelected([]);
            setMovies([]);
            setSeed(!seed);
        }
    };

    console.log(values);
    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý danh sách xem</CardTitle>
                    <span className='card-category'>Tạo Danh sách xem</span>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit} key={seed}>
                        <FormGroup row>
                            <Col sm={2} className='label-group'>
                                <label className='bold'>Tên series</label>
                            </Col>
                            <Col sm={10}>
                                <Input
                                    type={INPUT_TYPE.text}
                                    name='name'
                                    placeholder='Nhập tên series'
                                    required={true}
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={2} className='label-group'>
                                <label className='bold'>Thêm phim</label>
                            </Col>
                            <Col sm={10}>
                                <Multiselect
                                    placeholder='Chọn phim'
                                    options={movies} // Options to display in the dropdown
                                    onSelect={handleMovieSelect} // Function will trigger on select event
                                    onRemove={handleMovieSelect} // Function will trigger on remove event
                                    displayValue='name' // Property name to display in the dropdown options
                                    // selectedValues={movies}
                                    onSearch={handleMovieSearch}
                                />
                            </Col>
                        </FormGroup>
                        <Row>
                            <Col sm={2}></Col>
                            <Col sm={10}>
                                <div className='update ml-auto mr-auto'>
                                    <Button className='btn-round' color='primary' type='submit'>
                                        Thêm
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default CreateSeries;
