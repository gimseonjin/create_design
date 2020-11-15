import React, {useEffect, useState} from 'react';
import '../Css/test.css';
import CreateApplication from '../Mentor/CreateApplication.js';
import $ from 'jquery';
import { Progress } from 'reactstrap';
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


function ReadRecruitmentInfo(props){

    const [mentorRecruitmentCode, setMentorRecruitmentCode] = useState(
        props.mentorRecruitmentCode
    );
    
    const [linkAgencyManagerId, setLinkAgencyManagerId] = useState();
    const [activityName, setActivityName] = useState();
    const [numberOfMentor, setNumberOfMentor] = useState();
    const [startDate, setStartDate] = useState();  
    const [finishDate, setFinishDate] = useState();
    const [activityInfo, setActivityInfo] = useState();
    const [passedNumber, setPassedNumber] = useState(); 
    const [modalInput, setModalInput] = useState("default");  
    const [isReadOnly, setIsReadOnly] = useState(true); //댓글 수정활성화  
    const [modalCreateApplication, setModalCreateApplication] =useState(false);    
    const toggleCreateApplication = () => setModalCreateApplication(!modalCreateApplication);

    
    const handleMentorRecruitmentCodeOnChange = (e) => {
        e.preventDefault();
        setMentorRecruitmentCode(e.target.value);
    }

    const handleLinkAgencyManagerIdOnChange = (e) => {
        e.preventDefault();
        setLinkAgencyManagerId(e.target.value);
    }
    const handleActivityNameOnChange = (e) => {
        e.preventDefault();
        setActivityName(e.target.value);
    }
    const handleNumberOfMentorOnChange = (e) => {
        e.preventDefault();
        setNumberOfMentor(e.target.value);
    }
    const handleStartDateOnChange = (e) => {
        e.preventDefault();
        setStartDate(e.target.value);
    }
    const handleFinishDateOnChange = (e) => {
        e.preventDefault();
        setFinishDate(e.target.value);
    }
    const handleActivityInfoOnChange = (e) => {
        e.preventDefault();
        setActivityInfo(e.target.value);
    }
    const handlePassedNumberOnChange = (e) => {
        e.preventDefault();
        setPassedNumber(e.target.value);
    }
    const toggleIsReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }

    const readRecruitmentInfo = () => { 
        var form = new FormData;
        form.append('mentorRecruitmentCode', mentorRecruitmentCode);
        axios.post('http://localhost:8080/activity/readRecruitmentInfo',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            setLinkAgencyManagerId(response.data.linkAgencyManagerId);
            setActivityName(response.data.activityName);    
            setNumberOfMentor(response.data.numberOfMentor);
            setStartDate(response.data.startDate);
            setFinishDate(response.data.finishDate); 
            setActivityInfo(response.data.activityInfo); 
            setPassedNumber(response.data.passedNumber);
            
        })
    }
   
    const updateRecruitment = () => {
        var form = new FormData;
      
        form.append("mentorRecruitmentCode", mentorRecruitmentCode);         

        axios
            .post('http://localhost:8080/activity/updateRecruitment', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                window.location.reload();
            })
    }    
   
  
    $(function() { 

              
           
            
            
            $(".create").off("click")
            $(".createButton").on("click",function(){
      
                var postButton = $(this);
    
                var tr = postButton.parent().parent();
                var td = tr.children();
                console.log("row데이터 : "+tr.eq(0).text());
                setModalInput(td.eq(0).val());
                toggleCreateApplication();
            }
            )  
        }
        
    )
    useEffect(() => {
        var form = new FormData;
       
        readRecruitmentInfo();   //게시글 상세조회
       
        },[]
    )
    return (
        <div className="container">   
      
      
            <Form>
                <FormGroup>
                    <InputGroup type="hidden">
                
    

                        <Input type="textarea" name="mentorRecruitmentCode" type="hidden" onChange={handleMentorRecruitmentCodeOnChange} value={mentorRecruitmentCode} readOnly={isReadOnly}></Input>
                    </InputGroup>
                    <InputGroup style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>담당자ID</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="linkAgencyManagerId" placeholder="담당자ID" onChange={handleLinkAgencyManagerIdOnChange} value={linkAgencyManagerId} readOnly={true} ></Input>
                    </InputGroup >

                    <InputGroup style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동 명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="activityName" placeholder="활동명" onChange={handleActivityNameOnChange} value={activityName} readOnly={isReadOnly}></Input>
                    </InputGroup>

                 
                    <InputGroup style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동기간</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="startDate" onChange={handleStartDateOnChange}  value={startDate}  readOnly={isReadOnly}></Input>~
                        <Input type="date" name="finishDate"  onChange={handleFinishDateOnChange} value={finishDate}  readOnly={isReadOnly}></Input>
                    </InputGroup>

                    <InputGroup style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend"  >
                            <InputGroupText >활동 내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="activityInfo" placeholder="내용" onChange={handleActivityInfoOnChange} value={activityInfo} readOnly={isReadOnly}></Input>
                    </InputGroup>   
                    
                    <InputGroup style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend"  >
                            <InputGroupText >모집 인원</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="activityInfo" placeholder="내용" onChange={handleNumberOfMentorOnChange} value={numberOfMentor} readOnly={isReadOnly}></Input>
                    </InputGroup> 
                    
                          
                    
                        <Progress onChange={handlePassedNumberOnChange} value={(passedNumber/numberOfMentor)*100}>{passedNumber}명</Progress>
                   
                          
                </FormGroup>
            </Form>

            <Button onClick={toggleIsReadOnly}>수정</Button>
            <Button type="hidden" color="primary" onClick={updateRecruitment} >완료</Button>
      
         
            <Modal isOpen={modalCreateApplication}>
                        <ModalHeader toggle={toggleCreateApplication}>모집 신청</ModalHeader>
                       
                         <CreateApplication mentorRecruitmentCode={modalInput}></CreateApplication>                         
            </Modal>
                                  
            <Button className="btn btn-primary btn-block w-25" color={"primary"} style={{float: 'right'}}   type="post" onClick={""}>{"모집 신청"}</Button>
            <div>
 
      
   
     
    </div>
            </div>            
    )
}
export default ReadRecruitmentInfo;
