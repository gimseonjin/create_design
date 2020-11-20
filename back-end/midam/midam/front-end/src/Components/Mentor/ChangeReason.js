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

function ChangeReason(props) {

  
   
   
    const [content, setContent] = useState();


  
    
    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const ApplyChangeRegion = () => {
        var form = new FormData;
        form.append('userToken', localStorage.getItem("userToken"));    
        form.append("content", content);
        axios
            .post('http://localhost:8080/user/applyChangeRegion', form, {
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
                 
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>변경 사유</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" cols="50" rows="10" onChange={handleContentOnChange}></Input>
                    </InputGroup>
                </FormGroup>

                <Button
                    className="btn btn-primary btn-block w-25"
                    style={{
                        float: 'right'
                    }}
                    type="post"
                    onClick={ApplyChangeRegion}>작성</Button>
               

            </Form>

        </div>
    )
}
export default ChangeReason;