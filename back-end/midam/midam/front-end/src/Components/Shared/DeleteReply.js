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


function DeleteReply(props){

    const [postId, setPostId] = useState(
        props.postId
    );

    const deleteReply = () =>{
        var form = new FormData;      

        form.append('postId', postId);
   
        axios.post("/community/deleteReply", form,{headers: {'content-type':'multipart/form-data'}})
        .then((response)=>{
        
            window.location.reload();
     
     })
    }
   
    return (
        <div class="modal-content">      
       
        
            
           
      
            <div class="modal-body">
              댓글을 정말 삭제하시겠습니까?
            </div>
            <div class="modal-footer">
                <button type="hidden" class="btn btn-primary" onClick={deleteReply}>삭제하기</button>
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">취소하기</button>
            </div>
          </div>
      
            
            
    )
}
export default DeleteReply;