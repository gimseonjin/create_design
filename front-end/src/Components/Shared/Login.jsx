import React, { useState, Component } from 'react';
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

class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
          button: true // true = linkmanager, false = mentor
        }
        this.handleClick = this.handleClick.bind(this);
      }
      handleClick(){
        this.setState({
          button:!this.state.button
        })
      }

    render() {
        return (
            <div class="login_container " className = "d-flex justify-content-center align-self-center" style = {{margin : "100px"}}>
                <Form>
                    <div class = "logo">
                        <img src={midamLogo} art="midam"></img>
                        <h3>미담장학회 멘토 관리 시스템</h3>
                        <hr class = "under_line"></hr>
                    </div>
                    <FormGroup>
                        
                        <ButtonGroup className = "w-100" style = {{marginBottom : '5px'}}>
                            <Button className = "w-50" color={this.state.button ? "secondary": "#f8f7df"} onClick={this.handleClick}>멘토</Button>
                            <Button className = "w-50" color={this.state.button ? "#f8f7df": "secondary"} onClick={this.handleClick}>기관 담당자</Button>
                        </ButtonGroup>
    
                        <div className = "d-flex justify-content-around align-self-center">
                            <Input name="id" id="loginId" placeholder="아이디를 입력하세요"
                                style = {{marginBottom : '5px'}}/>    
                        </div>
    
                        <div className = "d-flex justify-content-around align-self-center">
                            <Input
                                type="password"
                                name="password"
                                id="loginPassword"
                                placeholder="비밀번호를 입력하세요"
                                style = {{marginBottom : '5px'}}
                                />
                        </div>
    
                        <Button className = "w-100">로그인</Button>
                        
                        <hr class = "under_line"></hr>
    
                    </FormGroup>
                    <div className = "d-flex justify-content-center align-self-center">
                        <Link to={`/signUp`} style={{ textDecoration: 'none', color : 'black', fontSize : '10px', marginRight : '2%', marginLeft : '2%'}}>회원 가입</Link> 
                        <div class="vl"></div>                       
                        <Link to={`/findId`} style={{ textDecoration: 'none', color : 'black', fontSize : '10px', marginRight : '2%', marginLeft : '2%'}}>아이디 찾기</Link>
                        <div class="vl"></div>
                        <Link to={`/findPw`} style={{ textDecoration: 'none', color : 'black', fontSize : '10px', marginRight : '2%', marginLeft : '2%'}}>비밀번호 찾기</Link>
                    </div>

                </Form>
            </div>
        );
    }
}
export default Login;