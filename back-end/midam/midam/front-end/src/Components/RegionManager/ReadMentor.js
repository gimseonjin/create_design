import React,{useEffect, useState} from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Table } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import DeleteMentor from './DeleteMentor';

//소속 연계기관 담당자 조회.
function ReadMentor() {

    const [linkAgencyCode, setLinkAgencyCode] = useState();
    const [mentorList,setMentorList] = useState();

    let mentorArrays = [];

    function renderMentorList(mentorArray, index){
        return(
            <tr key={index}>
            <th>{mentorArray.id}</th>
            <td>{mentorArray.name}</td>
            <td>{mentorArray.age}</td>
            <td>{mentorArray.gender}</td>
            <td>{mentorArray.address}</td>
            <td>{mentorArray.phoneNumber}</td>
            <td>{mentorArray.volunteerId}</td>
            <td><Button className="deleteMentorButton" color="danger" >삭제</Button></td>
            </tr>
        )
    }

    const handleLinkAgencyCodeOnChange = (e) =>{
        e.preventDefault();
        setLinkAgencyCode(e.target.value);
    }

    function readMentorList(){
        var form = new FormData();
        console.log(localStorage.getItem("userToken"));
        form.append("userToken",localStorage.getItem("userToken"));
        axios.post("/user/readMentorList/regionManager",form).then((response)=>{
            mentorArrays=response.data;
            setMentorList(mentorArrays.map(renderMentorList));
        });
    }

    //모달
    const [mentorInfo, setMentorInfo] = useState();
    const [deleteMentorModal, setDeleteLinkAgencyModal] = useState(false);

    const toggleDeleteMentorModal = () =>{
        setDeleteLinkAgencyModal(!deleteMentorModal);
    }

      // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
      $(function () {
        $(".deleteMentorButton").off("click")
        // $(document).ready 에 해당하는부분. 업데이트되며 문법이 바뀐듯하다

        $(".deleteMentorButton").on("click", function () {
            var button = $(this);
            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setMentorInfo(
               tdArr
            )
            toggleDeleteMentorModal();
        })
    })


    useEffect(()=>{
        readMentorList();
    },[])

    return(
        <div className="container">

            멘토
            <Table>
                
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>성별</th>
                        <th>주소</th>
                        <th>전화번호</th>
                        <th>1365Id</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {mentorList}
                </tbody>
            </Table>
            <Button onClick={readMentorList}>조회</Button>

            <Modal isOpen={deleteMentorModal}>
                <ModalHeader toggle={toggleDeleteMentorModal}>멘토 삭제</ModalHeader>
                <DeleteMentor mentorInfo={mentorInfo} ></DeleteMentor>
            </Modal>
        </div>
    )
}
export default ReadMentor;