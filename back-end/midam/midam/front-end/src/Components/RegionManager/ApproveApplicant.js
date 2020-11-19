import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

//회원가입 신청자 승인
function ApproveApplicant(props) {
    const [applicantId, setApplicantId] = useState(props.applicantId);
    
    const [name, setName] = useState("");
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [linkAgencyName, setLinkAgencyName] = useState('');
    const [linkAgencyCode, setLinkAgencyCode] = useState('');
    const [linkAgencyAddress, setLinkAgencyAddress] = useState('');
    const [linkAgencyStatus, setLinkAgencyStatus] = useState('');

    function readApplicantInfo(){
        var form = new FormData();
        form.append("applicantId", applicantId);
        form.append("userToken", localStorage.getItem("userToken"));
        axios.post("/signIn/readLinkAgencyApplicantInfo/regionManager",form).then((response)=>{
            setName(response.data.name);
            setGender(response.data.gender);
            setAge(response.data.age);
            setAddress(response.data.address);
            setPhoneNumber(response.data.phoneNumber);
            setLinkAgencyName(response.data.linkAgencyName);
            setLinkAgencyStatus(response.data.linkAgencyStatus);
            setLinkAgencyAddress(response.data.linkAgencyAddress);
            setLinkAgencyCode(response.data.linkAgencyCode);
        });
    }
    function approveLinkAgencyApplicant(){
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("applicantId", applicantId);
        form.append("linkAgencyCode", linkAgencyCode);
        form.append("linkAgencyStatus", linkAgencyStatus);
        axios.post("/signIn/approveLinkAgencyApplicant/regionManager",form).then((response)=>{
            alert(response.data.resultMsg);
        })
    }
    function rejectLinkAgencyApplicant(){
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("applicantId", applicantId);
        form.append("linkAgencyCode", linkAgencyCode);
        form.append("linkAgencyStatus", linkAgencyStatus);
        axios.post("/signIn/rejectLinkAgencyApplicant/regionManager",form).then((response)=>{
            alert(response.data.resultMsg);
        })
    }

    useEffect(()=>{
        readApplicantInfo();
    },[])

    return (
     <div>
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
                    <InputGroupText>연계기관명</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={linkAgencyName}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>기관등록여부</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={linkAgencyStatus===1?"승인됨":"미승인"}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>연계기관주소</InputGroupText>
                </InputGroupAddon>
                <Input
                    type="text"
                    readOnly={true}
                    value={linkAgencyAddress}></Input>
            </InputGroup>
            <Button color="primary" onClick={()=>approveLinkAgencyApplicant()}> 승인 </Button>
            <Button color="danger" onClick={()=>rejectLinkAgencyApplicant()}> 거절 </Button>
        </FormGroup>
    </Form>



</div>
    )
}
export default ApproveApplicant;