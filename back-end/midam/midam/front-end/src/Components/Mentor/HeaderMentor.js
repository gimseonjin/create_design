import React,{useState} from 'react';
import {BrowserRouter, Router, Route, Switch, Link, HashRouter} from 'react-router-dom';
import {Button, 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle} from 'reactstrap';

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
import useModal from 'react-hooks-use-modal';
import QRCode from 'qrcode.react';
import midamLogo from '../img/midam.png';

const HeaderMentor = ({match, history}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [Modal, open, close, isOpenPop] = useModal('root', {
        preventScroll: true
    });
    
    const testFunction = () => {
        console.log(localStorage.getItem("id")+ ", " + localStorage.getItem("authority"));
    }
    return (
        <div>
            <div>
            <div class = "top-header">
                <div class = "left">
                    <img class = "headerLogo" src={midamLogo} art="midam"></img>
                    <h4 class = "title">미담장학회</h4>
                </div>
                
            </div>
            <div class ="nav-bar">
                <Navbar color="primary" light expand="md" padding = ".2%" variant="dark">
                    <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="#">
                                        <Link to={`${match.url}/readUserInformation`}><span class = "nav-title">회원정보</span></Link>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">멘토링활동</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>
                                                    <Link to={`${match.url}/readActivityHistory`}><span>활동조회</span></Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to={`${match.url}/createReport`}><span>활동보고서 작성</span></Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <Link to={`${match.url}/readMentoringApplication`}><span>멘토링 신청 내역 조회</span></Link>
                                                </DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">커뮤니티</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>
                                                    <Link to={`${match.url}/readPost`}><span>게시판 보기</span></Link>
                                                </DropdownItem>
                                                <DropdownItem><span>멘토링 모집</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">쪽지</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem><span>쪽지 조회</span></DropdownItem>
                                                <DropdownItem onClick={testFunction}><span>쪽지 보내기</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                
                                </Nav>
                                <Nav className="mr-right" navbar >
                                    <NavItem variant="outline-light">
                                        <div class = "right">
                                            <Button className = "header-bnt w-75" color="light" onClick={open}><span>내 QR 조회</span></Button>
                                            <Modal>
                                                <div className = "pop-up">
                                                    <Card className = "pop-card">
                                                        <CardBody>
                                                            <CardTitle>내 QR 정보</CardTitle>
                                                        </CardBody>
                                                        <QRCode value = {"test"} size = "100" includeMargin = "true"/>
                                                        <CardBody className = "pop-card" padding = "10px">
                                                            <CardText>QR 코드는 봉사활동 참가 확인용입니다.
                                                            <br/>타인에게 무단으로 넘겨주지 마세요.</CardText>
                                                            <Button onClick={close}>CLOSE</Button>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            </Modal>
                                            <Button className = "header-bnt w-75" color="light"><span>Log out</span></Button>
                                        </div>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </Navbar>  
            </div>
        </div>

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
            
        </div>
    )
}
export default HeaderMentor;