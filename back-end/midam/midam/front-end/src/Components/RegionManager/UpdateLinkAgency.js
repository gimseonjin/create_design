import React,{useState, useEffect} from 'react';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

//연계기관 삭제
function UpdateLinkAgency(props) {
    const [linkAgencyInfo, setLinkAgencyInfo] = useState(props.linkAgencyInfo);
    const [changeLinkAgencyName, setChangeLinkAgencyName] = useState(linkAgencyInfo[1]);
    const [changeLinkAgencyInfo, setChangeLinkAgencyInfo] = useState(linkAgencyInfo[3]);
    const [changeLinkAgencyAddress, setChangeLinkAgencyAddress] = useState(linkAgencyInfo[2]);
    const [isReadOnly,setIsReadOnly] = useState(true);

    const handleChangeLinkAgencyNameOnChange=(e)=>{
        e.preventDefault();
        setChangeLinkAgencyName(e.target.value);
    }

    const handleChangeLinkAgencyInfoOnChange=(e)=>{
        e.preventDefault();
        setChangeLinkAgencyInfo(e.target.value);
    }
    
    const handleChangeLinkAgencyAddressOnChange=(e)=>{
        e.preventDefault();
        setChangeLinkAgencyAddress(e.target.value);
    }


    function updateLinkAgency(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("linkAgencyCode",linkAgencyInfo[0]);
        form.append("linkAgencyName",changeLinkAgencyName);
        form.append("linkAgencyAddress",changeLinkAgencyAddress);
        form.append("linkAgencyInfo",changeLinkAgencyInfo);
        axios.post("/linkAgency/updateLinkAgency/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }

    return (
        <div>
          
            <Row>
                <Col >
                <p>기존 정보</p>
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
            </Col>

            <Col>
            </Col>

            <Col>
            <p>변경 할 정보</p>
                <Form>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>연계기관 명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={changeLinkAgencyName} onChange={handleChangeLinkAgencyNameOnChange} readOnly={isReadOnly}></Input>
                    </InputGroup>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>연계기관 주소</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={changeLinkAgencyAddress} onChange={handleChangeLinkAgencyAddressOnChange} readOnly={isReadOnly}></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>연계기관 정보</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={changeLinkAgencyInfo} onChange={handleChangeLinkAgencyInfoOnChange} readOnly={isReadOnly}></Input>
                    </InputGroup>
                </Form>
            </Col>
            </Row>
            <Button color="primary" onClick={()=>setIsReadOnly(!isReadOnly)}>수정</Button>
            {!isReadOnly?<Button color="danger" onClick={updateLinkAgency}>완료</Button>:""}
        </div>
    )
}
export default UpdateLinkAgency;