import React, { useState } from 'react';

//소속 멘토 조회.
function ReadMentor() {
    const mentor = useState([{1,}]);

    return (
        <div className="container">
        <Form className="mb-5" inline>
            <Input type="text" name="keyword" placeholder="검색어를 입력하세요"></Input>
            <Button>검색</Button>
        </Form>

        <Table className="text-nowrap">
                {/* text-nowrap 문자 안끊기게 */}
                <thead>
                    {/* 열 이름부분 */}
                    <tr>
                       
                        <th>No.</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>성별</th>
                     
                    </tr>
                </thead>
                <tbody>
                    {/* 내용부분 여기에 서버에서 정보 받아와서 포문돌려서 넣으면 될듯!*/}
                    <tr>
                        <th scope="row">1</th>
                        <td><Link>지역본부1</Link></td>
                        <td>구미</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>지역본부2</td>
                        <td>대구</td>
                    </tr>
                </tbody>
            </Table>

    </div>
    )
}
export default ReadMentor;