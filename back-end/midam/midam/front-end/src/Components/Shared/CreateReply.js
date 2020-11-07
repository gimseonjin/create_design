import React, {useState} from 'react';
import {
    Button,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import axios from 'axios';

function CreateReply(props) {

    const [postId, setPostId] = useState(
        props.postId
    );

    const [content, setContent] = useState();


    
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const createReply = () => {
        var form = new FormData;
        form.append('userToken', localStorage.getItem("userToken"));
        form.append("content", content);
        axios
            .post('http://localhost:8080/community/createReply', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {})
    }

    return (
        <div className="container">

            <Form >
                <FormGroup>
              
                    
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>댓글내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" onChange={handleContentOnChange}></Input>
                    </InputGroup>
                </FormGroup>

                <Button
                    className="btn btn-primary btn-block w-25"
                    style={{
                        float: 'right'
                    }}
                    type="post"
                    onClick={createReply}>작성</Button>
            

            </Form>

        </div>
    )
}
export default CreateReply;