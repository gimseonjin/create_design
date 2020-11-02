import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
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
import useRequest from './useRequest';
import usePost from './usePost';
//게시글 조회
const ReadPost=(props) => {

    const [tableData, setTableData] = useState();
    const [postArrays, setPostArrays] = useState([]);

    const renderInput = (postArray, index) => {
        return (
            <tr key={index}>
                <th>{index}</th>
                
                <td>{postArray.postId}</td>
                <td>{postArray.writerId}</td>
                <td>{postArray.title}</td>
                <td>{postArray.content}</td>
                <td>{postArray.writeDate}</td>
                <td>{postArray.numberOfView}</td>
            </tr>
        )
    }
    function getPostHistory (form) {
        axios.post('http://localhost:8080/mentor/post/read',form).then((response)=>{
            console.log(response.data+"response");
        setPostArrays(response.data);
        setTableData(postArrays.map(renderInput))
        }
            );
    }
    useEffect(()=>{
        
    },[]
    )
    return (
        <div className="container">
            <Form className="mb-5" inline="inline">
                <Input type="date" name="startDate"></Input>~
                <Input type="date" name="endDate"></Input>
                <Input type="text" name="keyword" placeholder="검색어를 입력하세요"></Input>
                <Button className="float-right" color="primary" onClick={()=>{
                            /* axios.데이터요청->inputs에 넣음 */
                             var form=new FormData;
                             form.append("id",localStorage.getItem('id'));
                             getPostHistory(form);
                            console.log(postArrays+"inButton");
                            
                            }}>조회</Button>
            </Form>
            {/*게시판 테이블*/}
            <Col>
                <Table className="text-nowrap">
                    {/* 문자 안끊기게 */}
                    <thead>
                        {/* 열 이름부분 */}
                        <tr>

                            <th>게시글 번호</th>
                            <th>작성자</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성날짜</th>
                            <th>조회수</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                        {tableData}
                    </tbody>
                </Table>
            </Col>
        </div>
    )
}
export default ReadPost;
