import { useState, useEffect } from 'react';
import { CardTitle, Col, Row, Input, Button, FormGroup, Form } from 'reactstrap';

const GenreInput = (props) => {
    const [genresValue, setGenresValue] = useState(props?.genre?.name);

    const [values, setValues] = useState({
        name: props?.genre?.name,
    });

    useEffect(() => {
        props?.genre?.id && setValues({ ...values, id: props?.genre?.id });
    }, [props]);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setGenresValue(e.target.value);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(values);
    };

    return (
        <>
            <CardTitle tag='h4'>{props.title}</CardTitle>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Row>
                        <Col sm={2} className='label-group'>
                            <label className='bold'>Thể loại</label>
                        </Col>
                        <Col sm={4}>
                            <Input
                                name='name'
                                type='text'
                                required={props.required}
                                value={genresValue}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col sm={2} className='label-group'>
                            <label className='bold'>Chọn ảnh</label>
                        </Col>
                        <Col sm={4}>
                            <Input name='image' type='file' required={props.required} onChange={handleFileChoose} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={4}>
                            <Button className='btn-round' color='red' type='submit'>
                                Xác nhận
                            </Button>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </>
    );
};

export default GenreInput;
