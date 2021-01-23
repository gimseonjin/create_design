import React from 'react';
import { Form, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

//멘토링 신청
function ApplyMentoring() {
    return (
        <div className="container">
            <Form>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>신청자</InputGroupText>
                        <Input type="text" value="박성현"></Input>
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>소속 본부</InputGroupText>
                        <Input type="text" value="금오공과대학교"></Input>
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>신청 연계 기관</InputGroupText>
                        <Input type="select">
                            <option>신청 연계 기관 선택</option>
                            <option>연계기관1</option>
                            <option>연계기관2</option>
                        </Input>
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>신청 활동</InputGroupText>
                        <Input type="select">
                            <option>신청 활동 선택</option>
                            <option>활동1</option>
                            <option>활동2</option>
                        </Input>
                    </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>활동 기간</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value="2020/08/31 ~ 2020/12/31"></Input>
                </InputGroup>

                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText>활동 내용</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" value="아동센터 방과후교육"></Input>
                </InputGroup>

                <Button type="submit">신청</Button>
            </Form>
            
        </div>
    )
}
export default ApplyMentoring;