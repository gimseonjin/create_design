import React, {useState, setState} from 'react';

import {Router, Route, Link} from 'react-router-dom';
import {Form, InputGroup, InputGroupAddon, InputGroupText, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';
import classnames from 'classnames';
// import '../Css/SignInLinkAgency.css'

//회원 가입
const SignInLinkAgency = ({history},props) => {
    const [activeTab, setActiveTab] = useState(null);
    const [isNewLinkAgency, setIsNewLinkAgency] = useState(true);
  
    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

        return (
            <div
                className="signIN_container d-flex justify-content-center align-self-center"
                style={{
                    margin: "50px"
                }}>
                { <Form className="w-75">
                    <h3 style={{
                            marginBottom: '5%'
                            
                        }}>연계기관</h3>

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
                            <InputGroupText className = "input-group-addon">소속 지역 본부</InputGroupText>
                        </InputGroupAddon>
                        <Col sm={4}>
                            <Input type='select' name='selectRegion'>
                            {/* 여기에 option을 지역본부를 DB에서 select 해서 for문으로 추가하면 될듯! */}
                                <option>선택</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Input>
                        </Col>
                    </InputGroup>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">연계 기관</InputGroupText>
                        </InputGroupAddon>
                       <CustomInput type="radio" id="selectRegion" name = "radioRegion" onClick={() => {setIsNewLinkAgency(true)}} defaultChecked>연계기관 선택</CustomInput>
                        <Col sm={4}>
                            <Input type='select' name='selectRegion' disabled={!isNewLinkAgency}>
                            {/* 여기에 option을 연계기관을 DB에서 select 해서 for문으로 추가하면 될듯! */}
                                <option>선택</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Input>
                        </Col>
                        <CustomInput type="radio" id="newRegion" name="radioRegion" onClick={() => {setIsNewLinkAgency(false)}}>연계기관 신규 등록</CustomInput>
                    </InputGroup>
                    
                    {/* 연계기관 신규등록을 선택할 시 disabled={isNewLinkAgency} isNewLinkAgency가 false로 변하면서 disabled가 해제. 작성할수있게됨 */}

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}} >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">연계기관명</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' placeholder="username" disabled={isNewLinkAgency}/>
                    </InputGroup>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">주소</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' placeholder="username" disabled={isNewLinkAgency} />
                    </InputGroup>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">설명</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' placeholder="username" disabled={isNewLinkAgency} />
                    </InputGroup>

                    <Button onClick={()=>history.push("/")} style={{float: 'right'}}>취소</Button>
                    <Button
                        type="submit"
                        className="btn btn-primary btn-block w-25"
                        style={{
                            float: 'right'
                        }}>회원 가입</Button>
                </Form> }
            </div>
        )
}
export default SignInLinkAgency;