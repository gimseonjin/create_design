import React, {useEffect} from 'react';
import {Router, Switch, Route, Link, useLocation} from 'react-router-dom';
import HeaderMentor from '../Mentor/HeaderMentor';
import HeaderRegionManager from '../RegionManager/HeaderRegionManager';
import Login from './Login';
import HeaderLinkAgencyManager from '../LinkAgencyManager/HeaderLinkAgencyManager';
import HeaderSystemManager from '../SystemManager/HeaderSystemManager';
import SignInRouter from '../Shared/SignInRouter'
import InquiryOfLinkAgency from '../Shared/InquiryOfLinkAgency'
import PageNotFound from './PageNotFound';

function PageRouter() {
    useEffect(() => {
        if(!localStorage.getItem("userToken")){
            localStorage.setItem("userToken", "bearer: ");
        }
      });
    return(
        <div >
            <Switch>
                <Route exact path="/" component = {Login} />
                <Route path="/mentor" component={HeaderMentor} />
                <Route path="/regionManager" component={HeaderRegionManager} />
                <Route path="/linkAgencyManager" component={HeaderLinkAgencyManager} />
                <Route path="/systemManager" component={HeaderSystemManager} />
                <Route path="/SignIn" component={SignInRouter} />
                <Route path="/Inquiry" component={InquiryOfLinkAgency} />
                <Route path="/*" component={PageNotFound} />
            </Switch>
        </div>
    )
}
export default PageRouter;