import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link, HashRouter} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';

import * as ReactBootStrap from "react-bootstrap"; //nav
import ApplyChangeRegion from './ApplyChangeRegion';
import ReadUserInformation from '../Shared/ReadUserInformation';
import UpdateUserInformation from '../Shared/UpdateUserInformation';
import Withdraw from '../Shared/Withdraw';
import ReadActivityHistory from '../Shared/ReadActivityHistory';
import CreateMentorRecruitment from '../LinkAgencyManager/CreateMentorRecruitment';
import CreateReport from './CreateReport';
import ReadMentoringApplication from './ReadMentoringApplication';
function HeaderMentor({match, history}) {
    return (
        <div>
            <HashRouter>
             <ReactBootStrap.Navbar bg="primary" variant="dark" > 
                <ReactBootStrap.Navbar.Brand href="/Mentor">미담장학회 멘토</ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.NavDropdown title="회원정보" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/applyChangeRegion`}>소속 본부 변경 요청</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/readUserInformation`}>회원 정보 조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/updateUserInformation`}>회원 정보 수정</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/withdraw`}>회원 탈퇴</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>
                </ReactBootStrap.NavDropdown>
                <ReactBootStrap.NavDropdown title="멘토링활동" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/readActivityHistory`}>활동조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/createReport`}>활동보고서 작성</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/readMentoringApplication`}>멘토링 신청 내역 조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.4">QR코드 생성</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.NavDropdown title="커뮤니티" id="basic-nav-dropdown">
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

            hello, i'm HeaderMentor <br />


            <Switch>
                <Route exact path={`${match.path}/applyChangeRegion`} children={ApplyChangeRegion}></Route>
                <Route exact path={`${match.path}/readUserInformation`} children={ReadUserInformation}></Route>
                <Route exact path={`${match.path}/updateUserInformation`} children={UpdateUserInformation}></Route>
                <Route exact path={`${match.path}/withdraw`} children={Withdraw}></Route>
                <Route exact path={`${match.path}/readActivityHistory`} children={ReadActivityHistory}></Route>
                <Route exact path={`${match.path}/createReport`} children={CreateReport}></Route>
                <Route exact path={`${match.path}/readMentoringApplication`} children={ReadMentoringApplication}></Route>
                
            </Switch>
            </HashRouter>
        </div>
    )
}
export default HeaderMentor;