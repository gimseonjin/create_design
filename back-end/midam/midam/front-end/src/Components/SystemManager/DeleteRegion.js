import React,{useState, useEffect} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

//지역본부 삭제
function DeleteRegion(props) {
    const [regionInfo, setRegionInfo] = useState(props.regionInfo);

    function deleteRegion(){
        var form = new FormData();
        form.append("userToken", localStorage.getItem("userToken"));
        form.append("regionCode",regionInfo[0]);
        axios.post("/region/deleteRegion/systemManager",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })
    }

    return (
        <div>
            <p>정보를 잘 확인한 후 삭제해주세요. 해당 지역본부에 소속된 멘토와 담당자도 모두 비활성화 됩니다.</p>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>지역본부 이름</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={regionInfo[1]}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>지역본부 주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={regionInfo[2]}></Input>
            </InputGroup>
           
            <Button color="danger" onClick={deleteRegion}>삭제</Button>
        </div>
    )
}
export default DeleteRegion;