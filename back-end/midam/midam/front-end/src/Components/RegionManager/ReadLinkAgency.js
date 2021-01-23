import React,{useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, Table } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import DeleteLinkAgency from './DeleteLinkAgency';
import UpdateLinkAgency from './UpdateLinkAgency';
import CreateLinkAgency from './CreateLinkAgency';
import '../Css/test.css'

//소속 연계기관 조회.
function ReadLinkAgency() {

    const [linkAgencyList,setLinkAgencyList] = useState();

    let linkAgencyArrays = [];

    function renderLinkAgencyList(linkAgencyArray, index){
        return(
            <tr key={index}>
            <td className="display">{linkAgencyArray.linkAgencyCode}</td>
            <td>{linkAgencyArray.linkAgencyName}</td>
            <td>{linkAgencyArray.linkAgencyAddress}</td>
            <td>{linkAgencyArray.linkAgencyInfo}</td>
            <td><Button className="updateLinkAgencyButton" color="primary" >수정</Button></td>
            <td><Button className="deleteLinkAgencyButton" color="danger" >삭제</Button></td>
            </tr>
        )
    }


    function readLinkAgencyList(){
        var form = new FormData();
        console.log(localStorage.getItem("userToken"));
        form.append("userToken",localStorage.getItem("userToken"));
        axios.post("/linkAgency/readLinkAgencyList/regionManager",form).then((response)=>{
            linkAgencyArrays=response.data;
            setLinkAgencyList(linkAgencyArrays.map(renderLinkAgencyList));
        });
    }

    //모달
    const [linkAgencyInfo, setLinkAgencyInfo] = useState();
    const [updateLinkAgencyModal, setUpdateLinkAgencyModal] = useState(false);
    const [deleteLinkAgencyModal, setDeleteLinkAgencyModal] = useState(false);
    const [createLinkAgencyModal, setCreateLinkAgencyModal] = useState(false);

    const toggleCreateLinkAgencyModal = () =>{
        setCreateLinkAgencyModal(!createLinkAgencyModal);
    }
    const toggleDeleteLinkAgencyModal = () =>{
        setDeleteLinkAgencyModal(!deleteLinkAgencyModal);
    }

    const toggleUpdateLinkAgencyModal = () =>{
        setUpdateLinkAgencyModal(!updateLinkAgencyModal);
    }

      // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
      $(function () {
        $(".deleteLinkAgencyButton").off("click")
        $(".updateLinkAgencyButton").off("click")
        
        // $(document).ready 에 해당하는부분. 업데이트되며 문법이 바뀐듯하다

        $(".deleteLinkAgencyButton").on("click", function(){
            var button = $(this);
            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setLinkAgencyInfo(
               tdArr
            )
            toggleDeleteLinkAgencyModal();
        })

        $(".updateLinkAgencyButton").on("click", function(){
            var button = $(this);
            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setLinkAgencyInfo(
               tdArr
            )
            toggleUpdateLinkAgencyModal();
        })
    })


    useEffect(()=>{
        readLinkAgencyList();
    },[])

    return(
        <div className="container">

            연계기관
            <Button onClick={toggleCreateLinkAgencyModal} color="primary" className="float-right">등록</Button>
            <Button onClick={readLinkAgencyList} className="float-right">조회</Button>
            <Table>
                <thead>
                    <tr className="text-nowrap">
                        <th>연계기관명</th>
                        <th>연계기관 주소</th>
                        <th>연계기관 정보</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {linkAgencyList}
                </tbody>
            </Table>
          

            <Modal isOpen={deleteLinkAgencyModal}>
                <ModalHeader toggle={toggleDeleteLinkAgencyModal}>연계기관 삭제</ModalHeader>
                <DeleteLinkAgency linkAgencyInfo={linkAgencyInfo} ></DeleteLinkAgency>
            </Modal>

            <Modal className="modal-lg" isOpen={updateLinkAgencyModal}>
                <ModalHeader toggle={toggleUpdateLinkAgencyModal}>연계기관 수정</ModalHeader>
                <UpdateLinkAgency linkAgencyInfo={linkAgencyInfo} ></UpdateLinkAgency>
            </Modal>

            <Modal className="modal-lg" isOpen={createLinkAgencyModal}>
                <ModalHeader toggle={toggleCreateLinkAgencyModal}>연계기관 등록</ModalHeader>
                <CreateLinkAgency></CreateLinkAgency>
            </Modal>

        </div>
    )
}
export default ReadLinkAgency;