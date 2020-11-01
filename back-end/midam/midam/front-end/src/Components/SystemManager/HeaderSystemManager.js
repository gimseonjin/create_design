import React,{useState} from 'react';
import {BrowserRouter, Router, Route, Switch, Link, HashRouter} from 'react-router-dom';
import {
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
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
  } from 'reactstrap';
import midamLogo from '../img/midam.png';
import useModal from 'react-hooks-use-modal';
import '../Css/Header.css';

const HeaderSystemManager = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [Modal, open, close, isOpenPop] = useModal('root', {
        preventScroll: true
    });

    return (
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
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">커뮤니티</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem onClick = {()=>setSelectedMenu("게시판 보기")}><span>게시판 보기</span></DropdownItem>
                                                <DropdownItem onClick = {()=>setSelectedMenu("멘토링 모집")}><span>멘토링 모집</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">쪽지</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem onClick = {()=>setSelectedMenu("쪽지 조회")}><span>쪽지 조회</span></DropdownItem>
                                                <DropdownItem onClick = {()=>setSelectedMenu("쪽지 보내기")}><span>쪽지 보내기</span></DropdownItem>
                                                <DropdownItem onClick = {()=>setSelectedMenu("멘토링 신청 내역 조회")}><span>멘토링 신청 내역 조회</span></DropdownItem>
                                                <DropdownItem onClick = {()=>setSelectedMenu("QR코드 생성")}><span>QR코드 생성</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                
                                </Nav>
                                <Nav className="mr-right" navbar >
                                    <NavItem variant="outline-light">
                                        <div class = "right">

                                        <Button className = "header-bnt w-75" color="light" onClick={open}><span>QR 스캔</span></Button>
                                            <Modal>
                                                <div className = "pop-up">
                                                    <Test/>
                                                </div>
                                                 <Button onClick={close}>CLOSE</Button>
                                            </Modal>
                                            <Button className = "header-bnt w-75" color="light" onClick = {props.logOut}><span>Log out</span></Button>

                                        </div>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </Navbar>
            </div>
        </div>
    )
}
export default HeaderSystemManager;