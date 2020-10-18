import React from 'react';
import {Router, Switch, Route, Link, useLocation} from 'react-router-dom';
import HeaderMentor from './HeaderMentor';
import HeaderRegionManager from './HeaderRegionManager';
import Login from '../Pages/Login';
import HeaderLinkAgencyManager from './HeaderLinkAgencyManager';
import HeaderSystemManager from './HeaderSystemManager';
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
                <Route path="/*" children={PageNotFound} />

            </Switch>
          
        
        </div>
    )
}
export default PageRouter;