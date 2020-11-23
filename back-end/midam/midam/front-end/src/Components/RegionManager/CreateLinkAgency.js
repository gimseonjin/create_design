import React,{useState, useEffect} from 'react';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

//연계기관 수정
function CreateLinkAgency() {
    const [linkAgencyName, setLinkAgencyName] = useState();
    const [linkAgencyInfo, setLinkAgencyInfo] = useState();
    const [linkAgencyAddress, setLinkAgencyAddress] = useState();

    const handleChangeLinkAgencyNameOnChange=(e)=>{
        e.preventDefault();
        setLinkAgencyName(e.target.value);
    }

    const handleChangeLinkAgencyInfoOnChange=(e)=>{
        e.preventDefault();
        setLinkAgencyInfo(e.target.value);
    }
    
    const handleChangeLinkAgencyAddressOnChange=(e)=>{
        e.preventDefault();
        setLinkAgencyAddress(e.target.value);
    }


    function createLinkAgency(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("linkAgencyName",linkAgencyName);
        form.append("linkAgencyAddress",linkAgencyAddress);
        form.append("linkAgencyInfo",linkAgencyInfo);
        axios.post("/linkAgency/createLinkAgency/regionManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }

    return (
        <div>
          
          
            <h4>등록 정보 입력</h4>
                <Form>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>연계기관 명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={linkAgencyName} onChange={handleChangeLinkAgencyNameOnChange} ></Input>
                    </InputGroup>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>연계기관 주소</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={linkAgencyAddress} onChange={handleChangeLinkAgencyAddressOnChange} ></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>연계기관 정보</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={linkAgencyInfo} onChange={handleChangeLinkAgencyInfoOnChange} ></Input>
                    </InputGroup>
                </Form>
          
            <Button color="primary" onClick={createLinkAgency}>등록</Button>
        </div>
    )
}
export default CreateLinkAgency;