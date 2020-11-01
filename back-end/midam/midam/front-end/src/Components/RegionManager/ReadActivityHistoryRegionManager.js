import React,{useState} from 'react';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, ModalHeader, Row, Table } from 'reactstrap';
import CreateReport from '../Mentor/CreateReport';
import CreateQR from '../Mentor/CreateQR';
import ExportMentoringActivity from '../LinkAgencyManager/ExportMentoringActivity';

//활동 내역 조회
const ReadActivityHistoryRegionManager=(props)=> {
    const [modalCreateReport, setModalCreateReport] = useState(false); 
    const [modalCreateQR, setModalCreateQR] = useState(false); 
    const [modalExportExcel, setModalExportExcel] = useState(false); 

    const toggleCreateReport = () => setModalCreateReport(!modalCreateReport);
    const toggleCreateQR = () => setModalCreateQR(!modalCreateQR);
    const toggleExportExcel = () => setModalExportExcel(!modalExportExcel);

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

                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>기간</InputGroupText>
                        </InputGroupAddon>
                        <Input type="date" name="startDate"></Input>~
                        <Input type="date" name="endDate"></Input>
                        </InputGroup>
                        <Button className="float-right" color="primary">조회</Button>
                        <Button color="primary" onClick={()=>setModalExportExcel(true)}>내보내기</Button>
                        <Button className="float-left" color="primary" onClick={()=>setModalCreateQR(true)}>QR 생성</Button>

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
                                <td>미작성 <Button size="sm" onClick={()=>{setModalCreateReport(true)}}>작성하기</Button></td>
                                <td>미승인</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                                <td>2020-10-12</td>
                                <td>15:00</td>
                                <td>17:00</td>
                                <td>작성완료</td>
                                <td>승인완료</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal isOpen={modalCreateReport}>
                <ModalHeader toggle={toggleCreateReport}>활동보고서</ModalHeader>
                <CreateReport></CreateReport>

            </Modal>

            <Modal isOpen={modalCreateQR}>
                <ModalHeader toggle={toggleCreateQR}>QR코드 생성</ModalHeader>
                <CreateQR></CreateQR>

            </Modal>

            <Modal isOpen={modalExportExcel}>
                <ModalHeader toggle={toggleExportExcel}>활동 내역 내보내기</ModalHeader>
                <ExportMentoringActivity></ExportMentoringActivity>

            </Modal>
        </div>
    )
}
export default ReadActivityHistoryRegionManager;