import React, {useEffect, useState} from 'react';


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

function ReadMessageInfo(props) {

    const [messageId, setMessageId] = useState(
        props.messageId
    );

    const [senderId, setSenderId] = useState();
    const [sendDate, setSendDate] =useState();   
    const [receiveDate, setReceiveDate] =useState();  
    const [title, setTitle] = useState();
    const [content, setContent] = useState();    

    const [modalInput, setModalInput] = useState("default");
    const [isReadOnly, setIsReadOnly] = useState(true); 

    const handleMessageIdOnChange = (e) => {
        e.preventDefault();
        setMessageId(e.target.value);
    }
    const handleSenderIdOnChange = (e) => {
        e.preventDefault();
        setSenderId(e.target.value);
    }
    const handleSendDateOnChange = (e) => {
        e.preventDefault();
        setSendDate(e.target.value);
    }   
    const handleReceiveDateOnChange = (e) => {
        e.preventDefault();
        setReceiveDate(e.target.value);
    }   
    const handleTitleOnChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }
  

    const readMessageInfo = () => {
        var form = new FormData;
        form.append('messageId', messageId);
        axios
            .post('/community/readMessageInfo', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setMessageId(response.data.messageId);
                setSenderId(response.data.senderId);
                setSendDate(response.data.sendDate); 
                setReceiveDate(response.data.receiveDate);               
                setTitle(response.data.title);
                setContent(response.data.content);     

            })
    }
    const deleteMessage = () => {
        var form = new FormData;

        form.append("messageId", messageId);

        axios
            .post('/community/deleteMessage', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                  window.location.reload();
            })
    }
    

   

   
    useEffect(() => {
    
        readMessageInfo(); //게시글 상세조회

    }, [])
    return (
        <div className="container">

            <Form>
                <FormGroup>
                    <InputGroup type="hidden">

                        <Input
                            type="hidden"
                            name="messageId"
                            onChange={handleMessageIdOnChange}
                            value={messageId}
                            readOnly={isReadOnly}></Input>
                    </InputGroup>
                    
                    <InputGroup  style={{ marginTop: "1%",marginBottom: "1%" }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>보낸이</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="senderId"
                            placeholder="senderId"
                            onChange={handleSenderIdOnChange}
                            value={senderId}
                            readOnly={true}>                               
                        </Input>
                    </InputGroup >
                    <InputGroup  style={{ marginTop: "1%",marginBottom: "1%" }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>보낸 날짜</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="sendDate"
                            placeholder="sendDate"
                            onChange={handleSendDateOnChange}
                            value={sendDate}
                            readOnly={true}>                               
                        </Input>
                    </InputGroup >
                    <InputGroup  style={{ marginTop: "1%",marginBottom: "1%" }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>읽은 날짜</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="receiveDate"
                            placeholder="receiveDate"
                            onChange={handleReceiveDateOnChange}
                            value={receiveDate}
                            readOnly={true}>                               
                        </Input>
                    </InputGroup >
                    <hr></hr>
                    <InputGroup  style={{ marginTop: "1%",marginBottom: "1%" }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>쪽지 제목</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="title"
                            placeholder="title"
                            onChange={handleTitleOnChange}
                            value={title}
                            readOnly={true}>                               
                        </Input>
                    </InputGroup >
                    <InputGroup  style={{ marginTop: "1%",marginBottom: "1%" }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>쪽지 내용</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="content"
                            placeholder="content"
                            onChange={handleContentOnChange}
                            value={content}
                            readOnly={true}>                               
                        </Input>
                    </InputGroup >
                    
                    <Button type="hidden" color="primary" onClick={deleteMessage}>삭제</Button>
                    

                   
                </FormGroup>
            </Form>

          

           
            
        </div>
    )
}export default ReadMessageInfo;
