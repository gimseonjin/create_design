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

function PageRouter() {
    return(
        <div >
            
            <Switch>
                <Route exact path="/" component = {Login} />
                <Route exact path="/mentor" children={HeaderMentor} />
                <Route exact path="/regionManager" children={HeaderRegionManager} />
                <Route exact path="/linkAgencyManager" children={HeaderLinkAgencyManager} />
                <Route exact path="/systemManager" children={HeaderSystemManager} />
                <Route exact path="/SignIn" children={SignIn} />
                <Route exact path="/Inquiry" children={InquiryOfLinkAgency} />
                <Route path="/*" children={PageNotFound} />

            </Switch>
          
        
        </div>
    )
}
export default PageRouter;