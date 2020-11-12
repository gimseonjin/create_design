import React, {useEffect, useState} from 'react';
import '../Css/test.css';

import $ from 'jquery';
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


function CreateReply(props){

    const [postId, setPostId] = useState(
        props.postId
    );
    const [reply, setReply] = useState();  //댓글작성내용
    const handleReplyOnChange = (e) => {
        e.preventDefault();
        setReply(e.target.value);
    }   
    const createReply = () =>{
        var form = new FormData;      
        form.append('userToken', localStorage.getItem("userToken"));
        form.append('postId', postId);
        form.append('reply',reply);
        axios.post("http://localhost:8080/community/createReply", form,{headers: {'content-type':'multipart/form-data'}})
        .then((response)=>{
        
            window.location.reload();
     
     })
    }
   
    return (
        <div class="modal-content">              
            
           
      
            <div class="container">
      
              <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>댓글</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="댓글" onChange={handleReplyOnChange} value={reply}></Input>
            </InputGroup>
           
            </div>
        
            <div class="modal-footer">
                 <Button className="btn btn-primary btn-block w-25" color={"primary"} style={{float: 'right'}}   type="post" onClick={createReply}>{"댓글작성"}</Button>
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">취소하기</button>
            </div>
          </div>
      
            
            
    )
}
export default CreateReply;