import React, {useEffect, useState} from 'react';
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
import {Image} from 'react-bootstrap';

//활동보고서 작성 활동 보고서 조회 페이지 필요할지. 여기서 함께할지 논의.
function CreateReport(props) {
    const [activityHistoryCode, setActivityHistoryCode] = useState(
        props.activityHistoryCode
    );
    const [dateOfActivity, setDateOfActivity] = useState("");
    const [linkAgencyName, setLinkAgencyName] = useState();
    const [activityName, setActivityName] = useState();
    const [mentorName, setMentorName] = useState();
    const [content, setContent] = useState();
    const [note, setNote] = useState();
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    let imagePreview = null;

    const handleImageOnChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let file = e
            .target
            .files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const handleContentOnChange = (e) => {
        e.preventDefault();
        setContent(e.target.value);
    }

    const handleNoteOnChange = (e) => {
        e.preventDefault();
        setNote(e.target.value);
    }

    let $imagePreview = null;

    const submitReport = () => {
        var form = new FormData;
        form.append("userToken", localStorage.getItem('userToken'));
        form.append("activityHistoryCode", activityHistoryCode);
        form.append("content",content);
        form.append("note",note);
        form.append("file",file);
        console.log(file);
        axios
            .post('/activityHistory/createReport/mentor', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
            })
    }

    function readReport () {
        var form = new FormData;
        form.append("userToken ", localStorage.getItem("userToken"));
        form.append("activityHistoryCode", activityHistoryCode);
        axios.post('/activityHistory/readReport/mentor',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            
            setDateOfActivity(response.data.startTime + " ~ " + response.data.endTime);
            setMentorName(response.data.mentorName);
            setActivityName(response.data.activityName);
            setLinkAgencyName(response.data.linkAgencyName);
           
        })
    }

    useEffect(()=>{
        readReport();
    },[])

    return (
        <div className="container">
            <h1>props.activityHistoryCode : {activityHistoryCode}</h1>
            <Form onSubmit={submitReport}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동일자</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="dateOfActivity" placeholder="날짜" readOnly="readOnly" value={dateOfActivity}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>참여자</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="mentorName" placeholder="참여자 입력" readOnly="readOnly" value={mentorName}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동 기관</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="활동 장소 입력" readOnly="readOnly" value={linkAgencyName}></Input>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="활동내용입력" onChange={handleContentOnChange}></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>특이사항</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" placeholder="특이사항 입력" onChange={handleNoteOnChange}></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동사진</InputGroupText>
                        </InputGroupAddon>
                        <CustomInput
                            type="file"
                            accept='image/jpg,impge/png,image/jpeg,image/gif'
                            name="file"
                            label="파일 선택"
                            onChange={handleImageOnChange}>asdf</CustomInput>
                    </InputGroup>
                </FormGroup>
                <Button type="submit">제출</Button>
                {!$imagePreview && <Image src={imagePreviewUrl} className="mw-100"></Image>}
            </Form>
            <div className="mw-100">
                
            </div>
        </div>
    )
}
export default CreateReport;