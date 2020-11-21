import React,{useState, useEffect} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

//연계기관 삭제
function DeleteLinkAgency(props) {
    const [linkAgencyInfo, setLinkAgencyInfo] = useState(props.linkAgencyInfo);

    function deleteLinkAgency(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("linkAgencyCode",linkAgencyInfo[0]);
        axios.post("/linkAgency/deleteLinkAgency/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }

    return (
        <div>
            <p>정보를 잘 확인한 후 삭제해주세요. 해당 연계기관에 소속된 담당자도 모두 비활성화 됩니다.</p>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>연계기관 이름</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyInfo[1]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>연계기관 주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyInfo[2]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>연계기관 정보</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={linkAgencyInfo[3]}></Input>
            </InputGroup>
           

          
            <Button color="danger" onClick={deleteLinkAgency}>삭제</Button>
        </div>
    )
}
export default DeleteLinkAgency;