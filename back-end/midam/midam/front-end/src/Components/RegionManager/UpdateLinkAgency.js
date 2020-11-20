import React,{useState, useEffect} from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

//연계기관 삭제
function UpdateLinkAgency(props) {
    const [linkAgencyInfo, setLinkAgencyInfo] = useState(props.linkAgencyInfo);

    function updateLinkAgency(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("linkAgencyCode",linkAgencyInfo[0]);
        axios.post("/linkAgency/updateLinkAgency/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
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
           

            <Form>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>연계기관 명</InputGroupText>
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
            </Form>
                    
            <Button color="danger" onClick={updateLinkAgency}>삭제</Button>
        </div>
    )
}
export default UpdateLinkAgency;