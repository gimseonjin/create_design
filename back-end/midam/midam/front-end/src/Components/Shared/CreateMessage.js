import React, {useEffect, useState} from 'react';
import SearchId from './SearchId';
import {
    Button,
    CustomInput,
    Form,
    Modal,
    ModalHeader,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
function CreateMessage(props) {

    const [name, setName] = useState();
    const [receiverId, setReceiverId] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const [modalInput, setModalInput] = useState("default");
    const [modalSearchId, setModalSearchId] = useState(false); 
    const toggleSearchId = () => setModalSearchId(!modalSearchId);

    const handleNameOnChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleReceiverIdOnChange = (e) => {
        e.preventDefault();
        setReceiverId(e.target.value);
    }
  
    const handleTitleOnChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const createMessage = () => {
        var form = new FormData;
        form.append('userToken', localStorage.getItem("userToken"));
        
        form.append("receiverId",receiverId);
        form.append("title", title);
        form.append("content", content);
        axios
            .post('http://localhost:8080/community/createMessage', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {})
    }

    const searchId = () => {
        var form = new FormData;
        
        form.append("name", name);
        axios
            .post('http://localhost:8080/reqUserInfo/searchId', form, {
              
            })
            .then((response) => {
                setReceiverId(response.data.id);
                
            })
    }
    // $(function () {
    //     $(".searchId").off("click")

    //     $(".searchId").on("click", function () {

    //         var searchButton = $(this);

    //         var tr = searchButton.parent().parent();
    //         var td = tr.children();
    //         console.log("row데이터 : " + td.eq(0).text());
    //         setModalInput(name);
    //         toggleSearchId();
    //     })

        
    // })

    useEffect(() => {
    
      searchId(); //게시글 상세조회

    }, [])
    return (
        <div className="container">

            <Form >
                <FormGroup>
                <InputGroupAddon addonType="prepend">
                            <InputGroupText>ID 검색</InputGroupText>
                      <Form inline>
                          
                        <Input type="text" name="name" placeholder="이름" className="mr-sm-2" onChange={handleNameOnChange}/>
                        <Button onClick={searchId} variant="outline-success" >검색</Button>
                      </Form>
                </InputGroupAddon>
                
                     <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>받는이</InputGroupText>
                        </InputGroupAddon>

                        <Input type="text" name="receiverId" onChange={handleReceiverIdOnChange} value={receiverId}></Input>
                    </InputGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>제목</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="title" onChange={handleTitleOnChange}></Input>
                    </InputGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" cols="50" rows="10" onChange={handleContentOnChange} ></Input>
                        
                    </InputGroup>
                    
                </FormGroup>

                <Button
                    className="btn btn-primary btn-block w-25"
                    style={{
                        float: 'right'
                    }}
                    type="Message"
                    onClick={createMessage}>전송</Button>
               

            </Form>
            <Modal isOpen={modalSearchId}>
                         <ModalHeader toggle={toggleSearchId}>쪽지 상세조회</ModalHeader>
                         <SearchId name={modalInput}></SearchId>
                
            </Modal>
        </div>
    )
}
export default CreateMessage;