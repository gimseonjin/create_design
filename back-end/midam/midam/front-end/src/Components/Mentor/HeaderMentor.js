import React,{useState} from 'react';
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
import ReadPost from '../Shared/ReadPost';
import UserListComponent from './showUser';
import Post from '../Shared/Post';

const HeaderMentor = ({match, history}) => {
    const testFunction = () => {
        console.log(localStorage.getItem("id")+ ", " + localStorage.getItem("authority"));
    }
    return (
        <div>
            
             <ReactBootStrap.Navbar bg="primary" variant="dark" color="white">
                <ReactBootStrap.Navbar.Brand><span onClick={()=>history.push("/mentor")} color="white" style={{cursor: 'pointer'}}>미담장학회 멘토</span></ReactBootStrap.Navbar.Brand>
                <ReactBootStrap.Nav className="mr-auto">
                <ReactBootStrap.NavDropdown title="회원정보" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item><Link as="/asdf" to={`${match.url}/readUserInformation`}>회원 정보 조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/withdraw`}>회원 탈퇴</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>
                </ReactBootStrap.NavDropdown>
                <ReactBootStrap.NavDropdown title="멘토링활동" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item><Link as="/test1" to={`${match.url}/readActivityHistory`}>활동조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link as="/test2" to={`${match.url}/createReport`}>활동보고서 작성</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/readMentoringApplication`}>멘토링 신청 내역 조회</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.4">QR코드 생성</ReactBootStrap.NavDropdown.Item>
                </ReactBootStrap.NavDropdown>
                        <ReactBootStrap.NavDropdown title="커뮤니티" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item><Link to={`${match.url}/readPost`}>게시판 보기</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Link as="test3" to={`${match.url}/axiosTest`}>API 테스트</Link></ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.3">멘토링 모집</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Divider/>                        
                    </ReactBootStrap.NavDropdown>                  
                    <ReactBootStrap.NavDropdown title="쪽지" id="basic-nav-dropdown">
                        <ReactBootStrap.NavDropdown.Item href="#Mentor/menu1">쪽지 조회</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item href="#action/3.2">쪽지 보내기</ReactBootStrap.NavDropdown.Item>
                        <ReactBootStrap.NavDropdown.Item><Button onClick={testFunction}>Test</Button></ReactBootStrap.NavDropdown.Item>
                        
                        <ReactBootStrap.NavDropdown.Divider/>                        
                    </ReactBootStrap.NavDropdown> 
     
                 
                </ReactBootStrap.Nav>
                <ReactBootStrap.Form inline="inline">                   
                <ReactBootStrap.Button variant="outline-light">회원정보</ReactBootStrap.Button>
                    <ReactBootStrap.Button variant="outline-light" onClick={()=>history.push("/")}>로그아웃</ReactBootStrap.Button>
                </ReactBootStrap.Form>
            </ReactBootStrap.Navbar>



            <Switch>
                <Route exact path={`${match.path}/readUserInformation`} component={ReadUserInformation}></Route>
                <Route exact path={`${match.path}/withdraw`} component={Withdraw}></Route>
                <Route exact path={`${match.path}/readActivityHistory`} component={ReadActivityHistory}></Route>
                <Route exact path={`${match.path}/createReport`} component={CreateReport}></Route>
                <Route exact path={`${match.path}/readMentoringApplication`} component={ReadMentoringApplication}></Route>
                
                {/* 활동 */}
                <Route exact path={`${match.path}/readActivityHistory`} component = {ReadActivityHistory}></Route>
                <Route exact path={`${match.path}/readMentoringApplication`} component = {ReadMentoringApplication}></Route>

                {/* 커뮤니티 */}
                <Route exact path={`${match.path}/readPost`} component = {ReadPost}></Route>

                <Route exact path={`${match.path}/axiosTest`} component = {Post}></Route>
            </Switch>
            
            <UserListComponent></UserListComponent>
        </div>
    )
}
export default HeaderMentor;