import movieApi, { movieCategory } from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import FormInput from '../FormInput/FormInput';
import INPUT_TYPE from '../../../constants/InputType';
import { Button, Card, CardHeader, CardBody, CardTitle, Form, Col, Row } from 'reactstrap';
import usePrivateApi from '../../../api/usePrivateApi';

const CreateActor = () => {
    const privateApi = usePrivateApi();

    const [countries, setCountries] = useState([]);
    const [values, setValues] = useState({});

    const gender = [
        { id: 1, name: 'Nam' },
        { id: 2, name: 'Nữ' },
        { id: 3, name: 'Khác' },
    ];

    const [seed, setSeed] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (content) => {
        setValues({ ...values, story: content });
    };

    const createImage = (type, file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            const formData = { file: e.target.result };
            setValues({ ...values, [type]: formData });
        };
        reader.readAsDataURL(file);
    };

    const handleFileChoose = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        createImage(e.target.name, files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await privateApi.createActor(values);
        console.log(response.data.status);
        if (response.data.status) {
            alert('Succesful!');
            setValues({});
            setCountries([]);
            setSeed(!seed);
        }
    };

    useEffect(() => {
        const getCountries = async () => {
            const response = await movieApi.getCountries();
            setCountries(response.data);
        };
        getCountries();
    }, [seed]);

    useEffect(() => {
        countries && setValues({ ...values, country: countries[0]?.id });
    }, [countries]);

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập tên diễn viên',
            errorMessage: 'Nhập tên phim',
            label: 'Tên diễn viên',
            required: true,
            onChange: handleChange,
        },
        {
            id: 2,
            name: 'gender',
            type: INPUT_TYPE.radio,
            label: 'Giới tính',
            options: gender,
            required: true,
            onChange: handleChange,
        },
        {
            id: 3,
            name: 'birthday',
            type: INPUT_TYPE.date,
            placeholder: 'Ngày sinh',
            label: 'Ngày sinh',
            required: true,
            onChange: handleChange,
        },
        {
            id: 4,
            name: 'country',
            type: INPUT_TYPE.select,
            placeholder: 'Quốc tịch',
            label: 'Quốc tịch',
            options: countries,
            required: true,
            onChange: handleChange,
        },
        {
            id: 5,
            name: 'story',
            type: INPUT_TYPE.editor,
            placeholder: 'Tiểu sử',
            label: 'Tiểu sử',
            required: true,
            onChange: handleEditorChange,
        },
        {
            id: 6,
            name: 'profileimage',
            type: INPUT_TYPE.file,
            label: 'Chọn ảnh',
            required: true,
            onChange: handleFileChoose,
        },
    ];

    console.log(values);
    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý diễn viên</CardTitle>
                    <span className='card-category'>Thêm diễn viên</span>
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

export default CreateActor;
