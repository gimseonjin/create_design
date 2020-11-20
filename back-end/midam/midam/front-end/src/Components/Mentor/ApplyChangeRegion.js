import React, {useState, setState, useEffect} from 'react';
import { Button,Col,Row,Table, Form, Input, InputGroup, InputGroupAddon, InputGroupText,Modal,ModalHeader } from 'reactstrap';
import axios from 'axios';
import ChangeReason from '../Mentor/ChangeReason'
import $ from 'jquery';
//소속 지역 본부 변경 요청
function ApplyChangeRegion() {

    const [tableData, setTableData] = useState();
    const [modalApplyChangeRegion, setModalApplyChangeRegion] = useState(false); 
    const toggleApplyChangeRegion = () => setModalApplyChangeRegion(!modalApplyChangeRegion);
    let regionArrays = [];
    const [modalInput, setModalInput] = useState("default");

    function setRegionArrays(newArrays) {
        regionArrays = newArrays;

    }
    const renderInput = (regionArray, index) => {
        
        return (
            <tr key={index} >
                <th className="display">{regionArray.regionCode}</th>
                <td>{regionArray.regionName}</td>
                <td>{regionArray.regionAddress}</td>
                <td> <Button className={"applyChangeRegion"} color={"primary"}>{"변경요청"}</Button></td>
                
                
               
            </tr>
        )
    }

    function readRegionList(form) {
        var form = new FormData;
        form.append("userToken", localStorage.getItem('userToken'));
       
        axios
            .post('http://localhost:8080/user/readRegionList', form)
            .then((response) => {
         
                regionArrays = response.data;
                setTableData(regionArrays.map(renderInput));
                
                    
            });
    }



   


    $(function () {
        $(".applyChangeRegion").off("click")

        $(".applyChangeRegion").on("click", function () {

            var Button = $(this);

            var tr = Button.parent().parent();
            var td = tr.children();
            console.log("row데이터 : " + td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleApplyChangeRegion();
        })

        
    })
    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        readRegionList(form);
        }, []
    )

    return (
        <div className="container">
       
       <Row>
                
               
                <Col>
                    <Table>
                     
                        <thead className="text-nowrap">
                        
                            <tr>
                    
                                <th>지역본부 명</th> 
                                <th>지역본부 주소</th>                               
                                <th>변경</th>
                            </tr>
                        </thead>
                        <tbody >
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {tableData}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>

            <Modal isOpen={modalApplyChangeRegion} >
                         <ModalHeader toggle={toggleApplyChangeRegion}>지역본부 변경 요청</ModalHeader>
                         <ChangeReason regionCode={modalInput}></ChangeReason>                         
            </Modal>
    </div>
    )
}
export default ApplyChangeRegion;