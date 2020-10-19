import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import RegionManagerMenu1 from './RegionManagerMenu1';
import RegionManagerMenu2 from './RegionManagerMenu2';
import RegionManagerMenu3 from './RegionManagerMenu3';
import RegionManagerMenu4 from './RegionManagerMenu4';
import * as ReactBootStrap from "react-bootstrap"; //nav

function HeaderRegionManager({match, history}) {
    return (
        <div>
             <ReactBootStrap.Navbar bg="primary" variant="dark"> 
                
                <ReactBootStrap.Navbar.Brand href="/RegionManager">미담장학회 관리자</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.Nav.Link href="#pricing">멘토링활동</ReactBootStrap.Nav.Link>
                <ReactBootStrap.NavDropdown title="인원관리" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item href="#Mentor/menu1">소속멘토 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.2">연계기관 담당자 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.3">회원가입 승인</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.3">소속본부 변경 요청 승인</ReactBootStrap.NavDropdown.Item>
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
                    <ReactBootStrap.Button variant="outline-light">로그아웃</ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </ReactBootStrap.Navbar>
            hello, i'm HeaderRegionManager
            <br></br>
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
                    <Route exact path ={`${match.path}/menu1`} children={RegionManagerMenu1}></Route>
                    <Route exact path ={`${match.path}/menu2`} children={RegionManagerMenu2}></Route>
                    <Route exact path ={`${match.path}/menu3`} children={RegionManagerMenu3}></Route>
                    <Route exact path ={`${match.path}/menu4`} children={RegionManagerMenu4}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default HeaderRegionManager;