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

function CreateRecruitment(props) {

  
   
    
    const [activityName, setActivityName] =useState();
    const [numberOfMentor, setNumberOfMentor] =useState();
    const [activityInfo, setActivityInfo] =useState();
    const [startDate, setStartDate] =useState(setDefualtStartdate());
    const [finishDate, setFinishDate] =useState(setDefualtFinishdate());
  
   
    const handleActivityNameOnChange = (e) => {
        e.preventDefault();
        setActivityName(e.target.value);
    }
    const handleNumberOfMentorOnChange = (e) => {
        e.preventDefault();
        setNumberOfMentor(e.target.value);
    }
    const handleActivityInfoOnChange = (e) => {
        e.preventDefault();
        setActivityInfo(e.target.value);
    }
    const handleStartDateOnChange = (e) => {
        e.preventDefault();
        setStartDate(e.target.value);
    }
    const handleFinishDateOnChange = (e) => {
        e.preventDefault();
        setFinishDate(e.target.value);
    }
    function setDefualtStartdate(){ 
        let today = new Date();
        today.setDate(today.getDate());
        let date = ("0"+(today.getDate())).slice(-2);
        let month = ("0"+(today.getMonth()+1)).slice(-2);
        let year = today.getFullYear();
        return (year+"-"+month+"-"+date);
     }
    function setDefualtFinishdate(){  //기본 한달로 지정
        let today = new Date();
        let date = ("0"+(today.getDate())).slice(-2);
        let month = ("0"+(today.getMonth()+2)).slice(-2);
        let year = today.getFullYear();
        return (year+"-"+month+"-"+date);
     }
     
    const createRecruitment = () => {
        var form = new FormData;
        form.append('userToken', localStorage.getItem("userToken"));
        
        form.append("activityName", activityName);
        form.append("numberOfMentor", numberOfMentor);
        form.append("activityInfo", activityInfo);
        form.append("startDate", startDate);
        form.append("finishDate", finishDate);
        axios
            .post('http://localhost:8080/activity/createRecruitment', form, {
                headers: {
                    'content-type': 'multipart/form-data'
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
                            <InputGroupText>활동명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="content" onChange={handleActivityNameOnChange}></Input>
                    </InputGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>모집인원</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="note" onChange={handleNumberOfMentorOnChange}></Input>
                    </InputGroup>

                
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" onChange={<InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" onChange={handleActivityInfoOnChange}></Input>
                    </InputGroup>}></Input>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동기간</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="startDate" value={startDate} onChange={handleStartDateOnChange}></Input>~
                        <Input type="date" name="endDate" value={finishDate} onChange={handleFinishDateOnChange}></Input>
                    </InputGroup>

                </FormGroup>

                <Button
                    className="btn btn-primary btn-block w-25"
                    style={{
                        float: 'right'
                    }}
                    type="post"
                    onClick={createRecruitment}>등록</Button>
               

            </Form>

        </div>
    )
}
export default CreateRecruitment;