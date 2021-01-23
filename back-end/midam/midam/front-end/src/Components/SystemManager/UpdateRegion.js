import React,{useState, useEffect} from 'react';
import { Button, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

//지역본부 삭제
function UpdateRegion(props) {
    const [regionInfo, setRegionInfo] = useState(props.regionInfo);
    const [changeRegionName, setChangeRegionName] = useState(regionInfo[1]);
    const [changeRegionAddress, setChangeRegionAddress] = useState(regionInfo[2]);
    const [isReadOnly,setIsReadOnly] = useState(true);

    const handleChangeRegionNameOnChange=(e)=>{
        e.preventDefault();
        setChangeRegionName(e.target.value);
    }
    
    const handleChangeRegionAddressOnChange=(e)=>{
        e.preventDefault();
        setChangeRegionAddress(e.target.value);
    }


    function updateRegion(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("regionCode",regionInfo[0]);
        form.append("regionName",changeRegionName);
        form.append("regionAddress",changeRegionAddress);
        axios.post("/region/updateRegion/systemManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }

    return (
        <div>
          
            <h4>변경 할 정보 입력</h4>
                <Form>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>지역본부 명</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" value={changeRegionName} onChange={handleChangeRegionNameOnChange} readOnly={isReadOnly}></Input>
                    </InputGroup>
                    <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>지역본부 주소</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value={changeRegionAddress} onChange={handleChangeRegionAddressOnChange} readOnly={isReadOnly}></Input>
                    </InputGroup>

                </Form>

            <Button color="primary" onClick={()=>setIsReadOnly(!isReadOnly)}>수정</Button>
            {!isReadOnly?<Button color="danger" onClick={updateRegion}>완료</Button>:""}
        </div>
    )
}
export default UpdateRegion;