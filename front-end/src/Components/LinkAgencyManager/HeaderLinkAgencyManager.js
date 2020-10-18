import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import LinkAgencyMenu1 from './LinkAgencyMenu1';
import LinkAgencyMenu2 from './LinkAgencyMenu2';
import LinkAgencyMenu3 from './LinkAgencyMenu3';
import LinkAgencyMenu4 from './LinkAgencyMenu4';

function HeaderLinkAgencyManager({match, history}) {
    return (
        <div>
            hello, i'm HeaderLinkAgencyManager        
            <br />
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
                    <Route exact path ={`${match.path}/menu1`} children={LinkAgencyMenu1}></Route>
                    <Route exact path ={`${match.path}/menu2`} children={LinkAgencyMenu2}></Route>
                    <Route exact path ={`${match.path}/menu3`} children={LinkAgencyMenu3}></Route>
                    <Route exact path ={`${match.path}/menu4`} children={LinkAgencyMenu4}></Route>
                </Switch>
            </BrowserRouter>    
        </div>
    )
}
export default HeaderLinkAgencyManager;