import React, {useState, setState, useEffect} from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Modal, ModalHeader } from 'reactstrap';
import '../Css/InputRightAlign.css';
import ApplyChangeRegion from '../Mentor/ApplyChangeRegion';
import UpdateUserInformation from './UpdateUserInformation';
import axios from 'axios';
import cookie from 'react-cookies';
//회원 정보 조회

const ReadUserInformation = (props) => {

  // id,권한 일단 저장
    const [token, setToken] = useState(cookie.load("userToken"));
    const [authority, setAuthority] = useState("1");
    const [userInfo, setUserInfo] = useState([]);

    const [modalUpdateInfo, setModalUpdateInfo] = useState(false);
    
    const [modalUpdateRegion, setModalUpdateRegion] = useState(false);

    const [backdrop, setBackdrop] = useState(true);
    // true: 바깥누르면 꺼짐, false: 안꺼짐, "static": 바깥누르면 모달 강조되고 꺼지지않음.

    const toggleUpdateInfo = () => setModalUpdateInfo(!modalUpdateInfo);
    const toggleUpdateRegion = () => setModalUpdateRegion(!modalUpdateRegion);
    const callbackModal = () => {
        this.setModal(false);
    }
    var lis = [];
    const getUserInformation = () => {
      console.log(token);
      let form = new FormData();
      form.append("userToken", token);
      axios.post('/reqUserInfo',form).then((response)=>{
        
        setUserInfo(response.data)
        
      })
    }
    useEffect(() => {
      getUserInformation();
        },[]
      )
// componentDidMount에 해당하는 useEffect. 두번째 매개변수로 [] 시 구성 요소가 마운트 될 때 코드 한번 실행.
    
    

   

    return (
        <div className="container">
            <h1>회원 정보 조회</h1>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input  type="text" value={userInfo.name}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>나이</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.age}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>휴대폰 번호</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.phoneNumber}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>1365 ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.volunteerId}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.gender}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>소속 지역본부</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.region}></Input>
            </InputGroup>

            <Modal isOpen={modalUpdateInfo}  backdrop={backdrop}>
                <ModalHeader toggle={toggleUpdateInfo}>회원정보 수정</ModalHeader>
                <UpdateUserInformation></UpdateUserInformation>

            </Modal>

            {/* 멘토/지역본부 관리자만 사용가능하고 나머지 시스템관리자/연계기관 담당자는 소속지역본부 변경기능 비활성화 해야함 */}

            <Modal isOpen={modalUpdateRegion}>
                <ModalHeader toggle={toggleUpdateRegion}>소속지역본부 변경신청</ModalHeader>
                <ApplyChangeRegion></ApplyChangeRegion>

            </Modal>

            <Button color="danger" onClick={()=>{
              getUserInformation();
            }}>조회</Button>
            <Button color="primary" onClick={toggleUpdateRegion}>지역본부 변경요청</Button>
            <Button color="primary" onClick={toggleUpdateInfo}>수정</Button>
            <Route path="update" ></Route>
        
        </div>
    )
}
export default ReadUserInformation;