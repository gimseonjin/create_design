import React from 'react';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from 'reactstrap';

//활동 내역 조회
function ReadActivityHistory() {
    return (
        <div className="container">
            
            <Row>
            {/* 날짜, 연계기관, 활동 선택 */}
            <Col>
            <Form>
                <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>소속 연계기관</InputGroupText>
                </InputGroupAddon>
                <Input type="select">
                    <option>연계기관 선택</option>
                    <option>연계기관1</option>
                    <option>연계기관2</option>
                </Input>
                </InputGroup>

                <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>활동명</InputGroupText>
                </InputGroupAddon>
                <Input type="select">
                    <option>활동 선택</option>
                    <option>활동1</option>
                    <option>활동2</option>
                </Input>
                </InputGroup>

                <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>기간</InputGroupText>
                </InputGroupAddon>
                <Input type="date" name="startDate"></Input>
                <Input type="date" name="endDate"></Input>
                </InputGroup>
                <Button type="submit" color="primary">조회</Button>

            </Form>
            </Col>
            <br></br>

            {/* 활동 내역 테이블 */}
            <Col>
                <Table className="text-nowrap">
                    {/* 문자 안끊기게 */}
                    <thead>
                        {/* 열 이름부분 */}
                        <tr>
                            <th>#</th>
                            <th>활동날짜</th>
                            <th>시작 시간</th>
                            <th>종료 시간</th>
                            <th>활동 보고서</th>
                            <th>승인 여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                        <tr>
                            <th scope="row">1</th>
                            <td>2020-10-10</td>
                            <td>15:00</td>
                            <td>17:00</td>
                            <td>미작성</td>
                            <td>미승인</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
            </Row>
        </div>
    )
}
export default ReadActivityHistory;