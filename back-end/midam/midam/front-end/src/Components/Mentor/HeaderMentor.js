import React,{useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import {Button, 
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
    Card,
    CardText,
    CardBody,
    CardTitle,
    ModalHeader,
    Modal
} from 'reactstrap';


import ReadUserInformation from '../Shared/ReadUserInformation';
import ApplyChangeRegion from './ApplyChangeRegion';
import Withdraw from '../Shared/Withdraw';
import ReadActivityHistoryMentor from './ReadActivityHistoryMentor';

import ReadMentoringApplication from './ReadMentoringApplication';
import ReadPost from '../Shared/ReadPost';
import CreatePost from '../Shared/CreatePost';

import ReadRecruitment from '../Shared/ReadRecruitment';
import ReadMessage from '../Shared/ReadMessage';

import midamLogo from '../img/midam.png';
import establishment from '../img/establishment.png';
import axios from 'axios';
import CreateQR from './CreateQR';

const HeaderMentor = ({match, history}) => {
; 
    let form = new FormData();
    const [isOpen, setIsOpen] = useState(false);
    const [buttonColor, setButtonColor] = useState();
    const toggle = () => setIsOpen(!isOpen);
/*     const [Modal, open, close, isOpenPop] = useModal('root', {
        preventScroll: true
    });     */
    const [modalQR, setModalQR] = useState(false);
    const toggleModalQR = () =>{
        setModalQR(!modalQR);
    }

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
       
        axios.post("/community/message/number", form,{headers: {'content-type':'multipart/form-data'}})
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
        form.append('authority', '1');
        axios.post("/checkAuthority", form)
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
                                <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">회원정보</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>
                                                <Link to={`${match.url}/readUserInformation`}><span>회원정보 조회</span></Link>
                                                </DropdownItem>
                                                <DropdownItem>
                                                <Link to={`${match.url}/applyChangeRegion`}><span >지역본부 변경 신청</span></Link>
                                                </DropdownItem>
                                            </DropdownMenu>
                                    </UncontrolledDropdown>
                                        
                                    
                                    
             
                                   
                                </NavItem>
                                <NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret><span class = "nav-title">멘토링활동</span></DropdownToggle>
                                            <DropdownMenu left>
                                                <DropdownItem>
                                                    <Link to={`${match.url}/readActivityHistory`}><span>활동조회</span></Link>
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
                                                <DropdownItem><Link to={`${match.url}/createPost`}><span>게시글 작성</span></Link></DropdownItem>
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
                                            <Button className = "header-bnt w-75" color="light" onClick={toggleModalQR}><span>내 QR 조회</span></Button>

                                            <Button className = "header-bnt w-75" color="light" onClick = {
                                                () => {localStorage.removeItem("userToken");
                                                history.push("/")
                                                }}><span>로그아웃</span></Button>
                                               
                                        </div>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </Navbar>  


                   
            </div>
        </div>

            <Switch>
                <Route exact path={`${match.path}`} children={<img class = "establishment" src={establishment} art="midam"></img>}></Route>
                <Route exact path={`${match.path}/readUserInformation`} component={ReadUserInformation}></Route>
                <Route exact path={`${match.path}/applyChangeRegion`} component={ApplyChangeRegion}></Route>
                <Route exact path={`${match.path}/withdraw`} component={Withdraw}></Route>
                <Route exact path={`${match.path}/readActivityHistory`} component={ReadActivityHistoryMentor}></Route>
               
               
                {/* 활동 */}
                <Route exact path={`${match.path}/readActivityHistory`} component = {ReadActivityHistoryMentor}></Route>
                <Route exact path={`${match.path}/readMentoringApplication`} component = {ReadMentoringApplication}></Route>
                {/* 커뮤니티 */}
                <Route exact path={`${match.path}/readPost`} component = {ReadPost}></Route>
                <Route exact path={`${match.path}/createPost`} component = {CreatePost}></Route>
                <Route exact path={`${match.path}/readRecruitment`} component = {ReadRecruitment}></Route>
                <Route exact path={`${match.path}/readMessage`} component = {ReadMessage}></Route>

        
            </Switch>

            <Modal isOpen={modalQR}>
                        <ModalHeader className="bg-white" toggle={toggleModalQR}>내정보 QR</ModalHeader>
                        <CreateQR></CreateQR>
            </Modal>
        </div>
    )
}
export default HeaderMentor;