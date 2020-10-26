import React from 'react';
import { Button, CustomInput, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

//활동보고서 작성
//활동 보고서 조회 페이지 필요할지. 여기서 함께할지 논의.
function ReadReport() {
    return (
        <div>
            <Form>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>날짜</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="dayOfActivity" placeholder="날짜 입력"></Input>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>참여자</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="mentorName" placeholder="참여자 입력"></Input>
                    </InputGroup>
                    
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동 장소</InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" name="place" placeholder="활동 장소 입력"></Input>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동내용</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="contentOfActivity" placeholder="활동내용입력"></Input>
                    </InputGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>특이사항</InputGroupText>
                        </InputGroupAddon>
                        <Input type="textarea" name="note" placeholder="특이사항 입력"></Input>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>활동사진</InputGroupText>
                        </InputGroupAddon>
                        <CustomInput type="file" name="image" label="파일 선택">asdf</CustomInput>
                    </InputGroup>
                </FormGroup>
                <Button type="submit" color="primary">승인</Button>
                <Button type="submit" color="black">반려</Button>
            </Form>
        </div>
    )
}
export default ReadReport;