import { Card, CardHeader, CardBody, CardTitle, Col, Row, Input, Button, FormGroup } from 'reactstrap';
import movieApi from '../../../../api/movieApi';
import { useEffect, useState } from 'react';
import GenreInput from './GenreInput';
import usePrivateApi from '../../../../api/usePrivateApi';
import { Fragment } from 'react';

const Genres = () => {
    const privateApi = usePrivateApi();
    const [genres, setGenres] = useState([]);
    const [genresSelected, setGenresSelected] = useState([]);
    const [showFormInput, setShowFormInput] = useState({
        state: false,
    });

    const [seed, setSeed] = useState(false);

    useEffect(() => {
        const getGenres = async () => {
            const response = await movieApi.getGenres();
            setGenres(response.data);
        };
        getGenres();
    }, [seed]);

    const handleGenresChange = (e) => {
        let selectedValues = [...genresSelected];
        if (e.target.checked) selectedValues.push(e.target.value);
        else selectedValues.splice(selectedValues.indexOf(e.target.value), 1);

        setGenresSelected(selectedValues);
    };

    useEffect(() => {
        if (showFormInput?.isUpdate && genresSelected.length !== 1) {
            setShowFormInput({ state: false, isUpdate: false });
        }
    }, [genresSelected]);

    const handleGenresAdd = () => {
        setShowFormInput({ state: true, isUpdate: false });
    };

    const handleGenresDelete = async () => {
        var deleteArray = ['1', '5', '6'];
        var pairs = genresSelected.map(function (value) {
            return 'id[]=' + encodeURIComponent(value);
        });
        var query_string = pairs.join('&');

        if (window.confirm('Xóa!')) {
            const response = await privateApi.deleteGenres(query_string);
            if (response.data.status) {
                alert('Succesful!');
                setSeed(!seed);
                setGenresSelected([]);
            }
        } else {
            alert('chuaw xaos');
        }
    };
    const handleGenresUpdate = () => {
        setShowFormInput({ state: true, isUpdate: true });
    };

    const handleSubmit = async (values) => {
        console.log(values);
        const response = await privateApi.createGenres(values);
        if (response.data.status) {
            alert('Succesful!');
            setSeed(!seed);
            setGenresSelected([]);
        }
    };

    const handleUpdate = async (values) => {
        const response = await privateApi.updateGenres(values.id, values);
        console.log(response.data);
        if (response.data.status) {
            alert('Succesful!');
            setSeed(!seed);
            setGenresSelected([]);
        }
    };

    return (
        <Fragment key={seed}>
            <CardTitle tag='h4'>Thể loại</CardTitle>
            <Row>
                {genres.map((genre, index) => (
                    <Col md='2' key={index} className='flex'>
                        <label htmlFor={genre.name} className='checkbox'>
                            {genre.name}
                        </label>
                        <input
                            name='genres'
                            id={genre.name}
                            type='checkbox'
                            value={genre.id}
                            onChange={handleGenresChange}
                            checked={genresSelected.includes(genre.id + '')}
                        />
                    </Col>
                ))}
            </Row>
            <Button className='btn-round btn-info' color='primary' onClick={handleGenresAdd}>
                Thêm
            </Button>
            <Button
                className='btn-round btn-warning'
                color='primary'
                disabled={genresSelected.length !== 1}
                onClick={handleGenresUpdate}
            >
                Sửa
            </Button>
            <Button
                className='btn-round btn-danger'
                color='primary'
                disabled={genresSelected.length < 1}
                onClick={handleGenresDelete}
            >
                Xóa
            </Button>
            {showFormInput.state && showFormInput.isUpdate && genresSelected.length === 1 ? (
                <GenreInput
                    title='Sửa thể loại '
                    genre={genres.find(({ id }) => id === Number(genresSelected.at(0)))}
                    onSubmit={handleUpdate}
                    required={false}
                />
            ) : null}
            {showFormInput.state && !showFormInput.isUpdate ? (
                <GenreInput title='Thêm thể loại mới' onSubmit={handleSubmit} required={true} />
            ) : null}
        </Fragment>
    );
};

export default Genres;
