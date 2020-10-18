import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import MentorMenu1 from './MentorMenu1';
import MentorMenu2 from './MentorMenu2';
import MentorMenu3 from './MentorMenu3';
import MentorMenu4 from './MentorMenu4';

function HeaderMentor({match, history}) {
    return (
        <div>
            hello, i'm HeaderMentor <br />
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
                    <Route exact path ={`${match.path}/menu1`} children={MentorMenu1}></Route>
                    <Route exact path ={`${match.path}/menu2`} children={MentorMenu2}></Route>
                    <Route exact path ={`${match.path}/menu3`} children={MentorMenu3}></Route>
                    <Route exact path ={`${match.path}/menu4`} children={MentorMenu4}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default HeaderMentor;