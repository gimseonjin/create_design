import React,{useEffect, useState} from 'react';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Row, Table } from 'reactstrap';
import CreateReport from '../Mentor/CreateReport';
import CreateQR from '../Mentor/CreateQR';
import ExportMentoringActivity from '../LinkAgencyManager/ExportMentoringActivity';
import useRequest from './useRequest';
import axios from 'axios';
import usePost from './usePost';
import $ from 'jquery';

//활동 내역 조회
const ReadActivityHistory=(props)=> {
    
    const [tableData, setTableData] = useState();
    const [modalCreateReport, setModalCreateReport] = useState(false); 
    const [modalCreateQR, setModalCreateQR] = useState(false); 
    const [modalExportExcel, setModalExportExcel] = useState(false); 

    const toggleCreateReport = () => setModalCreateReport(!modalCreateReport);
    const toggleCreateQR = () => setModalCreateQR(!modalCreateQR);
    const toggleExportExcel = () => setModalExportExcel(!modalExportExcel);
    /* const [historyArrays, setHistoryArrays] = useState([]); */
     /* setState가 비동기적이라 setHistoryArrays 한 이후 그것을 tableData로 출력할 시 받아온
     값이아닌 기존 값이 출력되어 빈칸나옴. 그래서 state안쓰고 변수로 선언해서씀 */
    let historyArrays = [];
    const [modalInput,setModalInput] = useState("default");
    function setHistoryArrays(newArrays){ historyArrays = newArrays; }
    const renderInput = (historyArray, index)=>{
        
        var statusValue="default";
        var ButtonValue="default";
        var ButtonColor="secondary";

        switch(historyArray.status){
            case '0':
                statusValue="보고서미작성"
                ButtonValue="작성";
                break;
            case '1':
                statusValue="미승인";
                ButtonValue="조회";
                ButtonColor="primary";
                break;
            case '2':
                statusValue="승인완료";
                ButtonValue="조회";
                ButtonColor="primary";
                break;
            case '3':
                statusValue="반려";
                ButtonValue="조회";
                ButtonColor="danger";
                break;
            case '-1':
                statusValue="비활성화";
                ButtonValue="조회불가";
                ButtonColor="danger";
                break;
        }

        
        
        return(
            <tr key={index}>
                <th>{historyArray.activityHistoryCode}</th>
                <td>{historyArray.date}</td>
                <td>{historyArray.startTime}</td>
                <td>{historyArray.endTime}</td>
                <td>{historyArray.report}<Button className="reportButton" color={ButtonColor} >{ButtonValue}</Button></td>
                <td>{statusValue}</td>
            </tr>
        )
    }
    /* 보고서 버튼 값 출력 */

    /* const pushToArray = () => {
        setHistoryArrays(historyArrays=>[...historyArrays,{
            "date" : "2020-10-10",
            "startTime" : "15:00",
            "endTime": "19:00",
            "report" : "미작성",
            "status" : "신규1"
        }]);
    } */

    function getActivityHistory (form) {
        axios.post('http://localhost:8080/mentor/activityHistory/read',form).then((response)=>{
        setHistoryArrays(response.data); 
        setTableData(historyArrays.map(renderInput))
        }
            );
    }

   /*  useEffect(()=>{
        
      },[]
    ) */
    
    // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
    $(function() {
    $(".reportButton").on("click",function(){
        
        var str = "";
        var tdArr = new Array();
        var reportButton = $(this);

        var tr = reportButton.parent().parent();
        var td = tr.children();
        console.log("row데이터 : "+td.eq(0).text());
        setModalInput(td.eq(0).text());
        toggleCreateReport();
    }

    )
})
    /* function testFunction(){
        console.log("test");
        var reportButton = $(this);
        var tr = reportButton.parent().parent();
        var td = tr.children();
        console.log("row데이터 : "+tr.text());
         

    } */

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
                        <Button className="float-right" color="primary" onClick={()=>{
                            /* axios.데이터요청->inputs에 넣음 */
                             var form=new FormData;
                             form.append("id",localStorage.getItem('id'));
                             getActivityHistory(form);
                            console.log(historyArrays+"inButton");
                            setTableData(historyArrays.map(renderInput)) ;
                            }}>조회</Button>
                        {/* <Button className="float-right" color="primary" onClick={()=>setMessage(response.data.message)}>test<p>{message}</p></Button> */}
                        <Button color="primary" onClick={()=>setModalExportExcel(true)}>내보내기</Button>
                        <Button className="float-left" color="primary" onClick={()=>setModalCreateQR(true)}>QR 생성</Button>

                    </Form>
                </Col>
                <br></br>

                {/* 활동 내역 테이블 */}
                <Col>
                    <Table>
                        {/* 문자 안끊기게 */}
                        <thead  className="text-nowrap">
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
                            {/* 내용부분. 서버에서 정보 받아와서 반복문 사용!*/}
                            {tableData}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal isOpen={modalCreateReport}>
                <ModalHeader toggle={toggleCreateReport}>활동보고서</ModalHeader>
                <CreateReport activityHistoryCode={modalInput}></CreateReport>

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