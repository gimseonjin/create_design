import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import SystemManagerMenu1 from '../Pages/SystemManagerMenu1';
import SystemManagerMenu2 from '../Pages/SystemManagerMenu2';
import SystemManagerMenu3 from '../Pages/SystemManagerMenu3';
import SystemManagerMenu4 from '../Pages/SystemManagerMenu4';

function HeaderSystemManager({match, history}) {
    return (
        <div>
            hello, i'm HeaderSystemManager
            <br></br>
            <BrowserRouter>
                    <ButtonGroup>
                        <Link to={`${match.url}/menu1`}><Button>Menu 1</Button></Link>
                        <Link to={`${match.url}/menu2`}><Button>Menu 2</Button></Link>
                        <Link to={`${match.url}/menu3`}><Button>Menu 3</Button></Link>
                        <Link to={`${match.url}/menu4`}><Button>Menu 4</Button></Link>
                        <Button onClick={() => history.goBack()} >history.goBack() / go back</Button>
                        <Button onClick={() => history.push("/")} >history.push("/") / HOME</Button>
                    </ButtonGroup>
                    <hr></hr>
                <Switch>
                    <Route exact path ={`${match.path}/menu1`} children={SystemManagerMenu1}></Route>
                    <Route exact path ={`${match.path}/menu2`} children={SystemManagerMenu2}></Route>
                    <Route exact path ={`${match.path}/menu3`} children={SystemManagerMenu3}></Route>
                    <Route exact path ={`${match.path}/menu4`} children={SystemManagerMenu4}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default HeaderSystemManager;