import React, {useEffect, useState} from 'react';
import '../Css/test.css';
import ReadMessageInfo from './ReadMessageInfo';
import CreateMessage from './CreateMessage';
import axios from 'axios';
import $ from 'jquery';
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
//쪽지 조회
const ReadMessage = (props) => {

    const [tableData, setTableData] = useState();
    const [modalCreateMessage, setModalCreateMessage] = useState(false); 
    const [modalReadMessageInfo, setModalReadMessageInfo] = useState(false);
    const [modalInput, setModalInput] = useState("default");

    const toggleCreateMessage = () => setModalCreateMessage(!modalCreateMessage);
    const toggleReadMessageInfo = () => setModalReadMessageInfo(!modalReadMessageInfo);
    let messageArrays = [];
  
    function setMessageArrays(newArrays) {messageArrays = newArrays;}
    const renderInput = (messageArray, index) => {
        var statusValue = "default";
        var ButtonColor = "secondary";
        var buttonClassName = "readMessageInfo";
        switch (messageArray.status) {
            case 0:
                statusValue = "읽지 않음";
                ButtonColor = "primary";
                buttonClassName = "readMessageInfo";
                break;
            case 1:
                statusValue = "읽음";
                ButtonColor = "secondary";
                buttonClassName = "readMessageInfo";
                break;
        }
        return (
            <tr key={index} >
                <th className="display">{messageArray.messageId}</th>
                <td>{messageArray.senderId}</td>
                <td >{messageArray.title}</td>
                <td onmouseover="this.style.background='white'" onmouseout="this.style.background='blue'">{messageArray.sendDate}</td>
      
                <td> <Button className={buttonClassName} color={ButtonColor}>{statusValue}</Button></td>
            </tr>
        )
    }
    function getMessageHistory(form) {
        var form=new FormData;
        form.append("userToken",localStorage.getItem('userToken'));
        axios.post('http://localhost:8080/community/readMessage', form).then((response) => {
         
                
                setMessageArrays(response.data);
                setTableData(messageArrays.map(renderInput));
            });
    }
   
    

    $(function () {
        $(".readMessageInfo").off("click")

        $(".readMessageInfo").on("click", function () {

            var messageButton = $(this);

            var tr = messageButton.parent().parent();
            var td = tr.children();
            console.log("row데이터 : " + td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleReadMessageInfo();
        })

        $(".createMessageButton").on("click",function(){
      
            var messageButton = $(this);

            var tr = messageButton.parent();
            var td = tr.children();
            console.log("row데이터 : "+td.eq(0).text());
            setModalInput(td.eq(0).text());
            toggleCreateMessage();
        })
    })
    useEffect(() => {
        var form = new FormData;
        form.append("id", localStorage.getItem('id'));
        getMessageHistory(form);
        }, []
    )
 
    return (
        <div className="container">
            <Row>
                
                {/*게시판 테이블*/}
                <Col>
                    <Table>
                        {/* 문자 안끊기게 */}
                        <thead className="text-nowrap">
                            {/* 열 이름부분 */}
                            <tr>
                           
                                <th>보낸이</th>
                                <th>제목</th>
                                <th>받은 날짜</th>                                
                                <th>쪽지 상태</th>

                            </tr>
                        </thead>
                        <tbody >
                            {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                            {tableData}
                        </tbody>
                    </Table>
                    
                </Col>
            </Row>
            <Modal isOpen={modalCreateMessage}>
                         <ModalHeader toggle={toggleCreateMessage}>쪽지 보내기</ModalHeader>
                         <CreateMessage messageId={modalInput}></CreateMessage>                         
            </Modal>
                   
            <Modal isOpen={modalReadMessageInfo}>
                         <ModalHeader toggle={toggleReadMessageInfo}>쪽지 상세조회</ModalHeader>
                         <ReadMessageInfo messageId={modalInput}></ReadMessageInfo>
                
            </Modal>

            <Button className={"createMessageButton"} color={"primary"} >{"쪽지 보내기"}</Button>
        
        </div>
    )
}
export default ReadMessage;
