import React, {useState} from 'react';
import {Router, Route, Link} from 'react-router-dom';
import {Form, InputGroup, InputGroupAddon, InputGroupText, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import '../Css/SignIn.css'

//회원 가입
const SignIn = (props) => {
    const [activeTab, setActiveTab] = useState('1');
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
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
                        
                    }}>회원 가입</h3>

                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">이름</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">성별</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">생년월일</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">아이디</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">비밀번호</InputGroupText>
                    </InputGroupAddon>
                    <Input type='password' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">비밀번호 확인</InputGroupText>
                    </InputGroupAddon>
                    <Input type='password' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">소속 지역 본부</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">휴대폰 번호</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                
                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">주소</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText className = "input-group-addon">1365 아이디</InputGroupText>
                    </InputGroupAddon>
                    <Input type='text' placeholder="username"/>
                </InputGroup>

                <button
                    type="submit"
                    className="btn btn-primary btn-block w-25"
                    style={{
                        float: 'right'
                    }}>회원 가입</button>
            </Form>
        </div>
    )
}
export default SignIn;