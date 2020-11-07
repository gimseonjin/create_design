import React,{useState, useEffect} from 'react';
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
import QrScanner from '../Shared/QrScanner';
import '../Css/Header.css';
import axios from 'axios';

const HeaderLinkAgencyManager = ({match, history}) => {

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
        form.append('authority', '3');
        axios.post("http://localhost:8080/checkAuthority", form)
        .then((response)=>{
            if(response.data === "TRUE"){
                alert("success")
            }else{
                alert("FALSE");
                localStorage.removeItem("userToken");
                history.push("/");    
            }
        })
        }
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
        </div>
    )
}
export default HeaderLinkAgencyManager;