import React, {useEffect, useState} from 'react';
import '../Css/test.css';

import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';

function ReadActivityHistoryInfo(props) {

    const [activityHistoryCode, setActivityHistoryCode] = useState(
        props.activityHistoryCode
    );
    const [activityName, setActivityName] = useState();
    const [name, setName] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [isReadOnly, setIsReadOnly] = useState(true); //댓글 수정활성화
    const handleActivityNameOnChange = (e) => {
        e.preventDefault();
        setActivityName(e.target.value);
    }

    const handleNameOnChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleStartTimeOnChange = (e) => {
        e.preventDefault();
        setStartTime(e.target.value);
    }

    const handleEndTimeOnChange = (e) => {
        e.preventDefault();
        setEndTime(e.target.value);
    }

    const toggleIsReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }
    const readActivityHistoryInfo = () => {
        var form = new FormData;

        form.append('activityHistoryCode', activityHistoryCode);
        axios
            .post('/activityHistory/readHistory/info', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                setName(response.data[0].name);   
                setActivityName(response.data[0].activityName);          
                setStartTime(response.data[0].startTime);
                setEndTime(response.data[0].endTime);
            
            })
    }
    const updateActivityHistory = () => {
        var form = new FormData;
        form.append('activityHistoryCode', activityHistoryCode);
        form.append("startTime", startTime);  
        form.append("endTime", endTime);       
     
        axios
            .post('/activityHistory/readHistory/update', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                window.location.reload();
            })
    }    
    useEffect(() => {
        readActivityHistoryInfo();
    }, [])
    return (
        <div className="container">

            <Form>
                <FormGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동명</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="activityName"
                            placeholder="activityName"
                            onChange={handleActivityNameOnChange}
                            value={activityName}
                            readOnly={true}></Input>
                    </InputGroup >

                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>이름</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="name"
                            placeholder="name"
                            onChange={handleNameOnChange}
                            value={name}
                            readOnly={true}></Input>
                    </InputGroup >

                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동시각</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="text"
                            name="startTime"
                            placeholder="출근 :2020-00-00 00:00:00"
                            onChange={handleStartTimeOnChange}
                            value={startTime}
                            readOnly={isReadOnly}></Input>             

                        <Input
                            type="text"
                            name="endTime"
                            placeholder="퇴근 :2020-00-00 00:00:00"
                            onChange={handleEndTimeOnChange}
                            value={endTime}
                            readOnly={isReadOnly}></Input>
                    </InputGroup >

                </FormGroup>

            </Form>
            <Button onClick={toggleIsReadOnly}>수정</Button>
            <Button type="hidden" color="primary" onClick={updateActivityHistory} >완료</Button>
        </div>
    )
}
export default ReadActivityHistoryInfo;
