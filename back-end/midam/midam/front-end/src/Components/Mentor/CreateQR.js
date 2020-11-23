import axios from 'axios';
import Qrcode from 'qrcode.react';
import React,{useState} from 'react';
import { Button, Card, CardBody, CardText, CardTitle, Input } from 'reactstrap';

//QR 코드 생성
function CreateQR() {
    const [qr, setQr] = useState("qr");

    let QRValue = "";
    let activityCode = "";

    const [activityList, setActivityList] = useState("");

    const [isSelected, setIsSelected] = useState(0); //0 -> 활동시작, 1 -> 활동종료

    const toggleIsSelected =()=>{
        setIsSelected(!isSelected);
    }
    //옵션 리스트 출력용
    let activityArrays=[];
    function renderActivityToEnterList(activityArray, index){
        return(
        <option key={index} value={activityArray.activityCode}>{activityArray.activityName}</option>
        )
    }
    function renderActivityToExitList(activityArray, index){
        return(
        <option key={index} value={activityArray.activityHistoryCode}>{activityArray.activityName} : {activityArray.startTime}</option>
        )
    }

    //입장 할 활동 선택
    function readActivityToEnter(){
        setActivityList("");
        var form = new FormData();
        form.append("userToken",localStorage.getItem("userToken"));
        axios.post("/activityHistory/readActivityToEnter/mentor",form).then((response)=>{
            activityArrays=response.data;
            setActivityList(activityArrays.map(renderActivityToEnterList));
        });
    }

    //퇴장 할 입장한 상태인 활동 선택
    function readActivityToExit(){
       setActivityList("");
       var form = new FormData();
       form.append("userToken",localStorage.getItem("userToken"));
       axios.post("/activityHistory/readActivityToExit/mentor",form).then((response)=>{
            activityArrays=response.data;
            setActivityList(activityArrays.map(renderActivityToExitList));
       });
    }

    function createQR(){
        setQr(
            <Qrcode  value = {QRValue} size = "500" includeMargin = "true"></Qrcode>
        )
    }

    const activityOnChange = (e) =>{
        activityCode=e.target.value;
        QRValue=isSelected+","+localStorage.getItem("userToken")+","+activityCode;
        createQR();
    }

    useState(()=>{
        readActivityToEnter();
    },[])

    

    return (
        <div className="container">
            <Button onClick={()=>{
                setIsSelected(0);
                readActivityToEnter();
                }} active={isSelected===0}>활동시작</Button>
            <Button onClick={()=>{
                setIsSelected(1);
                readActivityToExit();
                }} active={isSelected===1}>활동종료</Button>
            
            <Input type="select" onChange={activityOnChange}>
                <option value="">선택안함</option>
                {activityList}
            </Input>

            {qr}

        </div>
    )
}
export default CreateQR;