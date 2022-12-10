import Tables from '../Tables';
import { Card, CardHeader, CardBody, CardTitle, Col } from 'reactstrap';
import usePrivateApi from '../../../api/usePrivateApi';
import { useEffect, useState } from 'react';

const User = () => {
    const privateApi = usePrivateApi();
    const [users, setUsers] = useState(null);
    const [table, setTable] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await privateApi.getUsers();
                console.log(response.data);
                setUsers(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        const theads = ['Tên', 'Email', 'Ngày tạo', 'Quyền'];
        const tfbody = [];

        const setProps = () => {
            users.map((user, index) => {
                const item = [];

                item.push(user.name);
                item.push(user.email);
                item.push(user.created_at);
                item.push(user.role.name);

                tfbody.push(item);
            });
            setTable({ theads, tfbody });
        };

        users && setProps();
    }, [users]);

    return (
        <div className='content'>
            <Card className='card-plain'>
                <CardHeader>
                    <CardTitle tag='h4'>Quản lý người dùng</CardTitle>
                    <span className='card-category'>Danh sách người dùng</span>
                    <span className='right-card-link'>
                        {/* <Link to='/admin/actors/create'>
                            <i class='fas fa-fw fa-plus-circle'></i>
                            <span>Thêm diễn viên mới</span>
                        </Link> */}
                    </span>
                </CardHeader>
                <CardBody>{table && <Tables table={table} />}</CardBody>
            </Card>
        </div>
    );
};

export default User;
