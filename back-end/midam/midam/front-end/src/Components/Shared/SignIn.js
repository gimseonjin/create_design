import React, {useState, setState} from 'react';

import {Router, Route, Link} from 'react-router-dom';
import {
    Form,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
function SignIn(props,{history}) {

    const [rSelected, setRSelected] = useState();
    const [activeTab, setActiveTab] = useState();

    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [authority, setAuthority] = useState();

    const handleSubmitId = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }

    const handleSubmitPw = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleSubmitName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleSubmitGender = (e) => {
        e.preventDefault();
        setGender(e.target.value);
    }
    const handleSubmitAge = (e) => {
        e.preventDefault();
        setAge(e.target.value);
    }
    const handleSubmitAddress = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    }
    const handleSubmitPhoneNumber = (e) => {
        e.preventDefault();
        setPhoneNumber(e.target.value);
    }
    const handleSubmitAuthority = (e) => {
        e.preventDefault();
        setAuthority(e.target.value);
    }


    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    const signInPost = () => {
        var form = new FormData;
        form.append('id', id);
        form.append('password', password);
        form.append('name', name);
        form.append('gender', gender);
        form.append('age', age);
        form.append('address', address);
        form.append('phoneNumber', phoneNumber);
        form.append('authority', authority);

        axios.post("http://localhost:8080/user/createUser", form,{headers: {'content-type':'multipart/form-data'}}).then((response)=>{
         console.log(response.data.authority);
         history.push("/");
         /*
         switch(response.data.authority) {
             case 0:
             case -1:
             case -2:
             case -3:
                 alert(response.data.message);
                 // history.push("/");
                 break;
             case 1:
             case 2:

                // localStorage.setItem("id",id);
               //  localStorage.setItem("authority",response.data.authority);
               //  console.log("/"+response.data.authorityName)
            //     console.log("fromlocalstrorage: "+localStorage.getItem("id"));
            //     history.push("/");
                 break;
         }
         */
     })
    }
        return (
            <div
                className="signIN_container d-flex justify-content-center align-self-center"
                style={{
                    margin: "50px"
                }}>
                 <Form className="w-75">
                    <h3 style={{
                            marginBottom: '5%'                            
                        }}>멘토</h3>
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">권한</InputGroupText>
                        </InputGroupAddon>
                        <Col sm={4}>
                            <Input type='select' name="authority" onChange={handleSubmitAuthority}>
                            {/* 여기에 option을 지역본부를 DB에서 select 해서 for문으로 추가하면 될듯! */}
                                <option>선택</option>
                                <option value='1'>멘토</option>                                
                            </Input>
                        </Col>
                    </InputGroup> 
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">이름</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' name="name"onChange={handleSubmitName}/>
                    </InputGroup>                    
                 
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">성별</InputGroupText>
                        </InputGroupAddon>
                        <Col sm={4}>
                            <Input type='select' name='gender'onChange={handleSubmitGender} >
                            {/* 여기에 option을 지역본부를 DB에서 select 해서 for문으로 추가하면 될듯! */}
                                <option>선택</option>
                                <option value='M'>남성</option>
                                <option value='G'>여성</option>
                            </Input>
                        </Col>
                    </InputGroup>        
                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">나이</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  name='age' onChange={handleSubmitAge}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">아이디</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  name='id'onChange={handleSubmitId}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">비밀번호</InputGroupText>
                        </InputGroupAddon>
                        <Input type='password'  name='password'onChange={handleSubmitPw}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">비밀번호 확인</InputGroupText>
                        </InputGroupAddon>
                        <Input type='password' name='password'/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">소속 지역 본부</InputGroupText>
                        </InputGroupAddon>
                        <Col sm={4}>
                            <Input type='select' name='region' >
                            {/* 여기에 option을 지역본부를 DB에서 select 해서 for문으로 추가하면 될듯! */}
                                <option>선택</option>
                                <option value='1'>금오공과대학교</option>
                                <option value='2'>구미도서관</option>
                          
                            </Input>
                        </Col>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">휴대폰 번호</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  name='phoneNumber'onChange={handleSubmitPhoneNumber}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">주소</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  name='address'onChange={handleSubmitAddress}/>
                    </InputGroup>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">1365 아이디</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' name='1365Id'/>
                    </InputGroup>

                    <Button onClick={()=>history.push("/")} style={{float: 'right'}}>취소</Button>
                   
                  
                    <Button  className="btn btn-primary btn-block w-25" style={{float: 'right'}} type="post" onClick={signInPost}>회원가입</Button>
                    
                </Form> 
                
            </div>
        )
}
export default SignIn;