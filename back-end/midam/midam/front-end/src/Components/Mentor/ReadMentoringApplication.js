import React,{useState} from 'react';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Row, Table } from 'reactstrap';

//멘토링 신청 내역 조회 연계기관 담당자와 겹치는 기능이나 멘토는 본인의 것만 확인.
//멘토링 활동 신청 이후 취소도 가능해야할지 논의. 필요시 취소기능은 조회에 간단히 추가될듯.
//회원가입 신청과 구분하기위해 mentoringApplication이라고함.

function ReadMentoringApplication() {
    return (
        <div className="container">
        
            <Row>
                {/* 날짜, 연계기관, 활동 선택 */}
                <Col className="mb-5">
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

{/*                         <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>기간</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="startDate"></Input>
                        <Input type="date" name="endDate"></Input>
                        </InputGroup> 
                        
                        <Button type="submit" color="primary">내보내기</Button>
                       
                        <Button className="float-left" type="submit" color="primary">QR 생성</Button>
 */}
                        <Button className="float-right" type="submit" color="primary">조회</Button>
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
                                <th>연계기관</th>
                                <th>활동명</th>
{/*                                 <th>신청자</th>
 */}                                <th>모집 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            <tr>
                                <th scope="row">1</th>
                                <td>구미 도서관</td>
                                <td>사서 도우미</td>
{/*                                 <td>박성현</td>
 */}                                <td>신청</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>구미 도서관</td>
                                <td>사서 도우미</td>
{/*                                 <td>박성현</td>
 */}                                <td>합격</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal /* isOpen={} */>
                <ModalHeader /* toggle={} */>활동보고서</ModalHeader>
                

            </Modal>

        </div>
    )
}
export default ReadMentoringApplication;