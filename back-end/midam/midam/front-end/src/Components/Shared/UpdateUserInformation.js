import React from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

//회원 정보 수정
const UpdateUserInformation = (props) => {
    const toggle = () =>{
        this.props.callbackModal();
    } 

    return (

        <div className="container">
            <h1>회원 정보 조회</h1>
            <Form>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>이름</InputGroupText>
                </InputGroupAddon>
                <Input  type="text" value="이름"></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>생년월일</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value="생년월일"></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>휴대폰 번호</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value="휴대폰 번호"></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>1365 ID</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value="1365 ID"></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>성별</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value="남/녀"></Input>
            </InputGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>소속 지역본부</InputGroupText>
                </InputGroupAddon>
                <Input type="text" value="소속 지역본부" disabled></Input>
            </InputGroup>

            {/* submit 버튼. */}

            <Button type="submit">수정</Button>

            </Form>
        
        </div>
    )
}
export default UpdateUserInformation;