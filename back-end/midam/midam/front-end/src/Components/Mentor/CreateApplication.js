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

function CreateApplication(props) {

    const [mentorRecruitmentCode, setMentorRecruitmentCode] = useState(
        props.mentorRecruitmentCode
    );

    const [motivation, setMotivation] = useState();
    const [career, setCareer] = useState();
    const [ability, setAbility] = useState();

    const handleMentorRecruitmentCodeOnChange = (e) => {
        e.preventDefault();
        setMentorRecruitmentCode(e.target.value);
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

    const createApplication = () => {
        var form = new FormData;
        form.append('userToken', localStorage.getItem("userToken"));
        form.append("mentorRecruitmentCode", mentorRecruitmentCode);

        form.append("motivation", motivation);
        form.append("career", career);
        form.append("ability", ability);
        axios
            .post('/activity/createApplication', form)
            .then((response) => {
               
                 

                    if(response.data.responseMsg ==-1){
                        alert('소속 지역본부가 아닙니다.');
                    }
                    
            })
    }

    return (
        <div className="container">

            <Form >
                <FormGroup>
                
                    <InputGroup type="hidden">

                        <Input
                            type="hidden"
                            name="mentorRecruitmentCode"
                            onChange={handleMentorRecruitmentCodeOnChange}
                           
                        ></Input>
                    </InputGroup>
              
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>지원 동기</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="motivation" onChange={handleMotivationOnChange}></Input>
                    </InputGroup>
                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>관련 경력사항</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="career" onChange={handleCareerOnChange}></Input>
                    </InputGroup>

                    <InputGroup
                        style={{
                            marginTop: "1%",
                            marginBottom: "1%"
                        }}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>특기</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="ability" onChange={handleAbilityOnChange}></Input>
                    </InputGroup>
                </FormGroup>
                <Button
                    className="btn btn-primary btn-block w-25"
                    color={"primary"}
                    style={{
                        float: 'right'
                    }}
                    onClick={createApplication}>신청
                </Button>
               

            </Form>
 
        </div>
    )
}
export default CreateApplication;