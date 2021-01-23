import React, {useEffect, useState} from 'react';

import '../Css/test.css';
import {Button, Col, Row, Table, Modal, ModalHeader} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery'

const ReadChangeRegionApplication = (props) => {
    const [id, setId] = useState();
    const [regionCode, setRegionCode] = useState();
    
    const [tableData, setTableData] = useState();
    const [modalReadChangeRegionApplicationInfo, setModalReadChangeRegionApplicationInfo] = useState(false);
    const toggleReadChangeRegionApplicationInfo = () => setModalReadChangeRegionApplicationInfo(!modalReadChangeRegionApplicationInfo);
   

    let applicationArrays = [];

    function setApplicationArrays(newArrays) {
        applicationArrays = newArrays;
    }
    const renderInput = (applicationArray, index) => {
        

        
        return (
            <tr key={index}>
                <td >{applicationArray.id}</td> 
                <td className="display">{applicationArray.regionCode}</td>        
                <td >{applicationArray.name}</td>
                <td >{applicationArray.age}</td> 
                <td >{applicationArray.gender}</td> 
                <td >{applicationArray.address}</td>
                <td>{applicationArray.changeReason}</td>             
                <td>
                <Button className={"approvalPass"} color={"success"}>승인</Button>
                <Button className={"approvalFail"} color={"danger"}>거절</Button>
                </td>
               
            </tr>
        )
    }
    

    const approvalPass = (id, regionCode) => {
        var form = new FormData;

        form.append('id', id);
        form.append('regionCode',regionCode);
          

        axios
            .post('/user/approvalPass', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                
                window.location.reload();
            })
    } 
    const approvalFail = (id, regionCode) => {
        var form = new FormData;

        form.append('id', id);
        form.append('regionCode',regionCode);
         

        axios
            .post('/user/approvalFail', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                window.location.reload();
            })
    }    
    function getApplicationHistory(form) {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));

        axios
            .post('/user/readChangeRegionApplication', form)
            .then((response) => {
                setApplicationArrays(response.data);
                
                setTableData(applicationArrays.map(renderInput));
            });
    }

    $(function() { 
        $(".approvalPass").off("click")
            $(".approvalPass").on("click",function(){
      
                var Button = $(this);
    
                var tr = Button.parent().parent();
                var td = tr.children();
                console.log("row데이터 : "+td.eq(0).text());
                
               
                approvalPass(td.eq(0).text(), td.eq(1).text());
            }
            ) 
            $(".approvalFail").on("click",function(){
                
                var Button = $(this);
    
                var tr = Button.parent().parent();
                var td = tr.children();
                
         
                approvalFail(td.eq(0).text(), td.eq(1).text());
            }
            )       
        }
        )

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
                                <th>이름</th>
                                <th>나이</th>
                                <th>성별</th>
                                <th>주소</th>
                                <th>변경사유</th>
                                <th>승인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData}
                        </tbody>
                    </Table>

                </Col>
            </Row>
          
          
        </div>
    )
}
export default ReadChangeRegionApplication;
