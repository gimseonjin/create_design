import React, {useEffect, useState} from 'react';
import CreateReply from '../Shared/CreateReply';
import '../Css/test.css';
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
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
//readReply : 해당게시글 댓글목록 조회  createReply : 해당 게시글 댓글 작성 
function ReadPostInfo(props){

    const [postId, setPostId] = useState(
        props.postId
    );
    
    const [writerId, setWriterId] = useState();
    const [writeDate, setWriteDate] =useState();    
    const [title, setTitle] = useState();
    const [content, setContent] = useState();  //게시글 상세조회
    
    const [reply, setReply] = useState();  //댓글작성내용

    const [modalInput, setModalInput] = useState("default");
    
       
    const [tableData, setTableData] = useState(); //댓글 목록 조회 
  //  const [modalCreateReply, setModalCreateReply] = useState(false);  //댓글 등록
  //  const [modalUpdateReply, setModalUpdateReply] = useState(false); //댓글수정 
    

  //  const toggleCreateReply = () => setModalCreateReply(!modalCreateReply);
  //  const toggleUpdateReply = () => setModalUpdateReply(!modalUpdateReply);
    
    let replyArrays = [];  //댓글 목록 테이블
    function setReplyArrays(newArrays) {replyArrays = newArrays;}
    const renderInput = (replyArray, index) => {
        
        return (
            
            <tr key={index} >
                         
                <td>{replyArray.writerId}</td>
                <td>{replyArray.content}</td>                
                <td>{replyArray.writeDate}</td> 
                <td><Button className={"deleteReplyButton"} color={"primary"} >{"삭제"}</Button></td>               
            </tr>
        ) //<h1>props.activityHistoryCode : {activityHistoryCode}</h1>
    }//댓글 목록 조회시 보일것 (댓글작성자, 댓글내용, 댓글 작성날짜)
   
    const handlePostIdOnChange = (e) => {
        e.preventDefault();
        setPostId(e.target.value);
    }
    const handleReplyOnChange = (e) => {
        e.preventDefault();
        setReply(e.target.value);
    }
    const handleWriterIdOnChange = (e) => {
        e.preventDefault();
        setWriterId(e.target.value);
    }
    const handleWriteDateOnChange = (e) => {
        e.preventDefault();
        setWriteDate(e.target.value);
    }
    const handleTitleOnChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }
    const readPostInfo = () => { 
        var form = new FormData;
        form.append("postId", postId);
        axios.post('http://localhost:8080/community/readPostInfo',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            setWriterId(response.data.writerId);
            setWriteDate(response.data.writeDate);    
            setTitle(response.data.title);
            setContent(response.data.content);           
        })
    }
    function getReplyList(form) {
        var form = new FormData;
        
        form.append("postId", postId);
        axios.post('http://localhost:8080/community/readReply', form).then((response) => {
         
                setReplyArrays(response.data);
                setTableData(replyArrays.map(renderInput));
            });
    }
    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        readPostInfo();   //게시글 상세조회
        getReplyList(form); //댓글 목록조회
        }
    )
    const updatePost = () => {
        var form = new FormData;
      
        form.append("postId", postId);
        form.append("title",title);
        form.append("content",content);       

        axios
            .post('http://localhost:8080/community/updatePost', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                alert(response.data.responseMsg);
            })
    }
    const createReply = () =>{
        var form = new FormData;      
        form.append('userToken', localStorage.getItem("userToken"));
        form.append('postId', postId);
        form.append('reply',reply);
        axios.post("http://localhost:8080/community/createReply", form,{headers: {'content-type':'multipart/form-data'}})
        .then((response)=>{
        
         
     
     })
    }
    

   
 /*
    $(function() { 
            
        $(".createReplyButton").on("click",function(){
            var postButton = $(this);

            var tr = postButton.parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleCreateReply();
    
        }
        ) 
               
    }
    )
     */
    return (
        <div className="container">
           
            
            <Form>
                <FormGroup>
                    <InputGroup type="hidden">
                       
                        <Input type="textarea" name="postId" type="hidden" onChange={handlePostIdOnChange} value={postId}></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>작성자ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="writerId" placeholder="작성자id" onChange={handleWriterIdOnChange} value={writerId}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>작성날짜</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="writeDate" placeholder="작성날짜" onChange={handleWriteDateOnChange} value={writeDate}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>제목</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="title" placeholder="제목" onChange={handleTitleOnChange} value={title}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="내용" onChange={handleContentOnChange} value={content}></Input>
                    </InputGroup>          
                </FormGroup>
            </Form>

      

            <Button onClick={updatePost}>수정</Button>
            <Button type="hidden" color="primary" /* onClick={} */>완료</Button>
            
            <hr></hr>
 
            <Row>
                
                {/*댓글 목록 테이블*/}
                <Col>
                    <Table  >
                    
                        <thead className="text-nowrap">
                           
                            <tr>                        
                               
                                <th>작성자 ID</th>
                                <th>내용</th>
                                <th>작성날짜</th>                                

                            </tr>
                        </thead>
                        <tbody >                        
                            {tableData}
                            
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
            <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>댓글</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="댓글" onChange={handleReplyOnChange} value={reply}></Input>
            </InputGroup>
            
            
            <Button className="btn btn-primary btn-block w-25" color={"primary"} style={{float: 'right'}}   type="post" onClick={createReply}>{"댓글작성"}</Button>
            </div>
            
    )
}
export default ReadPostInfo;
