import { Col, Row, Input, Button, FormGroup, CardTitle, Form } from 'reactstrap';
import { useEffect, useState } from 'react';

const TagInput = (props) => {
    const [tagValue, setTagValue] = useState(props?.tag?.name);

    const [values, setValues] = useState({
        name: props?.tag?.name,
    });
    useEffect(() => {
        props?.tag?.id && setValues({ ...values, id: props?.tag?.id });
    }, [props]);

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

        setTagValue(e.target.value);
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
                            <label className='bold'>Từ khóa</label>
                        </Col>
                        <Col sm={4}>
                            <Input
                                name='name'
                                type='text'
                                autoComplete='off'
                                required={props.required}
                                value={tagValue}
                                id={props?.tag?.id}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Row>
                    <br></br>
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

export default TagInput;
