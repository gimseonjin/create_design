import React from 'react';
import {Router, Switch, Route, Link, useLocation} from 'react-router-dom';
import HeaderMentor from '../Mentor/HeaderMentor';
import HeaderRegionManager from '../RegionManager/HeaderRegionManager';
import Login from './Login';
import HeaderLinkAgencyManager from '../LinkAgencyManager/HeaderLinkAgencyManager';
import HeaderSystemManager from '../SystemManager/HeaderSystemManager';
import SignIn from '../Shared/SignIn'
import InquiryOfLinkAgency from '../Shared/InquiryOfLinkAgency'
import PageNotFound from './PageNotFound';

function SignInRouter() {
    return(
        <div >
            
            <Switch>
                <Route exact path="/" component = {Login} />
                <Route exact path="/mentor" component={HeaderMentor} />
                <Route exact path="/regionManager" component={HeaderRegionManager} />
                <Route exact path="/linkAgencyManager" component={HeaderLinkAgencyManager} />
                <Route exact path="/systemManager" component={HeaderSystemManager} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/Inquiry" component={InquiryOfLinkAgency} />
                <Route path="/*" component={PageNotFound} />

            </Switch>
          
        
        </div>
    )
}
export default PageRouter;