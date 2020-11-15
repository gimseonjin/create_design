import React, {useState, setState, useEffect} from 'react';
import {
    Form,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col
} from 'reactstrap';
import axios from 'axios';
function SignIn({history},props) {

    
    const [activeTab, setActiveTab] = useState();

    const [id, setId] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [gender, setGender] = useState();
    const [age, setAge] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [authority, setAuthority] = useState();

    const [regionCode, setRegionCode] = useState();
    const [volunteerId, setVolunteerId] = useState();

// 옵션 조회용
    const [regionList, setRegionList] = useState();
    let regionArrays = [];
    function renderRegionList(regionArray, index){
            return(
                <option key={index} value={regionArray.regionCode}>{ regionArray.regionName }</option>
            )
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
    }
    const handleVolunteerId = (e) => {
        e.preventDefault();
        setVolunteerId(e.target.value);
    }

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
    const signInPost = () => {
        var form = new FormData;
        form.append('id', id);
        form.append('password', password);
        form.append('name', name);
        form.append('gender', gender);
        form.append('age', age);
        form.append('address', address);
        form.append('phoneNumber', phoneNumber);
        form.append('regionCode', regionCode);
        form.append('volunteerId', volunteerId);
        axios.post("/signIn/createMentor", form)
        .then((response)=>{
         console.log(response.data.authority);
         history.push("/");
     })
    }

    const readRegionList=()=>{
        axios.post("/signIn/readRegionList").then((response)=>{
            regionArrays = response.data;
            setRegionList(regionArrays.map(renderRegionList));
        });
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
                        }}>멘토</h3>

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
                        <Input type='password' name='password'/>
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
                            <InputGroupText className = "input-group-addon">1365 아이디</InputGroupText>
                        </InputGroupAddon>
                        <Input type='text' name='volunteerId' onChange={handleVolunteerId}/>
                    </InputGroup>

                    <Button onClick={()=>history.push("/")} style={{float: 'right'}}>취소</Button>
                   
                  
                    <Button  className="btn btn-primary btn-block w-25" style={{float: 'right'}} type="post" onClick={signInPost}>회원가입</Button>
                    
                </Form> 
                
            </div>
        )
}
export default SignIn;