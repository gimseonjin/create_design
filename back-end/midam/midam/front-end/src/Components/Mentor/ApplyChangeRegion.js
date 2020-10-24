import React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

//소속 지역 본부 변경 요청
function ApplyChangeRegion() {
    return (
        <div className="container">
        <h1>회원 정보 조회</h1>
        <Form>
        <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>현재 소속 지역본부</InputGroupText>
            </InputGroupAddon>
            <Input type="text" value="소속 지역본부" disabled></Input>
        </InputGroup>

        <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>변경 요청 지역본부</InputGroupText>
            </InputGroupAddon>
            <Input type="select" value="소속 지역본부">
                <option>지역본부선택</option>
                <option>지역본부1</option>
                <option>지역본부2</option>
                <option>지역본부3</option>

            </Input>
        </InputGroup>

        {/* submit 버튼. */}

        <Button type="submit">수정</Button>
        {/* <Input type="submit" value="수정" size=''></Input> */}

        </Form>
    
    </div>
    )
}
export default ApplyChangeRegion;