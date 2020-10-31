import React,{useEffect, useState} from 'react';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Row, Table } from 'reactstrap';
import CreateReport from '../Mentor/CreateReport';
import CreateQR from '../Mentor/CreateQR';
import ExportMentoringActivity from '../LinkAgencyManager/ExportMentoringActivity';
import useRequest from './useRequest';
import axios from 'axios';
import usePost from './usePost';

//활동 내역 조회
const ReadActivityHistory=(props)=> {
    
    const [message, setMessage] = useState("message");
    const [modalCreateReport, setModalCreateReport] = useState(false); 
    const [modalCreateQR, setModalCreateQR] = useState(false); 
    const [modalExportExcel, setModalExportExcel] = useState(false); 
    var list = [];
    

    const toggleCreateReport = () => setModalCreateReport(!modalCreateReport);
    const toggleCreateQR = () => setModalCreateQR(!modalCreateQR);
    const toggleExportExcel = () => setModalExportExcel(!modalExportExcel);
    var input = [
        {
            "date" : "2020-10-10",
            "startTime" : "15:00",
            "endTime": "17:00",
            "report" : "미작성",
            "state" : "미승인"
        },
        {
            "date" : "2020-10-10",
            "startTime" : "15:00",
            "endTime": "19:00",
            "report" : "미작성",
            "state" : "미승인"
        },
        {
            "date" : "2020-1-10",
            "startTime" : "15:00",
            "endTime": "21:00",
            "report" : "미작성",
            "state" : "미승인"
        }

    ];
    

    const getActivityHistory = () => {

    }

    const setListActivityHistory = () => {
        for(var i = 0; i < 5; i++){
            console.log("실행됨")
            list.push(<tr>
                <th scope="row">{i}</th>
                <td>2020-10-10</td>
                <td>15:00</td>
                <td>17:00</td>
                <td>미작성 <Button size="sm" onClick={()=>{setModalCreateReport(true)}}>작성하기</Button></td>
                <td>미승인</td>
                </tr>
                );
            console.log(list);
        };
    }
for(var i = 0; i < input.length; i++){
    var obj = input[i];
    var j = 1;
    var tableData = input.map((obj) => {

    return <tr>
        <th scope="row">{j++}</th>
        <td>{obj.date}</td>
        <td>{obj.startTime}</td>
        <td>{obj.endTime}</td>
        <td>{obj.report} <Button size="sm" onClick={()=>{setModalCreateReport(true)}}>작성하기</Button></td>
        <td>{obj.state}</td>
        </tr>
    
    })
}
    
    useEffect(()=>{
        setListActivityHistory();
      },[]
    )
    // const [response, loading, error] = usePost('http://localhost:8080/testPost', input);
    
    return (
        <div className="container">
        
            <Row>
                {/* 날짜, 연계기관, 활동 선택 */}
                <Col className="mb-5">
                    <Form>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>소속 연계기관</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select">
                            <option>연계기관 선택</option>
                            <option>연계기관1</option>
                            <option>연계기관2</option>
                        </Input>
                        </InputGroup>

                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select">
                            <option>활동 선택</option>
                            <option>활동1</option>
                            <option>활동2</option>
                        </Input>
                        </InputGroup>

                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>기간</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="startDate"></Input>~
                        <Input type="date" name="endDate"></Input>
                        </InputGroup>
                        <Button className="float-right" color="primary" onClick={()=> setListActivityHistory()
                        }>조회</Button>
                        {/* <Button className="float-right" color="primary" onClick={()=>setMessage(response.data.message)}>test<p>{message}</p></Button> */}
                        <Button color="primary" onClick={()=>setModalExportExcel(true)}>내보내기</Button>
                        <Button className="float-left" color="primary" onClick={()=>setModalCreateQR(true)}>QR 생성</Button>

                    </Form>
                </Col>
                <br></br>

                {/* 활동 내역 테이블 */}
                <Col>
                    <Table className="text-nowrap">
                        {/* 문자 안끊기게 */}
                        <thead>
                            {/* 열 이름부분 */}
                            <tr>
                                <th>#</th>
                                <th>활동날짜</th>
                                <th>시작 시간</th>
                                <th>종료 시간</th>
                                <th>활동 보고서</th>
                                <th>승인 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {tableData}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal isOpen={modalCreateReport}>
                <ModalHeader toggle={toggleCreateReport}>활동보고서</ModalHeader>
                <CreateReport></CreateReport>

            </Modal>

            <Modal isOpen={modalCreateQR}>
                <ModalHeader toggle={toggleCreateQR}>QR코드 생성</ModalHeader>
                <CreateQR></CreateQR>

            </Modal>

            <Modal isOpen={modalExportExcel}>
                <ModalHeader toggle={toggleExportExcel}>활동 내역 내보내기</ModalHeader>
                <ExportMentoringActivity></ExportMentoringActivity>

            </Modal>
        </div>
    )
}
export default ReadActivityHistory;