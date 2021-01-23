import React from 'react';
import {Button} from 'reactstrap';
const PageNotFound = ({props, history}) => {
    return (
        <div>
            Wrong access, Page Not Found.
        
        <Button onClick={() => history.goBack()} >history.goBack() / go back</Button>
        <Button onClick={() => history.push("/")} >history.push("/") / HOME</Button>
        </div>
    )
}
export default PageNotFound;