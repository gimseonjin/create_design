import React, {useEffect, useState} from 'react';

import '../Css/test.css';
import {
    Button,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';


const ReadMentoringApplication = (props) => {

    const [tableData, setTableData] = useState();

   
    let applicationArrays = [];
    const [modalInput, setModalInput] = useState("default");
    function setApplicationArrays(newArrays) {applicationArrays = newArrays;}
    const renderInput = (applicationArray, index) => {
        
        return (
            <tr key={index}>
                <th>{applicationArray.postId}</th>
                <td>{applicationArray.writerId}</td>
                <td>{applicationArray.title}</td>
                
                <td>{applicationArray.writeDate}</td>
                <td>{applicationArray.numberOfView}</td>
            </tr>
        )
    }
    function getApplicationHistory(form) {
        axios.post('http://localhost:8080/activity/readApplication', form).then((response) => {
         
                
                setApplicationArrays(response.data);
                setTableData(applicationArrays.map(renderInput));
            });
    }
   

    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        getApplicationHistory(form);
        }, []
    )


    return (
        <div className="container">
            <Row>
                
                {/*게시판 테이블*/}
                <Col>
                    <Table  >
                        {/* 문자 안끊기게 */}
                        <thead className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                           
                                <th>게시글 번호</th>
                                <th>작성자 ID</th>
                                <th>제목</th>
                                <th>작성날짜</th>
                                <th>조회수</th>

                            </tr>
                        </thead>
                        <tbody >
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {tableData}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
         
        </div>
    )
}
export default ReadMentoringApplication;
