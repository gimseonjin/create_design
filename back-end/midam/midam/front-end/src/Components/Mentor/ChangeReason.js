import React, {useEffect, useState} from 'react';
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

    const [regionCode, setRegionCode] = useState(props.regionCode);

    const [changeReason, setChangeReason] = useState();

    const handleRegionCodeOnChange = (e) => {
        e.preventDefault();
        setRegionCode(e.target.value);
    }

    const handleChangeReasonOnChange = (e) => {
        e.preventDefault();
        setChangeReason(e.target.value);
    }

    const ApplyChangeRegion = () => {
        var form = new FormData;
        form.append("regionCode", regionCode);
        form.append('userToken', localStorage.getItem("userToken"));
        form.append("changeReason", changeReason);
        axios
            .post('http://localhost:8080/user/applyChangeRegion', form, {headers: {}})
            .then((response) => {})
    }

    return (
        <div className="container">

            <Form >
                <FormGroup>
                     <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            
                        </InputGroupAddon>
                        <Input
                            type="hidden"
                            name="regionCode"
                     
                            onChange={handleRegionCodeOnChange} value={regionCode}></Input>
                    </InputGroup>
                   
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>변경 사유</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="changeReason"
                            cols="50"
                            rows="10"
                            onChange={handleChangeReasonOnChange}></Input>
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