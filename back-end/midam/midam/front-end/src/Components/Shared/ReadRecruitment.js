import React, {useEffect, useState} from 'react';

import ReadRecruitmentInfo from './ReadRecruitmentInfo';
import '../Css/test.css';
import {
    Button,
    Col,
    Container,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';

const ReadRecruitment = (props) => {
    const [recruitmentList, setRecruitmentList] = useState();
    const [regionList, setRegionList] =useState();
    const [linkAgencyList, setLinkAgencyList] = useState();

   
    const [modalReadRecruitmentInfo, setModalReadRecruitmentInfo] = useState(false);

    //*검색 옵션들. option 0:
    const [option, setOption] = useState(0);
    const [region, setRegion] = useState("선택안함");
    const [linkAgency, setLinkAgency] = useState("선택안함");
    
    const handleRegionOnChange = (e) => { 
        e.preventDefault();
        setRegion(e.target.value);
        if(e.target.value === "선택안함")
        {
           
            setLinkAgencyList("선택안함");
            setOption(0);
        }else{
        
            getLinkAgencyList(e.target.value);
            setOption(1);
        }
    }

    const handleLinkAgencyOnChange = (e) => {
        e.preventDefault();
        setLinkAgency(e.target.value);
        if(e.target.value === "선택안함")
        {
            setOption(1);
        }else{
            setOption(2);
        }
    }
    
    
   
    const toggleReadRecruitmentInfo = () => setModalReadRecruitmentInfo(!modalReadRecruitmentInfo);

    let recruitmentArrays = [];
    let regionArrays =[];
    let linkAgencyArrays = [];
  
    
    const [modalInput, setModalInput] = useState("default");
    function setRecruitmentArrays(newArrays) {recruitmentArrays = newArrays;}
    const renderRecruitmentArrays = (recruitmentArray, index) => {
        var statusValue="default";
        switch(recruitmentArray.recruitmentStatus){
            case 0:
                statusValue="모집중";    
                break;
            case 1:
                statusValue="모집완료";     
                break;  
        }
        return (
            <tr key={index} >
               
               <td className="display">{recruitmentArray.mentorRecruitmentCode}</td>
                <th>{recruitmentArray.regionName}</th>
                <td>{recruitmentArray.linkAgencyName}</td>
                <td className={"readRecruitmentInfo"}>{recruitmentArray.activityName}</td>
                
                <td onmouseover="this.style.background='white'" onmouseout="this.style.background='blue'">{recruitmentArray.numberOfMentor}</td>
                <td>{statusValue}</td>
            </tr>
        )
    }

    function renderLinkAgencyList(linkAgencyArray, index){
        return(
         <option key={index} value={linkAgencyArray.linkAgencyCode}>{ linkAgencyArray.linkAgencyName }</option>
        )
    }
    function renderRegionList(regionArray, index){
        return(
         <option key={index} value={regionArray.regionCode}>{ regionArray.regionName }</option>
        )
    }

   
    function getRecruitment () {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        form.append("option", option);
   
        axios.post('/activity/readRecruitment',form).then((response)=>{
                
            recruitmentArrays = response.data[0];
            regionArrays = response.data[1];
            setRecruitmentList(recruitmentArrays.map(renderRecruitmentArrays));
            setRegionList(regionArrays.map(renderRegionList));
        }
            );
    }

    function getRecruitmentWithOption () {

        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        form.append("option", option);
        form.append("linkAgency", linkAgency);
        form.append("region", region);


        axios.post('/activity/readRecruitment',form).then((response)=>{
 
        recruitmentArrays = response.data[0];
        setRecruitmentList(recruitmentArrays.map(renderRecruitmentArrays));
        
        }
            );
    }



    
    function getLinkAgencyList(regionCode){
        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        form.append("regionCode",regionCode);
        axios.post('/activity/getLinkAgencyList', form).then((response)=>{
            linkAgencyArrays=response.data;
            setLinkAgencyList(linkAgencyArrays.map(renderLinkAgencyList));
        });
    }   

    useEffect(() => {

        getRecruitment();
        }, []
    )
 $(function() { 
    $(".readRecruitmentInfo").off("click")
         
        $(".readRecruitmentInfo").on("click",function(){
            
            var recruitmentButton = $(this);

            var tr = recruitmentButton.parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleReadRecruitmentInfo();
        }
        )       
    }
    )

    return (
        <div className="container">


            <Row>
                
                {/* 날짜, 연계기관, 활동 선택 */}
                <Col className="mb-5">
                    <Form>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>지역본부</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={handleRegionOnChange}>
                            <option>선택안함</option>
                            {regionList}
                        </Input>
                        </InputGroup>

                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>연계기관</InputGroupText>
                        </InputGroupAddon>
                        <Input type="select" onChange={handleLinkAgencyOnChange}>
                            <option>선택안함</option>
                            {linkAgencyList}
                        </Input>
                        </InputGroup>

                        

                        <Button className="float-right" color="primary" onClick={()=>{
                            /* axios.데이터요청->inputs에 넣음 */
                            getRecruitmentWithOption ();
                            }}>조회</Button>
                        {/* <Button className="float-right" color="primary" onClick={()=>setMessage(response.data.message)}>test<p>{message}</p></Button> */}
                        
                     
                    </Form>
                </Col>
                {/*게시판 테이블*/}
                <Col>
                    <Table  >
                        {/* 문자 안끊기게 */}
                        <thead className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                                
                                <th>지역본부</th>
                                <th>연계기관</th>
                                <th>활동명</th>
                                <th>모집인원</th>
                                <th>모집여부</th>

                            </tr>
                        </thead>
                        <tbody >
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {recruitmentList}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
          
                   
            <Modal isOpen={modalReadRecruitmentInfo}>
                <ModalHeader toggle={toggleReadRecruitmentInfo}>멘토링 모집 상세조회</ModalHeader>
                <ReadRecruitmentInfo mentorRecruitmentCode={modalInput}></ReadRecruitmentInfo>
                
            </Modal>

           
        </div>
    )
}
export default ReadRecruitment;
