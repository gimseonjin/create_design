import React, {useEffect, useState} from 'react';
import {
    Button,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader
} from 'reactstrap';
import axios from 'axios';

//활동보고서 작성 활동 보고서 조회 페이지 필요할지. 여기서 함께할지 논의.
const RejectReport = (props) =>{
    const [activityHistoryCode, setActivityHistoryCode] = useState(
        props.activityHistoryCode
    );
    const [rejectionReason, setRejectionReason] = useState("");

    const handleRejectionReasonOnChange = (e) => {
        e.preventDefault();
        setRejectionReason(e.target.value);
    }
    //반려
    function rejectReport(){
        var form = new FormData();
        form.append("activityHistoryCode", activityHistoryCode);
        form.append("userToken",localStorage.getItem("userToken"));
        form.append("rejectionReason", rejectionReason);
        axios.post("/activityHistory/rejectReport/regionManager",form).then((response)=>{
            alert(response.data.resultMessage);
        });
    }

    return (
        <div className="container">
            activityHistoryCode: {activityHistoryCode}
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>반려 사유 </InputGroupText>
                </InputGroupAddon>
                <Input type="text" name="rejectionReason" placeholder="반려 사유" onChange={handleRejectionReasonOnChange}></Input>
            </InputGroup>

            <Button color="danger" onClick={rejectReport}>반려하기</Button>
        </div>
    )
}
export default RejectReport;