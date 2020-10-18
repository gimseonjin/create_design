import React from 'react';
import {BrowserRouter, Router, Route, Switch, Link} from 'react-router-dom';
import {Button, ButtonGroup, ButtonToolbar} from 'reactstrap';
import RegionManagerMenu1 from '../Pages/RegionManagerMenu1';
import RegionManagerMenu2 from '../Pages/RegionManagerMenu2';
import RegionManagerMenu3 from '../Pages/RegionManagerMenu3';
import RegionManagerMenu4 from '../Pages/RegionManagerMenu4';


function HeaderRegionManager({match, history}) {
    return (
        <div>
            hello, i'm HeaderRegionManager
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
                    <Route exact path ={`${match.path}/menu1`} children={RegionManagerMenu1}></Route>
                    <Route exact path ={`${match.path}/menu2`} children={RegionManagerMenu2}></Route>
                    <Route exact path ={`${match.path}/menu3`} children={RegionManagerMenu3}></Route>
                    <Route exact path ={`${match.path}/menu4`} children={RegionManagerMenu4}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default HeaderRegionManager;