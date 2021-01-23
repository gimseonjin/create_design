import React,{useState, useEffect} from 'react';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

//지역본부 삭제
function CreateRegion() {
    const [regionName, setRegionName] = useState("");
    const [regionAddress, setRegionAddress] = useState("");
  
    const handleChangeRegionNameOnChange=(e)=>{
        e.preventDefault();
        setRegionName(e.target.value);
    }
    
    const handleChangeRegionAddressOnChange=(e)=>{
        e.preventDefault();
        setRegionAddress(e.target.value);
    }


    function createRegion(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("regionName",regionName);
        form.append("regionAddress",regionAddress);
        axios.post("/region/createRegion/systemManager",form).then((response)=>{
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
                            <InputGroupText>지역본부 명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={regionName} onChange={handleChangeRegionNameOnChange} ></Input>
                    </InputGroup>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>지역본부 주소</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={regionAddress} onChange={handleChangeRegionAddressOnChange} ></Input>
                    </InputGroup>

                </Form>

            <Button color="primary" onClick={createRegion}>등록</Button>
          
        </div>
    )
}
export default CreateRegion;