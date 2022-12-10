import { Card, CardHeader, CardBody, CardTitle, Col, Row, Input, Button, FormGroup } from 'reactstrap';
import Genres from './Genres/Genres';
import Tags from './Tags/Tags';

const Category = () => {
    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý danh mục</CardTitle>
                </CardHeader>
                <CardBody>
                    <Genres />
                    <hr></hr>
                    {/* <Genres /> */}
                    <Tags />
                    <hr></hr>
                    {/* <Genres /> */}
                </CardBody>
            </Card>
        </div>
    );
};

export default Category;
