import React,{useEffect, useState} from 'react';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Row, Table } from 'reactstrap';
import CreateReport from './CreateReport';
import CreateQR from './CreateQR';
import ExportMentoringActivity from '../LinkAgencyManager/ExportMentoringActivity';
import axios from 'axios';
import $ from 'jquery';
import ReadReportMentor from './ReadReportMentor';

//활동 내역 조회
const ReadActivityHistoryMentor=(props)=> {
    
    const [activityHistoryList, setActivityHistoryList] = useState();
    const [linkAgencyList, setLinkAgencyList] = useState();
    const [activityList, setActivityList] = useState();

    const [modalCreateReport, setModalCreateReport] = useState(false); 
    const [modalReadReport, setModalReadReport] = useState(false);
    const [modalCreateQR, setModalCreateQR] = useState(false); 
    const [modalExportExcel, setModalExportExcel] = useState(false); 
    
    //*검색 옵션들. option 0:
    const [option, setOption] = useState(0);
    const [linkAgency, setLinkAgency] = useState("선택안함");
    const [activity, setActivity] = useState("선택안함");
    const [startDate, setStartDate] = useState(setDefualtStartdate());
    const [endDate, setEndDate] = useState(setDefualtEnddate());

    const handleLinkAgencyOnChange = (e) => { // 옵션- 연계기관 선택
        e.preventDefault();
        setLinkAgency(e.target.value);
        //선택안함 이면 옵션 0으로, 다른 옵션도 선택안함으로
        if(e.target.value === "선택안함")
        {
            // setActivity("선택안함");
            setActivityList("선택안함");
            setOption(0);
        }else{
            //선택시 getActivityList로 해당 연계기관의 활동 받아옴
            readActivityList(e.target.value);
            setOption(1);
        }
    }

    const handleActivityOnChange = (e) => {
        e.preventDefault();
        setActivity(e.target.value);
        if(e.target.value === "선택안함")
        {
            setOption(1);
        }else{
            setOption(2);
        }
    }

    const handleStartDateOnChange = (e) => {
        e.preventDefault();
        setStartDate(e.target.value);
    }
    const handleEndDateOnChange = (e) => {
        e.preventDefault();
        setEndDate(e.target.value);
    }
    

    const toggleReadReport = () => setModalReadReport(!modalReadReport);
    const toggleCreateReport = () => setModalCreateReport(!modalCreateReport);
    const toggleCreateQR = () => setModalCreateQR(!modalCreateQR);
    const toggleExportExcel = () => setModalExportExcel(!modalExportExcel);
    /* const [historyArrays, setHistoryArrays] = useState([]); */
     /* setState가 비동기적이라 setHistoryArrays 한 이후 그것을 tableData로 출력할 시 받아온
     값이아닌 기존 값이 출력되어 빈칸나옴. 그래서 state안쓰고 변수로 선언해서씀 */
   
     function setDefualtEnddate(){ //한달전~오늘날짜까지로 input date 값 설정
        let today = new Date();
        today.setDate(today.getDate()+1);
        let date = ("0"+(today.getDate())).slice(-2);
        let month = ("0"+(today.getMonth()+1)).slice(-2);
        let year = today.getFullYear();
        return (year+"-"+month+"-"+date);
     }
     function setDefualtStartdate(){ //한달전~오늘날짜까지로 input date 값 설정
        let today = new Date();
        today.setMonth(today.getMonth()-1);
        let date = ("0"+(today.getDate())).slice(-2);
        let month = ("0"+(today.getMonth()+1)).slice(-2);
        let year = today.getFullYear();
        return (year+"-"+month+"-"+date);
     }

   
    let historyArrays = [];
    let linkAgencyArrays = [];
    let activityArrays = [];
    const [modalInput,setModalInput] = useState("default");
    function setHistoryArrays(newArrays){ historyArrays = newArrays; }
    const renderHistoryArrays = (historyArray, index)=>{
        var statusValue="default";
        var ButtonValue="default";
        var ButtonColor="secondary";
        var buttonClassName = "";

        switch(historyArray.status){
            case '0':
                statusValue="활동미완료";
                ButtonValue="작성";
                break;
            case '1':
                statusValue="활동완료/보고서미작성";
                ButtonValue="작성";
                buttonClassName = "createReportButton";
                break;
            case '2':
                statusValue="보고서작성완료";
                ButtonValue="조회";
                ButtonColor="primary";
                buttonClassName="readReportButton";
                break;
            case '3':
                statusValue="승인완료";
                ButtonValue="조회";
                ButtonColor="success";
                buttonClassName="readReportReadOnlyButton";
                break;
            case '4':
                statusValue="반려";
                ButtonValue="조회";
                ButtonColor="danger";
                buttonClassName="readReportButton";
                break;
            case '-1':
                statusValue="비활성화";
                ButtonValue="조회불가";
                ButtonColor="danger";
                buttonClassName="disabledButton";
                break;
        }
        return(
            <tr key={index}>
                <th>{historyArray.activityHistoryCode}</th>
                <td>{historyArray.startTime}</td>
                <td>{historyArray.endTime}</td>
                <td><Button className={buttonClassName} color={ButtonColor} >{ButtonValue}</Button></td>
                <td>{historyArray.date}</td>
                <td>{statusValue}</td>
            </tr>
        )
    }
    function renderLinkAgencyList(linkAgencyArray, index){
        return(
         <option key={index} value={linkAgencyArray.linkAgencyCode}>{ linkAgencyArray.linkAgencyName }</option>
        )
    }
    function renderActivityList(activityArray, index){
        return(
         <option key={index} value={activityArray.activityCode}>{ activityArray.activityName }</option>
        )
    }
    

   // 아이디만으로 그냥 조회해오기
    function readActivityHistory () {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        form.append("option", option);
        form.append("startDate", startDate);
        form.append("endDate", endDate);
        axios.post('/activityHistory/readHistory/mentor',form).then((response)=>{

                historyArrays = response.data[0];
                linkAgencyArrays = response.data[1];
              setActivityHistoryList(historyArrays.map(renderHistoryArrays));
            setLinkAgencyList(linkAgencyArrays.map(renderLinkAgencyList));
        }
            );
    }

    // 옵션을 걸어서 조회하기.
    function readActivityHistoryWithOption () {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        form.append("option", option);
        form.append("linkAgency", linkAgency);
        form.append("activity", activity);
        form.append("startDate", startDate);
        form.append("endDate", endDate);

        axios.post('/activityHistory/readHistory/mentor',form).then((response)=>{
  
        historyArrays = response.data[0];
        setActivityHistoryList(historyArrays.map(renderHistoryArrays));
        
        }
            );
    }


    // 연계기관 리스트 선택 시 해당 연계기관의 활동 받아오기
    function readActivityList(linkAgencyCode){
        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        form.append("linkAgencyCode", linkAgencyCode);
        axios.post('/activityHistory/readActivityList/mentor', form).then((response)=>{
            activityArrays=response.data;
            setActivityList(activityArrays.map(renderActivityList));
        });
    }


    useEffect(()=>{
        readActivityHistory();
      },[]
    )
    
    // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
    $(function() { 
        $(".readReportButton").off("click")
            // $(document).ready 에 해당하는부분. 업데이트되며 문법이 바뀐듯하다
        $(".createReportButton").on("click",function(){

            var reportButton = $(this);

            var tr = reportButton.parent().parent();
            var td = tr.children();
            setModalInput(td.eq(0).text());
            toggleCreateReport();
        }
        )
        
        $(".readReportButton").on("click",function(){

            var reportButton = $(this);


            var tr = reportButton.parent().parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleReadReport();
        }
        )

        $(".readReportReadOnlyButton").on("click",function(){

            var reportButton = $(this);

            var tr = reportButton.parent().parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleReadReport();
        }
        )
    }
    )

   

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
                        <Input type="select" onChange={handleLinkAgencyOnChange}>
                            <option>선택안함</option>
                            {linkAgencyList}
                        </Input>
                        </InputGroup>

                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={handleActivityOnChange}>
                            <option>선택안함</option>
                            {activityList}
                        </Input>
                        </InputGroup>

                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>기간</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="startDate" value={startDate} onChange={handleStartDateOnChange}></Input>~
                        <Input type="date" name="endDate" value={endDate} onChange={handleEndDateOnChange}></Input>
                        </InputGroup>
                        <Button className="float-right" color="primary" onClick={()=>{
                            /* axios.데이터요청->inputs에 넣음 */
                            readActivityHistoryWithOption ();
                            }}>조회</Button>
                        {/* <Button className="float-right" color="primary" onClick={()=>setMessage(response.data.message)}>test<p>{message}</p></Button> */}
                       
                    </Form>
                </Col>
                {/* 활동 내역 테이블 */}
                <Col>
                    <Table>
                        {/* 문자 안끊기게 */}
                        <thead  className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                                <th>#</th>
                                <th>시작 시간</th>
                                <th>종료 시간</th>
                                <th>활동 보고서</th>
                                <th>보고서 작성일</th>
                                <th>승인 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 내용부분. 서버에서 정보 받아와서 반복문 사용!*/}
                            {activityHistoryList}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal isOpen={modalCreateReport}>
                <ModalHeader toggle={toggleCreateReport}>활동보고서 작성</ModalHeader>
                <CreateReport activityHistoryCode={modalInput}></CreateReport>
            </Modal>

            <Modal isOpen={modalReadReport}>
                <ModalHeader toggle={toggleReadReport}>활동보고서 조회</ModalHeader>
                <ReadReportMentor activityHistoryCode={modalInput}></ReadReportMentor>
            </Modal>

            <Modal isOpen={modalCreateQR}>
                <ModalHeader toggle={toggleCreateQR}>QR코드 생성</ModalHeader>
                <CreateQR></CreateQR>
            </Modal>

        </div>
    )
}
export default ReadActivityHistoryMentor;