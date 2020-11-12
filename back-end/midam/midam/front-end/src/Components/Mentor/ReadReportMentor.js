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
const ReadReportMentor = (props) =>{
    const [activityHistoryCode, setActivityHistoryCode] = useState(
        props.activityHistoryCode
    );
    const [mentorName, setMentorName] = useState();
    const [linkAgencyName, setLinkAgencyName] = useState();
    const [activityName, setActivityName] = useState();
    const [content, setContent] = useState();
    const [note, setNote] = useState();
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");
    const [token, setToken] = useState(cookie.load("userToken"));
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [dateOfActivity, setDateOfActivity] = useState("");
    const [approvalDate, setApprovalDate] = useState("");
    const [approvalStatus, setApprovalStatus] = useState("");
    const [rejectionReason, setRejectionReason] = useState("");
    const [createDate, setCreateDate] = useState("");
    const [statusValue, setStatusValue] = useState("");

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

    function statusToValue(approvalStatusInt){
        var approvalValue="";
        switch(approvalStatusInt){
            case 0:
                approvalValue ="활동 중";
                break; 
            case 1:
                approvalValue ="활동 완료";
                break;
            case 2:
                approvalValue ="보고서 작성완료";
                break;
            case 3:
                approvalValue ="승인완료";
                break;
            case 4:
                approvalValue ="반려";
                break;
            case -1:
                approvalValue ="비활성화";
                break;
        }
        setStatusValue(approvalValue);
    }

    let $imagePreview = null;

    const updateReport = () => {
        var form = new FormData;
        form.append("userToken", token);
        form.append("activityHistoryCode", activityHistoryCode);
        form.append("content",content);
        form.append("note",note);
        form.append("file",file);
        axios
            .post('/activityHistory/updateReport/mentor', form,{headers: {'content-type':'multipart/form-data'}})
            .then((response) => {
                alert(response.data.responseMsg);
                window.location.reload();
            })
    }
    function readReport () {
        var form = new FormData;
        form.append("userToken ", localStorage.getItem("userToken"));
        form.append("activityHistoryCode", activityHistoryCode);
        axios.post('/activityHistory/readReport/mentor',form, {headers: {'content-type':'multipart/form-data'}}).then((response)=>{
            
            setContent(response.data.activityContent);
            setNote(response.data.note);
            setImagePreviewUrl(response.data.activityPictureBASE64);
            setFile(dataURLtoFile(response.data.activityPictureBASE64, 'picture'));
            setDateOfActivity(response.data.startTime + " ~ " + response.data.endTime);
            setMentorName(response.data.mentorName);
            setActivityName(response.data.activityName);
            setLinkAgencyName(response.data.linkAgencyName);
            setApprovalDate(response.data.approvalDate);
            setApprovalStatus(response.data.approvalStatus);
            setCreateDate(response.data.createDate);
            setRejectionReason(response.data.rejectionReason);
            statusToValue(response.data.approvalStatus);

        })
    }

    const dataURLtoFile = (dataurl, fileName) => {
    
        if(dataurl!==null){
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], fileName, {type:mime});
        }else{
            return null;
        }
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
                            <InputGroupText>멘토</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="mentorName" placeholder="참여자" readOnly={true} value = {mentorName}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>연계 기관</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="활동 장소" readOnly={true} value = {linkAgencyName}></Input>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동 이름</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="활동 장소" readOnly={true} value = {activityName}></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>승인 여부</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="" readOnly={true} value = {statusValue}></Input>
                    </InputGroup>
                    {approvalStatus===4?<InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>반려 사유</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="" readOnly={true} value = {rejectionReason}></Input>
                    </InputGroup> :""}
                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>보고서 작성일</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="" readOnly={true} value = {createDate}></Input>
                    </InputGroup>
                   {approvalStatus===3?
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>승인 날짜</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="place" placeholder="" readOnly={true} value = {approvalDate}></Input>
                </InputGroup> : ""}
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
                            onChange={handleImageOnChange} disabled={isReadOnly}></CustomInput>
                    </InputGroup>
                </FormGroup>
                {!$imagePreview && <Image src={imagePreviewUrl} className="mw-100"></Image>}
                <Button onClick={toggleIsReadOnly}>수정</Button>
                <Button className={isReadOnly? "invisible": ""} disabled={isReadOnly} color="danger" onClick={updateReport}>완료</Button>
                <Button className="float-right" color="primary" onClick={readReport}>조회</Button>
            
            </Form>
            <div className="mw-100">
                
            </div>
        </div>
    )
}
export default ReadReportMentor;