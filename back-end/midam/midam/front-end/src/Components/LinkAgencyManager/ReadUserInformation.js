import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader } from 'reactstrap';
import '../Css/InputRightAlign.css';

import UpdateUserInfo from './UpdateUserInfo';
import axios from 'axios';
//회원 정보 조회

const ReadUserInfo = (props) => {

  // id,권한 일단 저장
    const [token, setToken] = useState(localStorage.getItem("userToken"));
    const [userInfo, setUserInfo] = useState([]);

    const [modalUpdateInfo, setModalUpdateInfo] = useState(false);    

    const toggleUpdateInfo = () => setModalUpdateInfo(!modalUpdateInfo);

    const getUserInfo = () => {
      let form = new FormData();
      form.append("userToken", token);
      axios.post('/user/readUserInfo/linkAgencyManager',form).then((response)=>{
        setUserInfo(response.data);
      })
    }
    useEffect(() => {
      getUserInfo();
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
                  <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.gender}></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>주소</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.address}></Input>
            </InputGroup>          
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>소속 연계기관</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value={userInfo.linkAgency}></Input>
            </InputGroup>


            <Button color="primary"  style={{float: 'right'}} onClick={toggleUpdateInfo}>회원정보 수정</Button>
            <Route path="update" ></Route>

           

        
        
            <Modal isOpen={modalUpdateInfo} >
                <ModalHeader toggle={toggleUpdateInfo}>회원정보 수정</ModalHeader>
                <UpdateUserInfo userInfo={userInfo}></UpdateUserInfo>
            </Modal>

            {/* 멘토/지역본부 관리자만 사용가능하고 나머지 시스템관리자/연계기관 담당자는 소속지역본부 변경기능 비활성화 해야함 */}
            

        </div>
    )
}
export default ReadUserInfo;