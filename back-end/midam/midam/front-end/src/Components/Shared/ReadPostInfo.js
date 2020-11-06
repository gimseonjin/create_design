import React, {useEffect, useState} from 'react';
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

function ReadPostInfo(props){

    const [postId, setPostId] = useState(
        props.postId
    );
    
    const [writerId, setWriterId] = useState();
    const [writeDate, setWriteDate] =useState();    
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    
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
        form.append("postId", postId[0]);
        axios.post('http://localhost:8080/community/readPostInfo',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            setWriterId(response.data.writerId);
            setWriteDate(response.data.writeDate);    
            setTitle(response.data.title);
            setContent(response.data.content);
           
           // console.log(response.data.postId);
            

        })

    }
    useEffect(()=>{
        readPostInfo();
    },[])

    return (
        <div className="container">
            <h1> props.postId: {postId[0]}</h1>
            
            <Form>
                <FormGroup>
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
                
            </div>
    )
}
export default ReadPostInfo;
