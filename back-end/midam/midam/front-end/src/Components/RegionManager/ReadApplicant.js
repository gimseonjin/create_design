import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalHeader, Table } from 'reactstrap';
import $ from 'jquery';
import ApproveApplicant from './ApproveApplicant';
import ApproveMentorApplicant from './ApproveMentorApplicant';

//회원가입 신청자 조회.
function ReadApplicant(){
    const [mentorApplicantList, setMentorApplicantList] = useState();
    const [linkAgencyApplicantList, setLinkAgencyApplicantList] = useState();
    const [modalApproveApplicant, setModalApproveApplicant] = useState(false);
    const [modalApproveMentor, setModalApproveMentor] = useState(false);
    const [applicantId, setApplicantId] = useState('');
    const [applicantInfo, setApplicantInfo] = useState([]);

    const toggleModalApproveApplicant = () => {
        setModalApproveApplicant(!modalApproveApplicant);
    }

    const toggleModalApproveMentor = () => {
        setModalApproveMentor(!modalApproveMentor);
    }

    function renderMentorApplicantList(mentorApplicantArray, index){
        var buttonValue = "승인";
        return(
            <tr key={index}>
            <td>{mentorApplicantArray.id}</td>
            <td>{mentorApplicantArray.name}</td>
            <td>{mentorApplicantArray.gender}</td>
            <td>{mentorApplicantArray.age}</td>
            <td>{mentorApplicantArray.address}</td>
            <td>{mentorApplicantArray.phoneNumber}</td>
            <td>{mentorApplicantArray.volunteerId}</td>
            <td><Button className="approveMentorApplicantButton" color = "primary">{buttonValue}</Button></td>
        </tr>
        )
    }
    function renderLinkAgencyApplicantList(linkAgencyApplicantArray, index){
        var buttonValue = "승인";
        var linkAgencyStatus = "";
        
        if(linkAgencyApplicantArray.linkAgencyStatus === 1){
            linkAgencyStatus = "승인됨";
        }else{
            linkAgencyStatus = "신규신청";
        }
        return(
            <tr key={index}>
            <td>{linkAgencyApplicantArray.id}</td>
            <td>{linkAgencyApplicantArray.name}</td>
            <td>{linkAgencyApplicantArray.gender}</td>
            <td>{linkAgencyApplicantArray.age}</td>
            <td>{linkAgencyApplicantArray.address}</td>
            <td>{linkAgencyApplicantArray.phoneNumber}</td>
            <td>{linkAgencyApplicantArray.linkAgencyName}</td>
            <td>{linkAgencyStatus}</td>
            <td><Button className="approveLinkAgencyApplicantButton" color="primary">{buttonValue}</Button></td>
            </tr>
        )
    }
    let mentorApplicantArrays = [];
    let linkAgencyApplicantArrays = [];
    function readApplicantList(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        axios.post("/signIn/readApplicant/regionManager",form).then((response)=>{
            mentorApplicantArrays=response.data[0];
            linkAgencyApplicantArrays=response.data[1];
            setMentorApplicantList(mentorApplicantArrays.map(renderMentorApplicantList));
            setLinkAgencyApplicantList(linkAgencyApplicantArrays.map(renderLinkAgencyApplicantList));
        })
    }

    //버튼 누르면 코드를 받아서 modal 열도록 onclick 액션 부여
    $(function() { 
        $(".approveLinkAgencyApplicantButton").off("click")
        $(".approveMentorApplicantButton").off("click")

        $(".approveLinkAgencyApplicantButton").on("click",function(){

            var Button = $(this);

            var tr = Button.parent().parent();
            var td = tr.children();
            setApplicantId(td.eq(0).text());
            toggleModalApproveApplicant();
        }
        )        

        $(".approveMentorApplicantButton").on("click",function(){

            var button = $(this);

            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setApplicantInfo(
               tdArr
            )
            toggleModalApproveMentor();
        }
        )       
    }
    )




    useEffect(()=>{
        readApplicantList();
    },[])


    return (
        <div className="container">
           멘토
             <Table>
                        {/* 문자 안끊기게 */}
                        <thead  className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                                <th>ID</th>
                                <th>이름</th>
                                <th>성별</th>
                                <th>나이</th>
                                <th>주소</th>
                                <th>전화번호</th>
                                <th>1365Id</th>
                                <th>승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 내용부분. 서버에서 정보 받아와서 반복문 사용!*/}
                            {mentorApplicantList}
                        </tbody>
                    </Table>

                    연계기관 담당자
             <Table>
                        {/* 문자 안끊기게 */}
                        <thead  className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                                <th>ID</th>
                                <th>이름</th>
                                <th>성별</th>
                                <th>나이</th>
                                <th>주소</th>
                                <th>전화번호</th>
                                <th>연계기관</th>
                                <th>연계기관 상태</th>
                                <th>승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 내용부분. 서버에서 정보 받아와서 반복문 사용!*/}
                            {linkAgencyApplicantList}
                        </tbody>
                    </Table>

            <Modal isOpen={modalApproveApplicant}>
                <ModalHeader toggle={toggleModalApproveApplicant}>연계기관 담당자 가입 승인</ModalHeader>
                <ApproveApplicant applicantId = {applicantId}></ApproveApplicant>
            </Modal>

            <Modal isOpen={modalApproveMentor}>
                <ModalHeader toggle={toggleModalApproveMentor}>멘토 가입 승인</ModalHeader>
                <ApproveMentorApplicant applicantInfo={applicantInfo}></ApproveMentorApplicant>
            </Modal>
            
        </div>
    )
}
export default ReadApplicant;