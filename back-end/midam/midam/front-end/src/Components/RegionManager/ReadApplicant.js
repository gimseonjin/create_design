import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';

//회원가입 신청자 조회.
function ReadApplicant(){
    const [mentorApplicantList, setMentorApplicantList] = useState();
    const [linkAgencyApplicantList, setLinkAgencyApplicantList] = useState();

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
            <td><Button >{buttonValue}</Button></td>
        </tr>
        )
    }
    function renderLinkAgencyApplicantList(linkAgencyApplicantArray, index){
        var buttonValue = "상세조회";
        return(
            <tr key={index}>
            <td>{linkAgencyApplicantArray.id}</td>
            <td>{linkAgencyApplicantArray.name}</td>
            <td>{linkAgencyApplicantArray.gender}</td>
            <td>{linkAgencyApplicantArray.age}</td>
            <td>{linkAgencyApplicantArray.address}</td>
            <td>{linkAgencyApplicantArray.phoneNumber}</td>
            <td><Button color="primary">{buttonValue}</Button></td>
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
            setMentorApplicantList(mentorApplicantArrays.map(renderMentorApplicantList));
        })
    }

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
                                <th>승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 내용부분. 서버에서 정보 받아와서 반복문 사용!*/}
                    
                        </tbody>
                    </Table>
            
        </div>
    )
}
export default ReadApplicant;