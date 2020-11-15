import React,{useState,useEffect} from 'react';
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
//import './Header.css';
import useModal from 'react-hooks-use-modal';
import '../Css/Header.css';
import QrScanner from '../Shared/QrScanner';
import axios from 'axios';
import ReadActivityHistoryRegionManager from './ReadActivityHistoryRegionManager';
import ReadApplicant from './ReadApplicant';

const HeaderRegionManager = ({match, history}) => {
    
    let form = new FormData();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [Modal, open, close, isOpenPop] = useModal('root', {
        preventScroll: true
    });
    useEffect(() => {
        if(!localStorage.getItem("userToken") || localStorage.getItem("userToken") === "bearer: "){
            alert("Pleas Login");
            history.push("/");    
        }else{
        form.append('userToken', localStorage.getItem("userToken"));
        form.append('authority', '2');
        axios.post("http://localhost:8080/checkAuthority", form)
        .then((response)=>{
            if(response.data === "TRUE"){
                //성공
            }else{
                alert("FALSE");
                localStorage.removeItem("userToken");
                history.push("/");    
            }
        })
        }
      },[]);

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
                                        <DropdownToggle nav caret><span class = "nav-title">회원 관리</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem >  <Link to={`${match.url}/readApplicant`}><span>회원 가입 신청자 조회</span></Link></DropdownItem>
                                                <DropdownItem ><span>~~</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                            <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">활동 관리</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem >  <Link to={`${match.url}/readActivityHistory`}><span>활동 내역 조회</span></Link></DropdownItem>
                                                <DropdownItem ><span>~~</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">커뮤니티</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem ><span>게시판 보기</span></DropdownItem>
                                                <DropdownItem ><span>멘토링 모집</span></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">쪽지</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem ><span>쪽지 조회</span></DropdownItem>
                                                <DropdownItem ><span>쪽지 보내기</span></DropdownItem>
                                                <DropdownItem ><span>멘토링 신청 내역 조회</span></DropdownItem>
                                                <DropdownItem ><span>QR코드 생성</span></DropdownItem>
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
                                                    <QrScanner/>
                                                    <Button onClick={close}>CLOSE</Button>
                                                </div>
                                            </Modal>
                                            <Button className = "header-bnt w-75" color="light" onClick = {
                                                () => {localStorage.removeItem("userToken");
                                                history.push("/")
                                                }}><span>Log out</span></Button>
                                        </div>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </Navbar>
            </div>

            <Switch>
                <Route exact path={`${match.path}/readActivityHistory`} component={ReadActivityHistoryRegionManager}></Route>
                <Route exact path={`${match.path}/readApplicant`} component={ReadApplicant}></Route>
            </Switch>
        </div>
    )
}
export default HeaderRegionManager;