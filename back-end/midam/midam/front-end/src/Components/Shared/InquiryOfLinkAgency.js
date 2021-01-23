import React,{useState, useEffect} from 'react';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import axios from 'axios';

//연계기관 등록 문의
function SignIn() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const handleTitleOnChange =(e)=>{
        e.preventDefault();
        setTitle(e.target.value);
    }
    const handleContentOnChange =(e)=>{
        e.preventDefault();
        setContent(e.target.value);
    }

    const [region,setRegion] = useState("");
    const [regionManager,setRegionManager] = useState("");

    const handleRegionOnChange =(e)=>{
        e.preventDefault();
        setRegion(e.target.value);
        
    }
    const handleRegionManagerOnChange =(e)=>{
        e.preventDefault();
        setRegionManager(e.target.value);
    }


    const [regionList, setRegionList] = useState();
    const [regionManagerList, setRegionManagerList] = useState();
    
    let regionArrays = [];
    let regionManagerArrays = [];

    function renderRegion(regionArray, index){
        return(
        <option key = {index} value={regionArray.regionCode}>{regionArray.regionName}</option>
        )
    }
    function renderRegionManager(regionManagerArray, index){
        return(
        <option key = {index} value={regionManagerArray.id}>{regionManagerArray.name}</option>
        )
    }

    function readRegion(){
        axios.post("/region/readRegion/inquiry").then((response)=>{
            regionArrays=response.data;
            setRegionList(regionArrays.map(renderRegion));
        });
    }

    function readRegionManager(){
        let form = new FormData();
        form.append("regionCode",region);
        axios.post("/user/readRegionManager/inquiry",form).then((response)=>{
            
            regionManagerArrays=response.data;
            setRegionManagerList(regionManagerArrays.map(renderRegionManager));
        });
    }

    function sendMessage(){
        let form = new FormData();
        form.append("receiverId",regionManager);
        form.append("title",title);
        form.append("content",content);
        axios.post("/community/inquiry",form).then((response)=>{
            alert(response.data.responseMsg);
            window.location.reload();
        })

    }
    useEffect(()=>{
        readRegion();
    },[])

    useEffect(()=>{
        readRegionManager();
    },[region])

    return (
        <div className="container">
            <InputGroup>
                <InputGroupAddon type="append">
                    <InputGroupText>지역본부 선택</InputGroupText>
                </InputGroupAddon>
                <Input type="select" onChange={handleRegionOnChange}>
                    <option value="">선택</option>
                    {regionList}
                </Input>
            </InputGroup>

            <InputGroup>
             <InputGroupAddon type="append">
                    <InputGroupText>지역본부 관리자 선택</InputGroupText>
                </InputGroupAddon>
                <Input type="select" onChange={handleRegionManagerOnChange}>
                    <option value="">선택</option>
                    {regionManagerList}
                </Input>
            </InputGroup>
            <InputGroup
                style={{
                    marginTop: "1%",
                    marginBottom: "1%"
                }}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>제목</InputGroupText>
                </InputGroupAddon>
                <Input name="title" type="textarea" onChange={handleTitleOnChange}></Input>
            </InputGroup>
            <InputGroup
                style={{
                    marginTop: "1%",
                    marginBottom: "1%"
                }}>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>내용</InputGroupText>
                </InputGroupAddon>
                <Input name="content" type="textarea" cols="50" rows="10" onChange={handleContentOnChange}></Input>
            </InputGroup>
            <Button className="float-right" color="primary" onClick={sendMessage}>보내기</Button>

        </div>
    )
}
export default SignIn;