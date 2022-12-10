import movieApi, { movieCategory } from '../../../api/movieApi';
import { useEffect, useState } from 'react';
import FormInput from '../FormInput/FormInput';
import INPUT_TYPE from '../../../constants/InputType';
import { Button, Card, CardHeader, CardBody, CardTitle, Form, Col, Row } from 'reactstrap';
import usePrivateApi from '../../../api/usePrivateApi';

const CreateMovie = () => {
    const privateApi = usePrivateApi();

    const [genres, setGenres] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [tags, setTags] = useState([]);
    const [isSeries, setIsSeries] = useState(false);

    const [values, setValues] = useState({
        // name: '',
    });

    const [seed, setSeed] = useState(false);

    const [genresSelected, setGenresSelected] = useState([]);

    const handleTagSelect = (selectedList, selectedItem) => {
        const tagList = [];
        selectedList.map((selected, value) => {
            tagList.push(selected.id);
        });

        setValues({ ...values, tags: tagList });
    };

    const handleGenresChange = (e) => {
        let selectedValues = [...genresSelected];
        if (e.target.checked) selectedValues.push(e.target.value);
        else selectedValues.splice(selectedValues.indexOf(e.target.value), 1);

        setGenresSelected(selectedValues);
        setValues({ ...values, [e.target.name]: selectedValues });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleEditorChange = (content) => {
        setValues({ ...values, description: content });
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

    const handleCategorySelect = (e) => {
        const cate = e.target.options[e.target.selectedIndex].text;

        if (cate === movieCategory.series_movie) {
            setIsSeries(true);
        } else {
            setIsSeries(false);
        }

        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await privateApi.createMovie(values);
        console.log(response.data);
        if (response.data.status) {
            alert('Succesful!');
            setValues({});
            setGenresSelected([]);
            setIsSeries(false);
            setCategories([]);
            setCountries([]);
            setSeed(!seed);
        }
    };

    useEffect(() => {
        const getGenres = async () => {
            const response = await movieApi.getGenres();
            setGenres(response.data);
        };

        const getCategories = async () => {
            const response = await movieApi.getCategories();
            setCategories(response.data);
        };

        const getCountries = async () => {
            const response = await movieApi.getCountries();
            setCountries(response.data);
        };

        const getTags = async () => {
            const response = await movieApi.getTags();
            setTags(response.data);
        };

        getGenres();
        getCategories();
        getCountries();
        getTags();
    }, [seed]);

    useEffect(() => {
        categories && setValues({ ...values, category: categories[0]?.id });
    }, [categories]);

    useEffect(() => {
        countries && setValues({ ...values, country: countries[0]?.id });
    }, [countries]);

    const inputs = [
        {
            id: 1,
            name: 'name',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập tên phim',
            errorMessage: 'Nhập tên phim',
            label: 'Tên phim',
            required: true,
            onChange: handleChange,
        },
        {
            id: 2,
            name: 'engName',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập tên tiếng Anh',
            errorMessage: 'Nhập tên tiếng Anh',
            label: 'Tên tiếng Anh',
            required: true,
            onChange: handleChange,
        },
        {
            id: 3,
            name: 'release_date',
            type: INPUT_TYPE.date,
            placeholder: 'Ngày sản xuât',
            errorMessage: 'Hãy nhập ngày sản xuât',
            label: 'Ngày sản xuât',
            required: true,
            onChange: handleChange,
        },
        {
            id: 4,
            name: 'category',
            type: INPUT_TYPE.select,
            placeholder: 'Danh mục',
            errorMessage: '',
            label: 'Danh mục',
            options: categories,
            required: true,
            onChange: handleCategorySelect,
        },
        {
            id: 5,
            name: 'country',
            type: INPUT_TYPE.select,
            placeholder: 'Quốc gia',
            errorMessage: '',
            label: 'Quốc gia',
            options: countries,
            required: true,
            onChange: handleChange,
        },
        {
            id: 6,
            name: 'genres',
            type: INPUT_TYPE.checkbox,
            placeholder: 'Thể loại',
            errorMessage: '',
            label: 'Thể loại',
            options: genres,
            valuesSelected: genresSelected,
            required: true,
            onChange: handleGenresChange,
        },
        {
            id: 7,
            name: 'tags',
            type: INPUT_TYPE.multi_select,
            placeholder: 'Chọn thẻ tag',
            errorMessage: '',
            label: 'Chọn thẻ tag',
            options: tags,
            required: true,
            onChange: handleTagSelect,
        },
        {
            id: 8,
            name: 'language',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập ngôn ngữ',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Ngôn ngữ',
            required: true,
            onChange: handleChange,
        },
        {
            id: 9,
            name: 'runTime',
            type: INPUT_TYPE.number,
            placeholder: 'Thời lượng phim (phút/tập)',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Thời lượng',
            required: true,
            onChange: handleChange,
        },
        {
            id: 10,
            name: 'episodes',
            type: INPUT_TYPE.number,
            placeholder: 'Nhập số tập phim (phim bộ)',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Số tập',
            required: true,
            disabled: !isSeries,
            onChange: handleChange,
        },
        {
            id: 11,
            name: 'studio',
            type: INPUT_TYPE.text,
            placeholder: 'Nhập công ty sản xuất',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Công ty sản xuất',
            required: true,
            onChange: handleChange,
        },
        {
            id: 12,
            name: 'description',
            type: INPUT_TYPE.editor,
            placeholder: 'Mô tả',
            errorMessage: '',
            label: 'Mô tả',
            required: true,
            onChange: handleEditorChange,
        },
        {
            id: 13,
            name: 'profileimage',
            type: INPUT_TYPE.file,
            placeholder: 'Công ty sản xuất',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Chọn ảnh',
            required: true,
            onChange: handleFileChoose,
        },
        {
            id: 14,
            name: 'coverimage',
            type: INPUT_TYPE.file,
            placeholder: 'Công ty sản xuất',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Chọn ảnh bìa',
            required: true,
            onChange: handleFileChoose,
        },
        {
            id: 15,
            name: 'trailer',
            type: INPUT_TYPE.text,
            placeholder: 'https://xxx/xxx/',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Đường dẫn trailer',
            required: true,
            onChange: handleChange,
        },
        {
            id: 16,
            name: 'video',
            type: INPUT_TYPE.text,
            placeholder: 'https://xxx/xxx/',
            errorMessage: 'Hãy nhập tên phim',
            label: 'Đường dẫn Phim',
            required: true,
            disabled: isSeries,
            onChange: handleChange,
        },
    ];

    console.log(values);
    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý phim</CardTitle>
                    <span className='card-category'>Thêm phim</span>
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

export default CreateMovie;
