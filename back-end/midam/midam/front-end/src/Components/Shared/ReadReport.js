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
import cookie from 'react-cookies';

//활동보고서 작성 활동 보고서 조회 페이지 필요할지. 여기서 함께할지 논의.
const ReadReport = (props) =>{
    const [activityHistoryCode, setActivityHistoryCode] = useState(
        props.activityHistoryCode
    );
    const [mentorName, setMentorName] = useState();
    const [place, setPlace] = useState();
    const [content, setContent] = useState();
    const [note, setNote] = useState();
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [token, setToken] = useState(cookie.load("userToken"));
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [dateOfActivity, setDateOfActivity] = useState("");

    const toggleIsReadOnly = () => {
        setIsReadOnly(!isReadOnly);
    }

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

    const updateReport = () => {
        var form = new FormData;
        console.log("update");
        form.append("userToken", token);
        form.append("activityHistoryCode", activityHistoryCode);
        form.append("content",content);
        form.append("note",note);
        form.append("file",file);
        axios
            .post('/activityHistory/createReport/mentor', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                alert(response.data.responseMsg);
            })
    }
    function readReport () {
        var form = new FormData;
        form.append("userToken ", cookie.load("userToken"));
        form.append("activityHistoryCode", activityHistoryCode);
        axios.post('/activityHistory/readReport/mentor',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            
            setContent(response.data.activityContent);
            setNote(response.data.note);
            setImagePreviewUrl(response.data.activityPictureBASE64);
            setDateOfActivity(response.data.startTime + " ~ " + response.data.endTime);
            console.log("readReport");
            

        })

    }
    useEffect(()=>{
        readReport();
    },[])

    return (
        <div className="container">
            <h1>props.activityHistoryCode : {activityHistoryCode}</h1>
            <Form>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동일자</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="dayOfActivity" placeholder="날짜" readOnly={true} value = {dateOfActivity}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>참여자</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="mentorName" placeholder="참여자 입력" readOnly={true}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동 기관</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="활동 장소 입력" readOnly={true}></Input>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="활동내용입력" onChange={handleContentOnChange} value={content} readOnly={isReadOnly}></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>특이사항</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" placeholder="특이사항 입력" onChange={handleNoteOnChange} value={note} readOnly={isReadOnly}></Input>
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
                            onChange={handleImageOnChange} readOnly={isReadOnly}>asdf</CustomInput>
                    </InputGroup>
                </FormGroup>
                {!$imagePreview && <Image src={imagePreviewUrl} className="mw-100"></Image>}
                <Button onClick={toggleIsReadOnly}>수정</Button>
                <Button type="hidden" color="danger" onClick={updateReport}>완료</Button>
                <Button onClick={readReport}>조회</Button>
            
            </Form>
            <div className="mw-100">
                
            </div>
        </div>
    )
}
export default ReadReport;