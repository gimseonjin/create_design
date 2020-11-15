import React, {useState, setState, useEffect} from 'react';
import {Form, InputGroup, InputGroupAddon, InputGroupText, Input, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CustomInput } from 'reactstrap';
import axios from 'axios';


//연계기관 담당자 회원가입
const SignInLinkAgency = ({history},props) => {
    const [activeTab, setActiveTab] = useState(null);
    const [isNewLinkAgency, setIsNewLinkAgency] = useState(false);

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [authority, setAuthority] = useState("");
    
    const [regionCode, setRegionCode] = useState("");
    const [linkAgencyCode, setLinkAgencyCode] = useState("");

    const [linkAgencyName, setLinkAgencyName] = useState("");
    const [linkAgencyAddress, setLinkAgencyAddress] = useState("");
    const [linkAgencyInfo, setLinkAgencyInfo] = useState("");

    //옵션 선택용
    const [regionList, setRegionList] = useState();
    const [linkAgencyList, setLinkAgencyList] = useState(<option value="">선택</option>);
    let regionArrays = [];
    let linkAgencyArrays = [];

    function renderRegionList(regionArray, index){
        return(
            <option key={index} value={regionArray.regionCode}>{ regionArray.regionName }</option>
        )
    }
    function renderLinkAgencyList(linkAgencyArray, index){
        return(
            <option key={index} value={linkAgencyArray.linkAgencyCode}>{ linkAgencyArray.linkAgencyName }</option>
        )
    }



    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }

    const handleSubmitId = (e) => {
        e.preventDefault();
        setId(e.target.value);
    }

    const handleSubmitPw = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    const handleSubmitName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleSubmitGender = (e) => {
        e.preventDefault();
        setGender(e.target.value);
    }
    const handleSubmitAge = (e) => {
        e.preventDefault();
        setAge(e.target.value);
    }
    const handleSubmitAddress = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    }
    const handleSubmitPhoneNumber = (e) => {
        e.preventDefault();
        setPhoneNumber(e.target.value);
    }
    const handleSubmitAuthority = (e) => {
        e.preventDefault();
        setAuthority(e.target.value);
    }
    const handleSubmitRegionCode = (e) => {
        e.preventDefault();
        setRegionCode(e.target.value);
        readLinkAgencyList(e.target.value);
    }
    const handleSubmitLinkAgencyCode = (e) => {
        e.preventDefault();
        setLinkAgencyCode(e.target.value);
    }
    const handleSubmitLinkAgencyName = (e) => {
        e.preventDefault();
        setLinkAgencyName(e.target.value);
    }
    const handleSubmitLinkAgencyAddress = (e) => {
        e.preventDefault();
        setLinkAgencyAddress(e.target.value);
    }
    const handleSubmitLinkAgencyInfo = (e) => {
        e.preventDefault();
        setLinkAgencyInfo(e.target.value);
    }
    const handleCheckPasswordOnChange = (e) => {
        e.preventDefault();
        setCheckPassword(e.target.value);
    }
    const signInPost = () => {
        if(checkEssentialInput()===1){
            if(isNewLinkAgency){ //새로운 연계기관을 등록하면서 함께 신청
                var form = new FormData;
                form.append('id', id);
                form.append('password', password);
                form.append('name', name);
                form.append('gender', gender);
                form.append('age', age);
                form.append('address', address);
                form.append('regionCode', regionCode);
                form.append('phoneNumber', phoneNumber);
                form.append('linkAgencyCode', linkAgencyCode);
                form.append('linkAgencyName', linkAgencyName);
                form.append('linkAgencyAddress', linkAgencyAddress);
                form.append('linkAgencyInfo', linkAgencyInfo);
                axios.post("/signIn/createLinkAgencyManagerNewLinkAgency", form,{headers: {'content-type':'multipart/form-data'}}).then((response)=>{
                alert(response.data.responseMsg);
                history.push("/");
            
                })
            }
            else{ //아니다! 기존 연계기관에 등록하겠다.
                var form = new FormData;
                form.append('id', id);
                form.append('password', password);
                form.append('name', name);
                form.append('gender', gender);
                form.append('age', age);
                form.append('regionCode', regionCode);
                form.append('address', address);
                form.append('phoneNumber', phoneNumber);
                form.append('authority', authority);
                form.append('linkAgencyCode', linkAgencyCode);
                axios.post("/signIn/createLinkAgencyManager", form).then((response)=>{
                    alert(response.data.responseMsg);
                    history.push("/");
                })
            }
        }
        
    }

  
    const readRegionList=()=>{
        axios.post("/signIn/readRegionList").then((response)=>{
            regionArrays = response.data;
            setRegionList(regionArrays.map(renderRegionList));
        });

    }
    const readLinkAgencyList=(regionCode)=>{
        var form = new FormData;
        form.append("regionCode", regionCode);
        axios.post("/signIn/readLinkAgencyList",form).then((response)=>{
            linkAgencyArrays = response.data;
            setLinkAgencyList(linkAgencyArrays.map(renderLinkAgencyList));
        })
    }
    const checkEssentialInput=()=>{
        if(name===""){alert("빈칸을 입력해주세요"); return 0;}
        return 1;
    }

    useEffect(()=>{
            readRegionList();
    },[])



        return (
            <div
                className="signIN_container d-flex justify-content-center align-self-center"
                style={{
                    margin: "50px"
                }}>
                <Form className="w-75">
                    <h3 style={{
                            marginBottom: '5%'
                        }}>연계기관</h3>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">이름</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' name="name"onChange={handleSubmitName}/>
                    </InputGroup>                    
                 
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">성별</InputGroupText>
                        </InputGroupAddon>
                        <Col sm={4}>
                            <Input type='select' name='gender'onChange={handleSubmitGender} >
                            {/* 여기에 option을 지역본부를 DB에서 select 해서 for문으로 추가하면 될듯! */}
                                <option>선택</option>
                                <option value='M'>남성</option>
                                <option value='G'>여성</option>
                            </Input>
                        </Col>
                    </InputGroup>        
                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">나이</InputGroupText>
                        </InputGroupAddon>
                        <Input type='number'  name='age' onChange={handleSubmitAge}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">아이디</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  name='id'onChange={handleSubmitId}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">비밀번호</InputGroupText>
                        </InputGroupAddon>
                        <Input type='password'  name='password'onChange={handleSubmitPw}/>
                    </InputGroup>
                        
                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">비밀번호 확인</InputGroupText>
                        </InputGroupAddon>
                        <Input type='password' name='password' onChange={handleCheckPasswordOnChange}/>
                    </InputGroup>
              
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">휴대폰 번호</InputGroupText>
                        </InputGroupAddon>
                        <Input type='number'  name='phoneNumber'onChange={handleSubmitPhoneNumber}/>
                    </InputGroup>

                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">주소</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  name='address'onChange={handleSubmitAddress}/>
                    </InputGroup>
                    
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">소속 지역 본부</InputGroupText>
                        </InputGroupAddon>
                        <Col sm={4}>
                            <Input type='select' name='region' onChange={handleSubmitRegionCode} >
                            {/* 여기에 option을 지역본부를 DB에서 select 해서 for문으로 추가하면 될듯! */}
                              {regionList}
                            </Input>
                        </Col>
                    </InputGroup>
                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">연계 기관</InputGroupText>
                        </InputGroupAddon>
                        <div>&nbsp;&nbsp;&nbsp;</div>
                        <CustomInput type="radio" id="selectRegion" name = "radioRegion" onClick={() => {setIsNewLinkAgency(false)}} defaultChecked>연계기관 선택</CustomInput>
                        <Col sm={4}>
                            <Input type='select' name='selectRegion' disabled={isNewLinkAgency} onChange={handleSubmitLinkAgencyCode}>
                                {/* 여기에 option을 연계기관을 DB에서 select 해서 for문으로 추가하면 될듯! */}
                               {linkAgencyList}
                            </Input>
                        </Col>
                        <CustomInput type="radio" id="newRegion" name="radioRegion" onClick={() => {setIsNewLinkAgency(true)} }>연계기관 신규 등록</CustomInput>
                    </InputGroup>
                    
                    {/* 연계기관 신규등록을 선택할 시 disabled={isNewLinkAgency} isNewLinkAgency가 false로 변하면서 disabled가 해제. 작성할수있게됨 */}

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}} >
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">연계기관명</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  disabled={!isNewLinkAgency} onChange={handleSubmitLinkAgencyName}/>
                    </InputGroup>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">주소</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  disabled={!isNewLinkAgency} onChange={handleSubmitLinkAgencyAddress}/>
                    </InputGroup>

                    <InputGroup style={{marginTop : "1%", marginBottom : "1%"}}>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className = "input-group-addon">설명</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text'  disabled={!isNewLinkAgency} onChange={handleSubmitLinkAgencyInfo}/>
                    </InputGroup>

                    <Button onClick={()=>history.push("/")} style={{float: 'right'}}>취소</Button>
                    <Button  className="btn btn-primary btn-block w-25" style={{float: 'right'}} type="post" onClick={signInPost}>회원가입</Button>
                </Form>
            </div>
        )
}
export default SignInLinkAgency;