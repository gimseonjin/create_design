import React, {useEffect, useState} from 'react';
import CreateRecruitment from '../Shared/CreateRecruitment';
import ReadRecruitmentInfo from '../Shared/ReadRecruitmentInfo';
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
import ReadPostInfo from './ReadPostInfo';

const ReadRecruitment = (props) => {
    const [linkAgencyList, setLinkAgencyList] = useState();
    const [activityList, setActivityList] = useState();

    const [tableData, setTableData] = useState();
    const [modalCreateRecruitment, setModalCreateRecruitment] = useState(false); 
    const [modalReadRecruitmentInfo, setModalReadRecruitmentInfo] = useState(false);

    //*검색 옵션들. option 0:
    const [option, setOption] = useState(0);
    const [linkAgency, setLinkAgency] = useState("선택안함");
    const [activity, setActivity] = useState("선택안함");

    const toggleCreateRecruitment = () => setModalCreateRecruitment(!modalCreateRecruitment);
    const toggleReadRecruitmentInfo = () => setModalReadRecruitmentInfo(!modalReadRecruitmentInfo);

    let recruitmentArrays = [];
    let linkAgencyArrays = [];
    let activityArrays = [];
    const [modalInput, setModalInput] = useState("default");
    function setRecruitmentArrays(newArrays) {recruitmentArrays = newArrays;}
    const renderInput = (recruitmentArray, index) => {
        
        return (
            <tr key={index} >
                <th>{recruitmentArrays.postId}</th>
                <td>{recruitmentArrays.writerId}</td>
                <td className={"readRecruitmentInfo"} >{recruitmentArrays.title}</td>
                
                <td onmouseover="this.style.background='white'" onmouseout="this.style.background='blue'">{recruitmentArrays.writeDate}</td>
                <td>{recruitmentArrays.numberOfView}</td>
            </tr>
        )
    }
    function getRecruitmentHistory(form) {
        axios.post('http://localhost:8080/community/readRecruitment', form).then((response) => {
         
                
                setRecruitmentArrays(response.data);
                setTableData(recruitmentArrays.map(renderInput));
            });
    }
   

    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        getRecruitmentHistory(form);
        }, []
    )
 $(function() { 
    $(".readRecruitmentInfo").off("click")
        $(".createRecruitmentButton").on("click",function(){
  
            var postButton = $(this);

            var tr = postButton.parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleCreateRecruitment();
        }
        ) 
        $(".readRecruitmentInfo").on("click",function(){
            
            var postButton = $(this);

            var tr = postButton.parent();
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
                
                {/*게시판 테이블*/}
                <Col>
                    <Table  >
                        {/* 문자 안끊기게 */}
                        <thead className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                           
                                <th>연계기관</th>
                                <th>작성자 ID</th>
                                <th>활동 명</th>
                                <th>모집인원</th>
                                <th>활동 기간</th>
                                <th>모집여부</th>

                            </tr>
                        </thead>
                        <tbody >
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {tableData}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
            <Modal isOpen={modalCreateRecruitment}>
                         <ModalHeader toggle={toggleCreateRecruitment}>모집 등록</ModalHeader>
                         <CreateRecruitment recruitmentCode={modalInput}></CreateRecruitment>                         
            </Modal>
                   
            <Modal isOpen={modalReadRecruitmentInfo}>
                <ModalHeader toggle={toggleReadRecruitmentInfo}>멘토링 모집 상세조회</ModalHeader>
                <ReadRecruitmentInfo postId={modalInput}></ReadRecruitmentInfo>
                
            </Modal>

            <Button className={"createPostButton"} color={"primary"} >{"모집 등록"}</Button>
        </div>
    )
}
export default ReadRecruitment;
