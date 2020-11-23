import React, {useState} from 'react';
import {
    Button,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';
import axios from 'axios';

function CreateActivityHistory(props) {


    const [activity, setActivity] = useState(
        props.activity
    );
    const [mentorId ,setMentorId] =useState();  
    const [startTime, setStartTime] =useState();

    const handleActivityOnChange = (e) => {
        e.preventDefault();
        setActivity(e.target.value);
    }      
 

    const handleMentorIdOnChange = (e) => {
        e.preventDefault();
        setMentorId(e.target.value);
    }

    const handleStartTimeOnChange = (e) => {
        e.preventDefault();
        setStartTime(e.target.value);
    }
  
     
    const createActivityHistory = () => {
        var form = new FormData;
        form.append('userToken', localStorage.getItem("userToken"));    
        form.append("activity", activity);  
        form.append("mentorId", mentorId);     
        form.append("startTime", startTime);
   
        axios
            .post('http://localhost:8080/activityHistory/createActivityHistory', form, {
                headers: {
              
                }
            })
            .then((response) => {})
    }

    return (
        <div className="container">

            <Form >
                <FormGroup>

                    
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="activity" value={activity} readOnly={true} onChange={handleActivityOnChange}></Input>
                    </InputGroup>

                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>멘토ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="content" value={mentorId} onChange={handleMentorIdOnChange}></Input>
                    </InputGroup>                    

                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동시각</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="startTime" placeholder="출근 :2020-00-00 00:00:00" value={startTime} onChange={handleStartTimeOnChange}></Input> 
                       
                    </InputGroup>

                </FormGroup>

                <Button
                    className="btn btn-primary btn-block w-25"
                    style={{
                        float: 'right'
                    }}
                    type="post"
                    onClick={createActivityHistory}>등록</Button>
               

            </Form>

        </div>
    )
}
export default CreateActivityHistory;