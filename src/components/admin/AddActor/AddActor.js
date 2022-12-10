import movieApi, { movieCategory } from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import FormInput from '../FormInput/FormInput';
import INPUT_TYPE from '../../../constants/InputType';
import { Button, Card, CardHeader, CardBody, CardTitle, Form, Col, Row } from 'reactstrap';
import usePrivateApi from '../../../api/usePrivateApi';
import { useParams } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';

const AddActor = () => {
    const params = useParams();
    const movie = params.name;
    const movie_id = params.id;
    const privateApi = usePrivateApi();
    const [actors, setActors] = useState([]);
    const [actorsSelected, setActorsSelected] = useState([]);

    const handleTagSelect = (selectedList, selectedItem) => {
        setActorsSelected(selectedList);
    };

    useEffect(() => {
        const getActors = async () => {
            const response = await movieApi.getActors();
            console.log(response.data);
            setActors(response.data);
        };
        getActors();
    }, [params]);

    useEffect(() => {
        const getActorsInMovies = async () => {
            const response = await movieApi.getActorsbyMovie(movie_id);
            console.log(response.data);
            setActorsSelected(response.data);
        };
        getActorsInMovies();
    }, [params]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tagList = [];
        actorsSelected.map((selected, value) => {
            tagList.push(selected.id);
        });
        const paramsRequest = {
            movie_id: movie_id,
            actors: tagList,
        };

        const response = await privateApi.addActors(paramsRequest);
        if (response.data.status) {
            alert('seccesful!');
        }
    };
    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý phim</CardTitle>
                    <span className='card-category'>{movie} - Thêm diễn viên</span>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Multiselect
                            placeholder='Chọn diễn viên'
                            options={actors} // Options to display in the dropdown
                            onSelect={handleTagSelect} // Function will trigger on select event
                            onRemove={handleTagSelect} // Function will trigger on remove event
                            displayValue='name' // Property name to display in the dropdown options
                            selectedValues={actorsSelected}
                        />
                        <div className='update ml-auto mr-auto'>
                            <Button
                                className='btn-round'
                                color='primary'
                                type='submit'
                                disabled={actorsSelected.length < 1}
                            >
                                Thêm
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddActor;
