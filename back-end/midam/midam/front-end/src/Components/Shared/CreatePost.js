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

function CreatePost(props) {

  
    const [writerId, setWriterId] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();


    const handleWriterIdOnChange = (e) => {
        e.preventDefault();
        setWriterId(e.target.value);
    }

    const handleTitleOnChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const createPost = () => {
        var form = new FormData;
        form.append("writerId",writerId);
        form.append("title", title);
        form.append("content", content);
        axios
            .post('http://localhost:8080/community/createPost', form, {
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
                            <InputGroupText>작성자ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="writerId" onChange={handleWriterIdOnChange}></Input>
                    </InputGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>제목</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="content" onChange={handleTitleOnChange}></Input>
                    </InputGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>내용</InputGroupText>
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
                    onClick={createPost}>작성</Button>
               

            </Form>

        </div>
    )
}
export default CreatePost;