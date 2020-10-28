import React, { useState } from 'react';
import {Router, Route, Link} from 'react-router-dom';
import {
    ButtonToggle,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row
} from 'reactstrap';
import midamLogo from '../img/midam.png';
import '../Css/Login.css'
import axios from 'axios';
import usePost from './usePost';

const Login = (props) => {
    
        const [rSelected, setRSelected] = useState(null);
        const [activeTab, setActiveTab] = useState(null);

 
        
        const [id, setId] = useState(null);
        const [password, setPassword] = useState(null);
        const handleSubmitId = (e) => {
             e.preventDefault();
            setId(e.target.value);
        }
        
        const handleSubmitPw = (e) => {
            e.preventDefault();
            setPassword(e.target.value);
       }

       const customPost = {

       }

        return (
            <div className = "login_container d-flex justify-content-center align-self-center" style = {{margin : "100px"}}>
                <Form>
                    <div class = "logo">
                        <img src={midamLogo} art="midam"></img>
                        <h3>미담장학회 멘토 관리 시스템</h3>
                        <hr class = "under_line"></hr>
                    </div>
                    <FormGroup>
                        
                        <ButtonGroup className = "w-100" style = {{marginBottom : '5px'}}>
                            <Button className = "w-25" color = 'primary' onClick={()=> setRSelected("mentor")}>멘토</Button>
                            <Button className = "w-25" color = 'primary' onClick={()=> setRSelected("regionManager")}>지역본부 관리자</Button>
                            <Button className = "w-25" color = 'primary' onClick={()=> setRSelected("linkAgencyManager")}>연계기관 담당자</Button>
                            <Button className = "w-25" color = 'primary' onClick={()=> setRSelected("systemManager")}>시스템 관리자</Button>
                        </ButtonGroup>
    
                        <div className = "d-flex justify-content-around align-self-center">
                            <Input name="id" id="loginId" placeholder="아이디를 입력하세요"  onChange={handleSubmitId}
                                style = {{marginBottom : '5px'}}/>    
                        </div>
    
                        <div className = "d-flex justify-content-around align-self-center">
                            <Input
                                type="password"
                                name="password"
                                id="loginPassword"
                                placeholder="비밀번호를 입력하세요"
                                onChange={handleSubmitPw}
                                style = {{marginBottom : '5px'}}
                                />
                        </div>
    
                        <Button color = 'primary' className = "w-100" onClick={()=>{
                            let form = new FormData();
                            form.append('id', id);
                            form.append('password', password);
                            axios.post("http://localhost:8080/testPost", form).then((response)=>{setId(response.data.authority) })
                            }}>로그인</Button>
                            {id}
                            
                        
                        <Link to={`/${rSelected}`}><Button color = 'primary' className = "w-100" >바로가기-test용</Button></Link>
                        
                        <hr class = "under_line"></hr>
    
                    </FormGroup>
                    <div className = "d-flex justify-content-center align-self-center">
                        <Link to={`/SignIn`} style={{ textDecoration: 'none', color : 'black', fontSize : '10px', marginRight : '2%', marginLeft : '2%'}}>회원 가입</Link> 
                        <div class="vl"></div>                       
                        <Link to={`/Inquiry`} style={{ textDecoration: 'none', color : 'black', fontSize : '10px', marginRight : '2%', marginLeft : '2%'}}>연계 기관 문의</Link>
                    </div>

                </Form>
            </div>
        );
}
export default Login;