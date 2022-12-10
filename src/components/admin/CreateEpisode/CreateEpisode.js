import movieApi from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieCategory } from '../../../api/movieApi';
import INPUT_TYPE from '../../../constants/InputType';
import { Button, Card, CardHeader, CardBody, CardTitle, Form, Col, Row } from 'reactstrap';
import FormInput from '../FormInput/FormInput';
import usePrivateApi from '../../../api/usePrivateApi';

const CreateEpisode = () => {
    const params = useParams();
    const movie_name = params.name;
    const movie_id = params.id;
    const [values, setValues] = useState({
        movie_id: movie_id,
    });
    const [seed, setSeed] = useState(false);
    const privateApi = usePrivateApi();

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleFileChoose = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        createImage(e.target.name, files[0]);
    };

    const createImage = (type, file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            const formData = { file: e.target.result };
            setValues({ ...values, [type]: formData });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await privateApi.createEpisodes(values);
        console.log(response.data);
        if (response.data.status) {
            alert('Succesful!');
            setValues({});
            setSeed(!seed);
        }
    };

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: INPUT_TYPE.text,
            errorMessage: 'Nhập tên phim',
            label: 'Tên phim',
            defaultValue: movie_name,
            disabled: true,
        },
        {
            id: 2,
            name: 'episode',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập tập phim',
            label: 'Tập phim',
            required: true,
            onChange: handleChange,
        },
        {
            id: 3,
            name: 'episode_title',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập tiêu đề',
            label: 'Tiêu đề',
            required: true,
            onChange: handleChange,
        },
        {
            id: 4,
            name: 'image',
            type: INPUT_TYPE.file,
            label: 'Chọn ảnh ',
            required: true,
            onChange: handleFileChoose,
        },
        {
            id: 5,
            name: 'video',
            type: INPUT_TYPE.text,
            placeholder: 'https://xxx/xxx/',
            label: 'Đường dẫn video',
            required: true,
            onChange: handleChange,
        },
    ];
    console.log(values);
    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardHeader>
                        <CardTitle tag='h4'>Quản lý phim</CardTitle>
                        <span className='card-category'>{movie_name} - Thêm tập phim</span>
                    </CardHeader>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit} key={seed}>
                        {inputs.map((input) => (
                            <FormInput key={input.id} {...input} onChange={input.onChange} />
                        ))}
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

export default CreateEpisode;
