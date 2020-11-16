import React, {useEffect, useState} from 'react';
;
import '../Css/test.css';
import {
    Button,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';


const ReadMentoringApplication = (props) => {

    const [tableData, setTableData] = useState();

   
    let applicationArrays = [];
    const [modalInput, setModalInput] = useState("default");
    function setApplicationArrays(newArrays) {applicationArrays = newArrays;}
    const renderInput = (applicationArray, index) => {
        
        return (
            <tr key={index}>
                <th>{applicationArray.postId}</th>
                <td>{applicationArray.writerId}</td>
                <td>{applicationArray.title}</td>
                
                <td>{applicationArray.writeDate}</td>
                <td>{applicationArray.numberOfView}</td>
            </tr>
        )
    }
    function getApplicationHistory(form) {
        axios.post('http://localhost:8080/activity/readApplication', form).then((response) => {
         
                
                setApplicationArrays(response.data);
                setTableData(applicationArrays.map(renderInput));
            });
    }
   

    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        getApplicationHistory(form);
        }, []
    )
 $(function() { 
    $(".readPostInfo").off("click")
        $(".createPostButton").on("click",function(){
  
            var postButton = $(this);

            var tr = postButton.parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleCreatePost();
        }
        ) 
        $(".readPostInfo").on("click",function(){
            
            var postButton = $(this);

            var tr = postButton.parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleReadPostInfo();
        }
        )       
    }
    )

    return (
        <div className="container">
            <Row>
                
                {/*게시판 테이블*/}
                <Col>
                    <Table  >
                        {/* 문자 안끊기게 */}
                        <thead className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                           
                                <th>게시글 번호</th>
                                <th>작성자 ID</th>
                                <th>제목</th>
                                <th>작성날짜</th>
                                <th>조회수</th>

                            </tr>
                        </thead>
                        <tbody >
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {tableData}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
            <Modal isOpen={modalCreatePost}>
                         <ModalHeader toggle={toggleCreatePost}>게시글 작성</ModalHeader>
                         <CreatePost postId={modalInput}></CreatePost>                         
            </Modal>
                   
            <Modal isOpen={modalReadPostInfo}>
                <ModalHeader toggle={toggleReadPostInfo}>게시글 상세조회</ModalHeader>
                <ReadPostInfo postId={modalInput}></ReadPostInfo>
                
            </Modal>

            <Button className={"createPostButton"} color={"primary"} >{"작성"}</Button>
        </div>
    )
}
export default ReadMentoringApplication;
