import React,{useState, useEffect} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

function ChangeAuthority(props){
    const [userInfo,setUserInfo] = useState(props.userInfo);

    function changeMentorAuthority(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("userId", userInfo[0]);
        form.append("userAuthority", userInfo[8]);
        axios.post("/user/changeMentorAuthority/systemManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        });
    }

    useEffect(()=>{
       
    },[])
    
    return(
        <div className="container">
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[0]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[1]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[2]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>나이</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[3]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[4]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>전화번호</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[5]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>1365ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo[6]}></Input>
            </InputGroup>

          
            <Button color="primary" onClick={changeMentorAuthority}>  {userInfo[8]==1? '관리자로 변경' : '멘토로 변경'}</Button>

        </div>
    )
}
export default ChangeAuthority;