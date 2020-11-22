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
import '../Css/Header.css';
import QrScanner from '../Shared/QrScanner';
import axios from 'axios';
import ReadMentorAndRegionManager from './ReadMentorAndRegionManager';
import ReadRegion from './ReadRegion';
import ReadPost from '../Shared/ReadPost';
import CreatePost from '../Shared/CreatePost';

import ReadRecruitment from '../Shared/ReadRecruitment';
import ReadMessage from '../Shared/ReadMessage';

const HeaderSystemManager = ({match, history}) => {

    let form = new FormData();
    const [isOpen, setIsOpen] = useState(false);
    const [buttonColor, setButtonColor] = useState();
    const toggle = () => setIsOpen(!isOpen);
    const [Modal, open, close, isOpenPop] = useModal('root', {
        preventScroll: true
    });
    const [numberOfMessage, setNumberOfMessage] = useState();
    const handleNumberOfMessageOnChange = (e) => {
        e.preventDefault();
        setNumberOfMessage(e.target.value);
    }
    const handleButtonColorOnChange = (e) => {
        e.preventDefault();
        setButtonColor(e.target.value);
    }
    const readNumberOfMessage = () =>{
        var form = new FormData;      
       
        form.append('userToken', localStorage.getItem("userToken"));
       
        axios.post("http://localhost:8080/community/message/number", form,{headers: {'content-type':'multipart/form-data'}})
        .then((response)=>{
            setNumberOfMessage(response.data.numberOfMessage);
            if(response.data.numberOfMessage >0){
               setButtonColor("warning");
            }else{
                setButtonColor("primary");
            }
            
     })
    }

    useEffect(() => {
        readNumberOfMessage();//받은 쪽지 갯수
        if(!localStorage.getItem("userToken") || localStorage.getItem("userToken") === "bearer: "){
            alert("Pleas Login");
            history.push("/");    
        }else{
        form.append('userToken', localStorage.getItem("userToken"));
        form.append('authority', '4');
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
                                                <DropdownItem ><Link to ={`${match.url}/readMentorAndRegionManager`}><span>지역본부 멘토 및 관리자 조회</span></Link></DropdownItem>
                                           
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">지역본부 관리</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem ><Link to ={`${match.url}/readRegion`}><span>지역본부 조회</span></Link></DropdownItem>
                                  
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
                                                <DropdownItem><Link to={`${match.url}/readRecruitment`}><span>멘토링 모집</span></Link></DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                </NavItem>
                                <NavItem>
                                    
                                    <UncontrolledDropdown nav inNavbar>
                                    <Link to={`${match.url}/readMessage`}><Button color={buttonColor} onChange={handleNumberOfMessageOnChange}><span>쪽지</span><span> </span><span>{numberOfMessage}</span></Button></Link>
                                          
                                   
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

                    <Switch>
                        {/* 회원 관리 */}
                        <Route exact path={`${match.path}/readMentorAndRegionManager`} component={ReadMentorAndRegionManager}></Route>

                        {/* 지역본부 관리 */}
                        <Route exact path={`${match.path}/readRegion`} component={ReadRegion}></Route>
                        <Route exact path={`${match.path}/readPost`} component = {ReadPost}></Route>
                <Route exact path={`${match.path}/createPost`} component = {CreatePost}></Route>
                <Route exact path={`${match.path}/readRecruitment`} component = {ReadRecruitment}></Route>
                <Route exact path={`${match.path}/readMessage`} component = {ReadMessage}></Route>
                    </Switch>
            </div>
        </div>
    )
}
export default HeaderSystemManager;