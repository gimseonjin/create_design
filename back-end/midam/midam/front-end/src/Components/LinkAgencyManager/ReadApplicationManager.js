import React, {useEffect, useState} from 'react';

import '../Css/test.css';
import {Button, Col, Row, Table, Modal, ModalHeader} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import ReadApplicationInfo from './ReadApplicationInfo';
import ReadRecruitmentInfo from '../Shared/ReadRecruitmentInfo';

const ReadApplicationManager = (props) => {
    const [modalInputCode, setModalInputCode] = useState("default");
    const [modalInputId, setModalInputId] = useState("default");
    const [tableData, setTableData] = useState();
    const [modalReadApplicationInfo, setModalReadApplicationInfo] = useState(false);
    const toggleReadApplicationInfo = () => setModalReadApplicationInfo(!modalReadApplicationInfo);
    const [modalReadRecruitmentInfo, setModalReadRecruitmentInfo] = useState(false);    
    const toggleReadRecruitmentInfo = () => setModalReadRecruitmentInfo(!modalReadRecruitmentInfo);

    let applicationArrays = [];

    function setApplicationArrays(newArrays) {
        applicationArrays = newArrays;
    }
    const renderInput = (applicationArray, index) => {
        var statusValue = "default";
        var ButtonColor = "secondary";
    
        var genderValue = "none";

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

        switch (applicationArray.gender) {
            
            case 'F':
                genderValue = "여성";           
                break;           
            
            case 'M':
                genderValue = "남성";
          
                
                break;
            
        }
        return (
            <tr key={index}>
                <td >{applicationArray.id}</td>
                <td className="display">{applicationArray.mentorRecruitmentCode}</td>
                <td className="readRecruitmentInfo">{applicationArray.activityName}</td>            
                <td >{applicationArray.name}</td>
                <td >{applicationArray.age}</td> 
                <td >{genderValue}</td>                 
                <td >{applicationArray.applicationDate}</td>
                <td><Button className="readApplicationInfo" color={ButtonColor}>{statusValue}</Button></td>
            </tr>
        )
    }

    $(function () {
        $(".readApplicationInfo").off("click")

        $(".readApplicationInfo").on("click", function () {

            var applicationButton = $(this);

            var tr = applicationButton.parent().parent();
            var td = tr.children();
           
            setModalInputId(td.eq(0).text());
            setModalInputCode(td.eq(1).text());
            toggleReadApplicationInfo();
        })

        $(".readRecruitmentInfo").off("click")

        $(".readRecruitmentInfo").on("click", function () {

            var recruitmentButton = $(this);

            var tr = recruitmentButton.parent();
            var td = tr.children();
            console.log("row데이터 : " + td.eq(1).text());
            setModalInputCode(td.eq(1).text());
            toggleReadRecruitmentInfo();
        })

       
       
    })
    function getApplicationHistory(form) {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));

        axios
            .post('http://localhost:8080/activity/readApplication/manager', form)
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
                                <th>아이디</th>
                                <th>신청 활동 명</th>
                                <th>이름</th>
                                <th>나이</th>
                                <th>성별</th>
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
            <Modal isOpen={modalReadApplicationInfo}>
                <ModalHeader toggle={toggleReadApplicationInfo}>멘토링 신청자 상세조회</ModalHeader>
                <ReadApplicationInfo id={modalInputId} mentorRecruitmentCode={modalInputCode}></ReadApplicationInfo>
                
            </Modal>
            <Modal isOpen={modalReadRecruitmentInfo}>
                <ModalHeader toggle={toggleReadRecruitmentInfo}>멘토링 모집 상세조회</ModalHeader>
                <ReadRecruitmentInfo mentorRecruitmentCode={modalInputCode}></ReadRecruitmentInfo>
 


                
            </Modal>
        </div>
    )
}
export default ReadApplicationManager;
