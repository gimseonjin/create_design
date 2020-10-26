import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import RegionManagerMenu1 from './RegionManagerMenu1';
import RegionManagerMenu2 from './RegionManagerMenu2';
import RegionManagerMenu3 from './RegionManagerMenu3';
import RegionManagerMenu4 from './RegionManagerMenu4';
import * as ReactBootStrap from "react-bootstrap"; //nav
import ReadActivityHistory from '../Shared/ReadActivityHistory';

function HeaderRegionManager({match, history}) {
    return (
        <div>
             <ReactBootStrap.Navbar bg="primary" variant="dark"> 
                
                <ReactBootStrap.Navbar.Brand><span onClick={()=>history.push("/regionManager")} color="white" style={{cursor: 'pointer'}}>지역 본부 관리자</span></ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav><Link to={`${match.url}/readActivityHistory`} className="text-white my-auto">활동조회</Link></ReactBootStrap.Nav>
                <ReactBootStrap.NavDropdown title="인원관리" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item>소속멘토 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item>연계기관 담당자 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item>회원가입 승인</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item>소속본부 변경 요청 승인</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>
                <ReactBootStrap.Nav.Link href="#pricing">연계기관</ReactBootStrap.Nav.Link>
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
                <Route exact path={`${match.path}/readActivityHistory`} component={ReadActivityHistory}></Route>

            </Switch>
          
        </div>
    )
}
export default HeaderRegionManager;