import React,{useEffect, useState} from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Table } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import DeleteLinkAgencyManager from './DeleteLinkAgencyManager';

//소속 연계기관 담당자 조회.
function ReadLinkAgencyManager() {

    const [linkAgencyCode, setLinkAgencyCode] = useState();
    const [linkAgencyList, setLinkAgencyList] = useState();
    const [linkAgencyManagerList,setLinkAgencyManagerList] = useState();
    const [option, setOption] = useState(0);

    let linkAgencyArrays = [];
    let linkAgencyManagerArrays = [];

    function renderLinkAgencyList(LinkAgencyArray, index){
        return(
            <option key={index} value={LinkAgencyArray.linkAgencyCode}>{ LinkAgencyArray.linkAgencyName }</option>
        )
    }

    function renderLinkAgencyManagerList(linkAgencyManagerArray, index){
        return(
            <tr key={index}>
            <th>{linkAgencyManagerArray.id}</th>
            <td>{linkAgencyManagerArray.name}</td>
            <td>{linkAgencyManagerArray.age}</td>
            <td>{linkAgencyManagerArray.gender}</td>
            <td>{linkAgencyManagerArray.address}</td>
            <td>{linkAgencyManagerArray.phoneNumber}</td>
            <td>{linkAgencyManagerArray.linkAgencyName}</td>
            <td><Button className="deleteLinkAgencyManagerButton" color="danger" >삭제</Button></td>
            </tr>
        )
    }

    const handleLinkAgencyCodeOnChange = (e) =>{
        e.preventDefault();
        setLinkAgencyCode(e.target.value);
        if(e.target.value === "선택안함"){
            setOption(0);
        }else{
            setOption(1);
        }
    }

    function readLinkAgencyManagerList(){
        var form = new FormData();
        console.log(localStorage.getItem("userToken"));
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("option",option);
        form.append("linkAgencyCode", linkAgencyCode);
        axios.post("/user/readLinkAgencyManagerList/regionManager",form).then((response)=>{
            linkAgencyManagerArrays=response.data;
            setLinkAgencyManagerList(linkAgencyManagerArrays.map(renderLinkAgencyManagerList));
        });
    }

    const readLinkAgencyList=()=>{
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        axios.post("/user/readLinkAgencyList/regionManager",form).then((response)=>{
            linkAgencyArrays = response.data;
            setLinkAgencyList(linkAgencyArrays.map(renderLinkAgencyList));
        });
    }

    //모달
    const [linkAgencyManagerInfo, setLinkAgencyManagerInfo] = useState();
    const [deleteLinkAgencyManagerModal, setDeleteLinkAgencyManagerModal] = useState(false);

    const toggleDeleteLinkAgencyModal = () =>{
        setDeleteLinkAgencyManagerModal(!deleteLinkAgencyManagerModal);
    }

      // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
      $(function () {
        $(".deleteLinkAgencyManagerButton").off("click")
        // $(document).ready 에 해당하는부분. 업데이트되며 문법이 바뀐듯하다

        $(".deleteLinkAgencyManagerButton").on("click", function () {
            var button = $(this);
            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setLinkAgencyManagerInfo(
               tdArr
            )
            toggleDeleteLinkAgencyModal();
        })
    })


    useEffect(()=>{
        readLinkAgencyList();
    },[])

    return(
        <div className="container">

            <Form>
               <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>지역본부</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={handleLinkAgencyCodeOnChange}>
                            <option>선택안함</option>
                            {linkAgencyList}
                        </Input>
                        </InputGroup>
            </Form>

            연계기관 관리자
            <Table>
                
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>성별</th>
                        <th>주소</th>
                        <th>전화번호</th>
                        <th>연계기관명</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {linkAgencyManagerList}
                </tbody>
            </Table>
            <Button onClick={readLinkAgencyManagerList}>조회</Button>

            <Modal isOpen={deleteLinkAgencyManagerModal}>
                <ModalHeader toggle={toggleDeleteLinkAgencyModal}>연계기관 담당자 삭제</ModalHeader>
                <DeleteLinkAgencyManager linkAgencyManagerInfo={linkAgencyManagerInfo} ></DeleteLinkAgencyManager>
            </Modal>
        </div>
    )
}
export default ReadLinkAgencyManager;