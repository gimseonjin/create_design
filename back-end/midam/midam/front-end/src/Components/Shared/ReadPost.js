import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, InputGroup, InputGroupAddon, InputGroupText, Table } from 'reactstrap';


//게시글 조회
function ReadPost() {
    return (

        <div className="container">
            <Form className="mb-5" inline>
                <Input type="date" name="startDate"></Input>~
                <Input type="date" name="endDate"></Input>
                <Input type="text" name="keyword" placeholder="검색어를 입력하세요"></Input>
          
            </Form>

            <Table className="text-nowrap">
                    {/* 문자 안끊기게 */}
                    <thead>
                        {/* 열 이름부분 */}
                        <tr>
                           
                            <th>No.</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>등록날짜</th>
                         
                        </tr>
                    </thead>
                    <tbody>
                        {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                        <tr>
                            <th scope="row">1</th>
                            <td><Link>게시글1</Link></td>
                            <td>박성현</td>
                            <td>2020-10-26</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>게시글2</td>
                            <td>이지훈</td>
                            <td>2020-10-26</td>
                        </tr>
                    </tbody>
                </Table>

        </div>
    )
}
export default ReadPost;