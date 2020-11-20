import React,{useState, useEffect} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

//소속 연계기관 담당자 삭제
function DeleteMentor(props) {
    const [mentorInfo, setMentorInfo] = useState(props.mentorInfo);

    function deleteMentor(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("mentorId",mentorInfo[0]);
        axios.post("/user/deleteMentor/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
        })
    }

    return (
        <div>
            <p>멘토의 정보를 확인한 후 삭제 버튼을 눌러주세요</p>
               <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[0]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[1]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[2]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>나이</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[3]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[4]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>전화번호</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[5]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>1365ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={mentorInfo[6]}></Input>
            </InputGroup>

            <Button color="primary" onClick={deleteMentor}>삭제</Button>
        </div>
    )
}
export default DeleteMentor;