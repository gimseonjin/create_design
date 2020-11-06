import React, {useEffect, useState} from 'react';
import CreatePost from '../Shared/CreatePost';
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

import ReadPostInfo from './ReadPostInfo';


const ReadPost = (props) => {

    const [tableData, setTableData] = useState();
    const [modalCreatePost, setModalCreatePost] = useState(false); 
    const [modalReadPostInfo, setModalReadPostInfo] = useState(false);


    const toggleCreatePost = () => setModalCreatePost(!modalCreatePost);
    const toggleReadPostInfo = () => setModalReadPostInfo(!modalReadPostInfo);

    let postArrays = [];
    const [modalInput, setModalInput] = useState("default");
    function setPostArrays(newArrays) {postArrays = newArrays;}
    const renderInput = (postArray, index) => {
        
        return (
            <tr key={index} >
                <th>{postArray.postId}</th>
                <td>{postArray.writerId}</td>
                <td className={"readPostInfo"} >{postArray.title}</td>
                
                <td onmouseover="this.style.background='white'" onmouseout="this.style.background='blue'">{postArray.writeDate}</td>
                <td>{postArray.numberOfView}</td>
            </tr>
        )
    }
    function getPostHistory(form) {
        axios.post('http://localhost:8080/community/readPost', form).then((response) => {
          //console.log(response.data[0].writerId + "response");
                
                setPostArrays(response.data);
                setTableData(postArrays.map(renderInput));
            });
    }
   

    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        getPostHistory(form);
        }, []
    )
 $(function() { 
            
        $(".createPostButton").on("click",function(){
  
            var postButton = $(this);

            var tr = postButton.parent().parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleCreatePost();
        }
        ) 
        $(".readPostInfo").on("click",function(){
            
            var postButton = $(this);

            var tr = postButton.parent().parent();
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
export default ReadPost;
