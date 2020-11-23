import React,{useEffect, useState} from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Table } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import DeleteRegion from './DeleteRegion';
import UpdateRegion from './UpdateRegion';
import CreateRegion from './CreateRegion';
import '../Css/test.css'

//소속 연계기관 조회.
function ReadRegion(){

    const [regionList,setRegionList] = useState();

    let regionArrays = [];

    function renderRegionList(regionArray, index){
        return(
            <tr key={index}>
                <td className="display">{regionArray.regionCode}</td>
                <td>{regionArray.regionName}</td>
                <td>{regionArray.regionAddress}</td>
                <td><Button className="updateRegionButton" color="primary" >수정</Button></td>
                <td><Button className="deleteRegionButton" color="danger" >삭제</Button></td>
            </tr>
        )
    }


    function readRegionList(){
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        axios.post("/region/readRegionList/systemManager",form).then((response)=>{
            regionArrays=response.data;
            setRegionList(regionArrays.map(renderRegionList));
        });
    }

    //모달
    const [regionInfo, setRegionInfo] = useState();
    const [updateRegionModal, setUpdateRegionModal] = useState(false);
    const [deleteRegionModal, setDeleteRegionModal] = useState(false);
    const [createRegionModal, setCreateRegionModal] = useState(false);

    const toggleDeleteRegionModal = () =>{
        setDeleteRegionModal(!deleteRegionModal);
    }

    const toggleUpdateRegionModal = () =>{
        setUpdateRegionModal(!updateRegionModal);
    }

    const toggleCreateRegionModal = () =>{
        setCreateRegionModal(!createRegionModal);
    }

      // jquery 사용. 버튼 클릭시 해당 Row 값을 가져오기
      $(function () {
        $(".deleteRegionButton").off("click")
        $(".updateRegionButton").off("click")
        
        // $(document).ready 에 해당하는부분. 업데이트되며 문법이 바뀐듯하다

        $(".deleteRegionButton").on("click", function(){
            var button = $(this);
            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setRegionInfo(
               tdArr
            )
            toggleDeleteRegionModal();
        })

        $(".updateRegionButton").on("click", function(){
            var button = $(this);
            var tr = button
                .parent()
                .parent();
            var td = tr.children();
            var tdArr=[];
            td.each(function(i){
                tdArr.push(td.eq(i).text())
            })
            setRegionInfo(
               tdArr
            )
            toggleUpdateRegionModal();
        })
    })


    useEffect(()=>{
        readRegionList();
    },[])

    return(
        <div className="container pt-5">

            지역본부
            <Button color="primary" className="float-right" onClick={()=>toggleCreateRegionModal()}>등록</Button>
            <Table>
                <thead>
                    <tr className="text-nowrap">
                        <th>지역본부 명</th>
                        <th>지역본부 주소</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {regionList}
                </tbody>
            </Table>


            <Modal isOpen={deleteRegionModal}>
                <ModalHeader toggle={toggleDeleteRegionModal}>연계기관 삭제</ModalHeader>
                <DeleteRegion regionInfo={regionInfo} toggle={toggleDeleteRegionModal}></DeleteRegion>
            </Modal>

            <Modal className="modal-lg" isOpen={updateRegionModal}>
                <ModalHeader toggle={toggleUpdateRegionModal}>연계기관 수정</ModalHeader>
                <UpdateRegion regionInfo={regionInfo} ></UpdateRegion>
            </Modal>

            <Modal className="modal-lg" isOpen={createRegionModal}>
                <ModalHeader toggle={toggleCreateRegionModal}>연계기관 등록</ModalHeader>
                <CreateRegion ></CreateRegion>
            </Modal>

        </div>
    )
}
export default ReadRegion;