import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import SystemManagerMenu1 from './SystemManagerMenu1';
import SystemManagerMenu2 from './SystemManagerMenu2';
import SystemManagerMenu3 from './SystemManagerMenu3';
import SystemManagerMenu4 from './SystemManagerMenu4';
import * as ReactBootStrap from "react-bootstrap"; //nav
import ReadRegion from './ReadRegion';
function HeaderSystemManager({match, history}) {
    return (
        <div>

<ReactBootStrap.Navbar bg="primary" variant="dark"> 
                
                <ReactBootStrap.Navbar.Brand><span onClick={()=>history.push("/systemManager")} color="white" style={{cursor: 'pointer'}}>시스템 관리자</span></ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">

                <ReactBootStrap.NavDropdown title="지역본부" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/readRegion`}>지역본부 조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>                        
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

            <Switch>
                <Route path={`${match.path}/readRegion`} component={ReadRegion}></Route>
            </Switch>
        </div>
    )
}
export default HeaderSystemManager;