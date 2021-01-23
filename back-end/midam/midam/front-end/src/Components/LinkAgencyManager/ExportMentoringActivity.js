import React, {useEffect, useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
    Button,
    CustomInput,
    Col,
    Table,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader
} from 'reactstrap';
import axios from 'axios';
import '../Css/small.css';
import '../Css/test.css';



//활동보고서 작성 활동 보고서 조회 페이지 필요할지. 여기서 함께할지 논의.
const ExportMentoringActivity = (props) =>{
    const [linkAgencyCode, setLinkAgencyCode] = useState(
        props.linkAgency
    );
    const [startDate, setstartDate] = useState(
        props.startDate
    );
    const [endDate, setEndDate] = useState(
        props.endDate
    );
    const [activityHistoryList, setActivityHistoryList] = useState();
    let historyArrays = [];
    function setHistoryArrays(newArrays){ historyArrays = newArrays; }
    const renderHistoryArrays = (historyArray, index)=>{

    
       
        return(
            <tr key={index} >
                <th>{historyArray.volunteerId}</th>
                <td className="text-nowrap">{historyArray.name}</td>
                <td className="text-nowrap">{historyArray.phoneNumber}</td>
                <td>{historyArray.activityName}</td>               
                <td>{historyArray.startTime}</td>
                <td>{historyArray.endTime}</td>
            
            </tr>
        )
    }
    

    function readActivityHistory(form){
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("linkAgencyCode", linkAgencyCode);
        form.append("startDate", startDate);
        form.append("endDate", endDate);
        axios.post("/activityHistory/readHistory/excel",form).then((response)=>{
            
            historyArrays =response.data;
            setActivityHistoryList(historyArrays.map(renderHistoryArrays));
     
           
         
        });
    }

    useEffect(()=>{
        var form = new FormData;
        readActivityHistory(form);
      },[]
    )
    

    return (
        <div className="container" >
          
           
            <Col>
                    <Table id="table-to-xls">
                        {/* 문자 안끊기게 */}
                        <thead  className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                                <th>ID</th>
                                <th>이름</th>
                                <th>연락처</th>
                                <th>활동명</th>
                                <th>출근시각</th>
                                <th>퇴근시각</th>
                            
                            </tr>
                        </thead>
                        <tbody >
                         
                            {activityHistoryList}
                        </tbody>
                    </Table>
            </Col>
            

            <ReactHTMLTableToExcel
         download-table-xls-button
        id="test-table-xls-button"
        className="rr"
        table="table-to-xls"
        filename="활동 내역 EXCEL"
        sheet="활동내역"        
        buttonText="엑셀 내보내기"/>
        </div>

        
    )
}
export default ExportMentoringActivity;