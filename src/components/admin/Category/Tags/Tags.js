import { Card, CardHeader, CardBody, CardTitle, Col, Row, Input, Button, FormGroup } from 'reactstrap';
import movieApi from '../../../../api/movieApi';
import { useEffect, useState } from 'react';
import TagInput from './TagInput';
import usePrivateApi from '../../../../api/usePrivateApi';
import { Fragment } from 'react';

const Tags = () => {
    const privateApi = usePrivateApi();
    const [tags, setTags] = useState([]);
    const [tagsSelected, setTagsSelected] = useState([]);
    const [showFormInput, setShowFormInput] = useState({
        state: false,
    });
    const [seed, setSeed] = useState(false);

    useEffect(() => {
        const getTags = async () => {
            const response = await movieApi.getTags();
            setTags(response.data);
        };
        getTags();
    }, [seed]);

    const handleTagsChange = (e) => {
        let selectedValues = [...tagsSelected];
        if (e.target.checked) selectedValues.push(e.target.value);
        else selectedValues.splice(selectedValues.indexOf(e.target.value), 1);

        setTagsSelected(selectedValues);
    };

    useEffect(() => {
        if (showFormInput?.isUpdate && tagsSelected.length !== 1) {
            setShowFormInput({ state: false, isUpdate: false });
        }
    }, [tagsSelected]);

    const handleTagsAdd = () => {
        setShowFormInput({ state: true, isUpdate: false });
    };
    const handleTagsDelete = async () => {
        var deleteArray = ['1', '5', '6'];
        var pairs = tagsSelected.map(function (value) {
            return 'id[]=' + encodeURIComponent(value);
        });
        var query_string = pairs.join('&');

        if (window.confirm('Xóa!')) {
            const response = await privateApi.deleteTags(query_string);
            if (response.data.status) {
                alert('Succesful!');
                setSeed(!seed);
                setTagsSelected([]);
            }
        } else {
            alert('chuaw xaos');
        }
    };
    const handleTagsUpdate = () => {
        setShowFormInput({ state: true, isUpdate: true });
    };

    const handleSubmit = async (values) => {
        const response = await privateApi.createTags(values);
        if (response.data.status) {
            alert('Succesful!');
            setSeed(!seed);
            setTagsSelected([]);
        }
    };

    const handleUpdate = async (values) => {
        const response = await privateApi.updateTag(values.id, values);
        if (response.data.status) {
            alert('Succesful!');
            setSeed(!seed);
            setTagsSelected([]);
        }
    };

    return (
        <Fragment key={seed}>
            <CardTitle tag='h4'>Từ khóa</CardTitle>
            <Row>
                {tags.map((tag, index) => (
                    <Col md='2' key={index} className='flex'>
                        <label htmlFor={tag.name} className='checkbox'>
                            {tag.name}
                        </label>
                        <input
                            name='tags'
                            id={tag.name}
                            type='checkbox'
                            value={tag.id}
                            onChange={handleTagsChange}
                            checked={tagsSelected.includes(tag.id + '')}
                        />
                    </Col>
                ))}
            </Row>
            <Button className='btn-round btn-info' color='primary' onClick={handleTagsAdd}>
                Thêm
            </Button>
            <Button
                className='btn-round btn-warning'
                color='primary'
                disabled={tagsSelected.length !== 1}
                onClick={handleTagsUpdate}
            >
                Sửa
            </Button>
            <Button
                className='btn-round btn-danger'
                color='primary'
                disabled={tagsSelected.length < 1}
                onClick={handleTagsDelete}
            >
                Xóa
            </Button>
            <Fragment>
                {showFormInput.state && showFormInput.isUpdate && tagsSelected.length === 1 ? (
                    <TagInput
                        title='Sửa từ khóa'
                        tag={tags.find(({ id }) => id === Number(tagsSelected.at(0)))}
                        required={false}
                        onSubmit={handleUpdate}
                    />
                ) : null}
                {showFormInput.state && !showFormInput.isUpdate ? (
                    <TagInput title='Thêm từ khóa mới' onSubmit={handleSubmit} required={true} />
                ) : null}
            </Fragment>
        </Fragment>
    );
};

export default Tags;
