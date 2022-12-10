import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col } from 'reactstrap';

const Tables = (props) => {
    // const movies = props.movies;
    console.log(props.table);
    return (
        <Table responsive>
            <thead className='text-primary'>
                <tr>
                    {props.table.theads.map((thead, index) => (
                        <th key={index}>{thead}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.table.tfbody.map((tfbody, index) => (
                    <tr key={index}>
                        {tfbody.map((tdContent, index) => (
                            <td key={index} dangerouslySetInnerHTML={{ __html: tdContent }}></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Tables;
