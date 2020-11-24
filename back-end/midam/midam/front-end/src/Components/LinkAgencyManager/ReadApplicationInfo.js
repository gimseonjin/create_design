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

function ReadApplicationInfo(props) {

    const [mentorRecruitmentCode, setMentorRecruitmentCode] = useState(
        props.mentorRecruitmentCode
    );
    const [id, setId] = useState(
        props.id
    );
    const [motivation, setMotivation] = useState();
    const [career, setCareer] = useState();
    const [ability, setAbility] = useState();    


  
    const handleMentorRecruitmentCodeOnChange = (e) => {
        e.preventDefault();
        setMentorRecruitmentCode(e.target.value);
    }
    const handleIdOnChange = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }
    const handleMotivationOnChange = (e) => {
        e.preventDefault();
        setMotivation(e.target.value);
    }
    const handleCareerOnChange = (e) => {
        e.preventDefault();
        setCareer(e.target.value);
    }
    const handleAbilityOnChange = (e) => {
        e.preventDefault();
        setAbility(e.target.value);
    }


    const readApplicationInfo = () => {
        var form = new FormData;
        form.append('id', id);
        form.append('mentorRecruitmentCode',mentorRecruitmentCode);
        axios
            .post('/activity/readApplicationInfo', form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {               
                setId(response.data.id);             
                setMotivation(response.data.motivation);
                setAbility(response.data.ability);
                setCareer(response.data.career);

         
            })
    }

    const approvalPass = () => {
        var form = new FormData;

        form.append('id', props.id);
        form.append('mentorRecruitmentCode',props.mentorRecruitmentCode);
          

        axios
            .post('/activity/approvalPass', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                if(response.data.responseMsg ==-1){
                    alert('모집 정원이 초과되었습니다.');
                }
                window.location.reload();
            })
    } 
    const approvalFail = () => {
        var form = new FormData;

        form.append('id', props.id);
        form.append('mentorRecruitmentCode',props.mentorRecruitmentCode);
         

        axios
            .post('/activity/approvalFail', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                window.location.reload();
            })
    }    
   

   
    useEffect(() => {
    
        readApplicationInfo(); //게시글 상세조회
        

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
                            <InputGroupText>신청자 ID</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="id"
                            placeholder="ID"
                           onChange={handleIdOnChange}
                            value={id}
                            readOnly={true}></Input>
                    </InputGroup >
                    
                          
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>지원동기</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="motivation"
                         
                           onChange={handleMotivationOnChange}
                            value={motivation}
                            readOnly={true}></Input>
                    </InputGroup >
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>경력</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="career"
                         
                           onChange={handleCareerOnChange}
                            value={career}
                            readOnly={true}></Input>
                    </InputGroup >
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>

                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>특기</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            type="textarea"
                            name="ability"
                         
                           onChange={handleAbilityOnChange}
                            value={ability}
                            readOnly={true}></Input>
                    </InputGroup >
                   


                  
                </FormGroup>

            <Button type="post" color ="success" onClick={approvalPass}>합격</Button>
            <Button  type="post" color ="danger" onClick={approvalFail}>탈락</Button>
            </Form>

  

            

           
            
        </div>
    )
}
export default ReadApplicationInfo;
