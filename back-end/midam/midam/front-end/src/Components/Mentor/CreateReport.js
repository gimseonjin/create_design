import React,{useState} from 'react';
import { Button, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';
import { Image } from 'react-bootstrap';

//활동보고서 작성
//활동 보고서 조회 페이지 필요할지. 여기서 함께할지 논의.
function CreateReport(props){
    const [activityHistoryCode, setActivityHistoryCode] = useState(props.activityHistoryCode);
    const [dayOfActivity, setDayOfActivity] = useState();
    const [mentorName, setMentorName] = useState();
    const [place, setPlace] = useState();
    const [content, setContent] = useState();
    const [file, setFile] = useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    let imagePreview = null;

    const handleImageOnChange = (e) => {
        e.preventDefault();
        
       let reader = new FileReader();
       let file = e.target.files[0];
       reader.onloadend = () => {
         setFile(file);
         setImagePreviewUrl(reader.result);
       }
       reader.readAsDataURL(file);
       
    }
 
   
    let $imagePreview = null;
   
    function submitReport(form){

    }

   
    
    return (
        <div className="container">
            <h1>props.activityHistoryCode : {activityHistoryCode}</h1>
            <Form>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동일자</InputGroupText>
                        </InputGroupAddon>
                         <Input type="text" name="dayOfActivity" placeholder="날짜" readOnly></Input>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>참여자</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="mentorName" placeholder="참여자 입력" readOnly></Input>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동 기관</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="활동 장소 입력" readOnly></Input>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="content" placeholder="활동내용입력"></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>특이사항</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" placeholder="특이사항 입력"></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동사진</InputGroupText>
                        </InputGroupAddon>
                        <CustomInput type="file" accept='image/jpg,impge/png,image/jpeg,image/gif' name="image" label="파일 선택" onChange={handleImageOnChange}>asdf</CustomInput>
                    </InputGroup>
                </FormGroup>
                <Button type="submit">제출</Button>
            </Form>
            <div className="mw-100">
                {!$imagePreview && <Image src={imagePreviewUrl} className="mw-100"></Image>}
            </div>
        </div>
    )
}
export default CreateReport;