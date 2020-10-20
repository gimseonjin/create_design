import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import * as ReactBootStrap from "react-bootstrap"; //nav
function HeaderLinkAgencyManager({match, history}) {
    return (
        <div>
            <ReactBootStrap.Navbar bg="primary" variant="dark"> 
                <ReactBootStrap.Navbar.Brand href="/LinkAgencyManager">미담장학회 담당자</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.NavDropdown title="멘토링활동" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item href="#Mentor/menu1">활동조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.2">멘토 모집</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.3">멘토링 신청 내역 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.4">QR코드 스캔</ReactBootStrap.NavDropdown.Item>
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
                    <ReactBootStrap.Button variant="outline-light">로그아웃</ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </ReactBootStrap.Navbar>
            hello, i'm HeaderLinkAgencyManager        
            <br /> 
        </div>
    )
}
export default HeaderLinkAgencyManager;