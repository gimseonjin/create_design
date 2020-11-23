import React,{useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,

  } from 'reactstrap';
import midamLogo from '../img/midam.png';
import useModal from 'react-hooks-use-modal';
import QrScanner from '../Shared/QrScanner';

import ReadUserInformation from './ReadUserInformation';
import ReadPost from '../Shared/ReadPost';
import CreatePost from '../Shared/CreatePost';
import ReadMessage from '../Shared/ReadMessage';
import ReadRecruitment from '../Shared/ReadRecruitment';
import CreateRecruitment from './CreateRecruitment';
import ReadApplication from './ReadApplicationManager';
import '../Css/Header.css';
import axios from 'axios';

const HeaderLinkAgencyManager = ({match, history}) => {

    let form = new FormData();
    const [buttonColor, setButtonColor] = useState();
    const [numberOfMessage, setNumberOfMessage] = useState();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [Modal, open, close, isOpenPop] = useModal('root', {
        preventScroll: true
    });
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
        form.append('authority', '3');
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
                <Link to ={`${match.url}`}><img class = "headerLogo" src={midamLogo} art="midam"></img></Link>
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
                                        <DropdownToggle nav caret><span class = "nav-title">커뮤니티</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>
                                                    <Link to={`${match.url}/readPost`}><span>게시판 보기</span></Link>
                                                </DropdownItem>
                                                <DropdownItem ><Link to={`${match.url}/readRecruitment`}><span>멘토링 모집</span></Link></DropdownItem>
                                                <DropdownItem ><Link to={`${match.url}/createRecruitment`}><span>모집 등록</span></Link></DropdownItem>
                                                <DropdownItem ><Link to={`${match.url}/readApplication`}><span>멘토링 승인</span></Link></DropdownItem>
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
            </div>

            <Switch>
                <Route exact path={`${match.path}/readUserInformation`} component={ReadUserInformation}></Route>
           
                <Route exact path={`${match.path}/readPost`} component = {ReadPost}></Route>
                <Route exact path={`${match.path}/createPost`} component = {CreatePost}></Route>
                <Route exact path={`${match.path}/readRecruitment`} component = {ReadRecruitment}></Route>
                <Route exact path={`${match.path}/createRecruitment`} component = {CreateRecruitment}></Route>
                <Route exact path={`${match.path}/readApplication`} component = {ReadApplication}></Route> 
                <Route exact path={`${match.path}/readMessage`} component = {ReadMessage}></Route>                               
            </Switch>
        </div>

        
    )
}
export default HeaderLinkAgencyManager;