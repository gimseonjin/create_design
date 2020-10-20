import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import MentorMenu1 from './MentorMenu1';
import MentorMenu2 from './MentorMenu2';
import MentorMenu3 from './MentorMenu3';
import MentorMenu4 from './MentorMenu4';
import * as ReactBootStrap from "react-bootstrap"; //nav
function HeaderMentor({match, history}) {
    return (
        <div>
             <ReactBootStrap.Navbar bg="primary" variant="dark"> 
                
                <ReactBootStrap.Navbar.Brand href="/Mentor">미담장학회 멘토</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.NavDropdown title="멘토링활동" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item href="#Mentor/menu1">활동조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.2">활동보고서 작성</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.3">멘토링 신청 내역 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.4">QR코드 생성</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.NavDropdown title="커뮤니티" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item href="#Mentor/menu1">공지사항</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.2">자유게시판</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.3">멘토링 모집</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>                        
                    </ReactBootStrap.NavDropdown>                  
                    <ReactBootStrap.NavDropdown title="쪽지" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item href="#Mentor/menu1">쪽지 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.2">쪽지 보내기</ReactBootStrap.NavDropdown.Item>
                        
                        <ReactBootStrap.NavDropdown.Divider/>                        
                    </ReactBootStrap.NavDropdown> 
     
                 
                </ReactBootStrap.Nav>
                <ReactBootStrap.Form inline="inline">                   
                <ReactBootStrap.Button variant="outline-light">회원정보</ReactBootStrap.Button>
                <ReactBootStrap.Button variant="outline-light" href="/">로그아웃</ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </ReactBootStrap.Navbar>
            hello, i'm HeaderMentor <br />
            <BrowserRouter>
                    <ButtonGroup>
                        <Link to={`${match.url}/menu1`}><Button>Menu 1</Button></Link>
                        <Link to={`${match.url}/menu2`}><Button>Menu 2</Button></Link>
                        <Link to={`${match.url}/menu3`}><Button>Menu 3</Button></Link>
                        <Link to={`${match.url}/menu4`}><Button>Menu 4</Button></Link>
                        <Button onClick={() => history.goBack()} >history.goBack() / go back</Button>
                        <Button onClick={() => history.push("/")} >history.push("/") / HOME</Button>
                    </ButtonGroup>
                    <hr></hr>
                <Switch>
                    <Route exact path ={`${match.path}/menu1`} children={MentorMenu1}></Route>
                    <Route exact path ={`${match.path}/menu2`} children={MentorMenu2}></Route>
                    <Route exact path ={`${match.path}/menu3`} children={MentorMenu3}></Route>
                    <Route exact path ={`${match.path}/menu4`} children={MentorMenu4}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default HeaderMentor;