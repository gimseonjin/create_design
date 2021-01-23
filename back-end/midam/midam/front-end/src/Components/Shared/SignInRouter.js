import React, {useState} from 'react';
import { Switch, Route, Link} from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';
import SignIn from '../Shared/SignIn';
import SignInLinkAgencyManager from '../Shared/SignInLinkAgencyManager';

const SignInRouter = ({match}, props) => {
const [rSelected, setRSelected]  = useState("mentor");



    return(
        <div >
            <ButtonGroup>
                <Link to = {`${match.url}/mentor`}><Button color="primary" onClick={() => setRSelected("mentor")} active={ rSelected=== "mentor"}>멘토</Button></Link>
                <Link to = {`${match.url}/linkAgencyManager`}><Button color="primary" onClick={() => setRSelected("linkAgencyManager")} active={ rSelected=== "linkAgencyManager"}>연계기관담당자</Button></Link>
            </ButtonGroup>
            
            <Switch>
                <Route exact path={`${match.path}/`} component={SignIn}></Route>
                <Route path={`${match.path}/mentor`} component={SignIn}></Route>
                <Route path={`${match.path}/linkAgencyManager`} component={SignInLinkAgencyManager}></Route>
            </Switch>
        </div>
    )
}
export default SignInRouter;