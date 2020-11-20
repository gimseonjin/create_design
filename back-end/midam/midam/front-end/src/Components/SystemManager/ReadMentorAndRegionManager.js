import React,{useEffect, useState} from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Table } from 'reactstrap';
import axios from 'axios';
import ChangeAuthority from './ChangeAuthority';
import $ from 'jquery';

function ReadMentorAndRegionManager(){
    const [regionList, setRegionList] = useState();
    const [regionCode, setRegionCode] = useState();
    const [mentorList, setMentorList] = useState();
    const [regionManagerList,setRegionManagerList] = useState();

    //모달 오픈
    const [changeAuthorityModal, setChangeAuthorityModal] = useState();
    const [userInfoInRow, setUserInfoInRow] = useState();
    const toggleChangeAuthorityModal = () => {
        setChangeAuthorityModal(!changeAuthorityModal);
    }

    let regionArrays = [];
    let mentorArrays = [];
    let regionManagerArrays = [];

    function renderRegionList(regionArray, index){
        return(
            <option key={index} value={regionArray.regionCode}>{ regionArray.regionName }</option>
        )
    }

    function renderMentorAndRegionManagerList(mentorArray, index){
        return(
            <tr key={index}>
            <th>{mentorArray.id}</th>
            <td>{mentorArray.name}</td>
            <td>{mentorArray.gender}</td>
            <td>{mentorArray.age}</td>
            <td>{mentorArray.address}</td>
            <td>{mentorArray.phoneNumber}</td>
            <td>{mentorArray.volunteerId}</td>
            <td><Button className="changeAuthorityButton" color="primary" onClick={toggleChangeAuthorityModal}>권한 수정</Button></td>
            <td className="display">{mentorArray.authority}</td>
            </tr>
        )
    }

    const handleRegionOnChange = (e) =>{
        e.preventDefault();
        setRegionCode(e.target.value);
    }

    function readMentorAndRegionManagerList(){
        var form = new FormData();
        console.log(localStorage.getItem("userToken"));
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("regionCode", regionCode)
        axios.post("/user/readMentorAndRegionManagerList",form).then((response)=>{
            console.log(response.data);
            mentorArrays=response.data[0];
            regionManagerArrays=response.data[1];
            setMentorList(mentorArrays.map(renderMentorAndRegionManagerList));
            setRegionManagerList(regionManagerArrays.map(renderMentorAndRegionManagerList));
        });
    }

    const readRegionList=()=>{
        axios.post("/signIn/readRegionList").then((response)=>{
            regionArrays = response.data;
            setRegionList(regionArrays.map(renderRegionList));
        });
    }

  // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
    $(function () {
        $(".changeAuthorityButton").off("click")
        // $(document).ready 에 해당하는부분. 업데이트되며 문법이 바뀐듯하다

        $(".changeAuthorityButton").on("click", function () {

            var button = $(this);

            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setUserInfoInRow(
               tdArr
            )
            toggleChangeAuthorityModal();
        })
    })

    useEffect(()=>{
        readRegionList();
    },[])

    return(
        <div className="container">

            <Form>
               <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>지역본부</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={handleRegionOnChange}>
                            <option>선택안함</option>
                            {regionList}
                        </Input>
                        </InputGroup>
            </Form>
            멘토
            <Table>
                
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>성별</th>
                        <th>나이</th>
                        <th>주소</th>
                        <th>전화번호</th>
                        <th>1365ID</th>
                        <th>권한</th>
                    </tr>
                </thead>
                <tbody>
                    {mentorList}
                </tbody>
            </Table>

            관리자
            <Table>
                
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>성별</th>
                        <th>나이</th>
                        <th>주소</th>
                        <th>전화번호</th>
                        <th>1365ID</th>
                        <th>권한</th>
                    </tr>
                </thead>
                <tbody>
                    {regionManagerList}
                </tbody>
            </Table>
            <Button color ="primary" onClick={readMentorAndRegionManagerList}>조회</Button>

            <Modal isOpen={changeAuthorityModal}>
                <ModalHeader toggle={toggleChangeAuthorityModal}>권한 수정</ModalHeader>
                <ChangeAuthority userInfo={userInfoInRow}></ChangeAuthority>
            </Modal>
            
        </div>
    )
}

export default ReadMentorAndRegionManager;