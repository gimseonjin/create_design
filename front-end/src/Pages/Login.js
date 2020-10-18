import React from 'react';
import {Router, Route, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar, Form ,FormGroup, Label, Input, Col, Row} from 'reactstrap';
import HeaderMentor from '../Components/HeaderMentor' ;
import PageRouter from '../Components/PageRouter';
import midamLogo from '../midam.png';
import '../Css/Login.css';

function Login() {
    return (
        <div class="container">
            
            <Form className = "d-flex justify-content-between">
                
                
                    <div>
                    <img src={midamLogo} width='20%' height='20%' art="midam"></img><br />
                        <FormGroup inline>
                            <Label for="loginId">ID</Label>
                            <Input name="id" id="loginId" placeholder="id_placeholder" />

                            <Label for="loginPassword">Password</Label>
                            <Input type="password" name="password" id="loginPassword" placeholder="password_placeholder" />
                            <Button>로그인</Button>
                        </FormGroup>

                        
                    </div><br />
                    
                
                </Form>
                <br />
        

                
                
                
                <ButtonGroup>
                    <Link to="/mentor"> <Button>Mentor</Button></Link>
                    <Link to="/regionManager"><Button>Region Manager</Button></Link>
                    <Link to="/linkAgencyManager"> <Button>Link Agency Manager</Button></Link>
                    <Link to="/systemManager"><Button>System Manager</Button></Link>
                </ButtonGroup>
        </div>
    )
}



export default Login;