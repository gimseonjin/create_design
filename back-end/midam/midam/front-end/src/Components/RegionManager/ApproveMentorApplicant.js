import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

//멘토 회원가입 신청자 승인
function ApproveMentorApplicant(props) {

    const [applicantInfo, setApplicantInfo] = useState(props.applicantInfo);
    const [applicantId, setApplicantId] = useState(props.applicantInfo[0]);
    const [name, setName] = useState(props.applicantInfo[1]);
    const [gender, setGender] = useState(props.applicantInfo[2]);
    const [age, setAge] = useState(props.applicantInfo[3]);
    const [address, setAddress] = useState(props.applicantInfo[4]);
    const [phoneNumber, setPhoneNumber] = useState(props.applicantInfo[5]);
    const [volunteerId, setVolunteerId] = useState(props.applicantInfo[6]);

    function approveMentorApplicant(){
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("applicantId", applicantId);
        axios.post("/signIn/approveMentorApplicant/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }
    function rejectMentorApplicant(){
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("applicantId", applicantId);
        axios.post("/signIn/rejectMentorApplicant/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }

    

    return (
     <div>
         {applicantInfo}
    <Form>
        <FormGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>ID</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={applicantId}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={name}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={gender}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>나이</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={age}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>주소</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={address}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>전화번호</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={phoneNumber}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>1365ID</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={volunteerId}></Input>
            </InputGroup>

            <Button color="primary" onClick={()=>approveMentorApplicant()}> 승인 </Button>
            <Button color="danger" onClick={()=>rejectMentorApplicant()}> 거절 </Button>
        </FormGroup>
    </Form>

</div>
    )
}
export default ApproveMentorApplicant;