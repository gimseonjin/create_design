import React,{useState} from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

const UpdateUserInformation = (props) => {
  //회원 정보 수정
  const [userInfo, setUserInfo] = useState({
    name : props.userInfo.name,
    age : props.userInfo.age,
    phoneNumber : props.userInfo.phoneNumber,
    gender : props.userInfo.gender,
    address : props.userInfo.address,
    linkAgency : props.userInfo.linkAgency,
   
  });  

  const [isReadOnly, setIsReadOnly] = useState(true);
 
  const handleUserInfoOnChange =(e)=>{
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name] : e.target.value
    })
  }

  function updateUserInfo(){
    var form = new FormData();
    form.append("userToken", localStorage.getItem("userToken"));
    form.append("name",userInfo.name);
    form.append("age",userInfo.age);
    form.append("phoneNumber",userInfo.phoneNumber);
    form.append("gender",userInfo.gender);
    form.append("address",userInfo.address)
    
    axios.post("/user/updateUserInfo/linkAgencyManager",form).then((response)=>{
      alert(response.data.responseMsg);
      window.location.reload();
    })
  }


    return (

        <div className="container">
                        <h1>회원 정보 수정</h1>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input  type="text" name="name" value={userInfo.name} readOnly={isReadOnly} onChange={handleUserInfoOnChange}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>나이</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="age" value={userInfo.age} readOnly={isReadOnly} onChange={handleUserInfoOnChange}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>휴대폰 번호</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="phoneNumber" value={userInfo.phoneNumber} readOnly={isReadOnly} onChange={handleUserInfoOnChange}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="gender" value={userInfo.gender} readOnly={isReadOnly} onChange={handleUserInfoOnChange}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="address" value={userInfo.address} readOnly={isReadOnly} onChange={handleUserInfoOnChange}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>소속 연계기관</InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="region" value={userInfo.linkAgency} readOnly={true}></Input>
            </InputGroup>
           

            <Button color="primary" onClick={()=>setIsReadOnly(!isReadOnly)}>수정</Button>
            {isReadOnly?"":<Button color="danger" onClick={updateUserInfo}>완료</Button>}

            
        
        </div>
    )
}
export default UpdateUserInformation;