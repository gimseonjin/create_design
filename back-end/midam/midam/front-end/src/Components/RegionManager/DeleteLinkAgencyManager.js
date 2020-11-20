import React,{useState, useEffect} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

//소속 연계기관 담당자 삭제
function DeleteLinkAgencyManager(props) {
    const [linkAgencyManagerInfo, setLinkAgencyManagerInfo] = useState(props.linkAgencyManagerInfo);

    function deleteLinkAgencyManager(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("linkAgencyManagerId",linkAgencyManagerInfo[0]);
        axios.post("/user/deleteLinkAgencyManager/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
        })
    }

    return (
        <div>
               <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[0]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[1]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[2]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>나이</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[3]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[4]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>전화번호</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[5]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>연계기관명</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyManagerInfo[6]}></Input>
            </InputGroup>

          
            <Button color="primary" onClick={deleteLinkAgencyManager}>삭제</Button>
        </div>
    )
}
export default DeleteLinkAgencyManager;