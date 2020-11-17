import React, {useEffect, useState} from 'react';

import '../Css/test.css';
import {Button, Col, Row, Table} from 'reactstrap';
import axios from 'axios';


const ReadMentoringApplication = (props) => {

    const [tableData, setTableData] = useState();

    let applicationArrays = [];

    function setApplicationArrays(newArrays) {
        applicationArrays = newArrays;
    }
    const renderInput = (applicationArray, index) => {
        var statusValue = "default";
        var ButtonColor = "secondary";

        switch (applicationArray.applicationStatus) {
            case 0:
                statusValue = "대기";
                break;
            
            case 1:
                statusValue = "합격";
                ButtonColor="success";
                
                break;
            case -1:
                statusValue = "탈락";
                ButtonColor="danger";
                break;
        }
        return (
            <tr key={index}>
                <th>{applicationArray.linkAgencyName}</th>
                <td>{applicationArray.activityName}</td>
                <td>{applicationArray.applicationDate}</td>
                <td><Button  color={ButtonColor}>{statusValue}</Button></td>
            </tr>
        )
    }
    function getApplicationHistory(form) {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));

        axios
            .post('http://localhost:8080/activity/readMentoringApplication', form)
            .then((response) => {

                setApplicationArrays(response.data);
                
                setTableData(applicationArrays.map(renderInput));
            });
    }

    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        getApplicationHistory(form);
    }, [])

    return (
        <div className="container">
            <Row>

                {/*게시판 테이블*/}
                <Col>
                    <Table >
                        {/* 문자 안끊기게 */}
                        <thead className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>

                                <th>연계기관 명</th>
                                <th>신청 활동 명</th>
                                <th>신청 날짜</th>
                                <th>합격 여부</th>

                            </tr>
                        </thead>
                        <tbody >
                            {tableData}
                        </tbody>
                    </Table>

                </Col>
            </Row>

        </div>
    )
}
export default ReadMentoringApplication;
