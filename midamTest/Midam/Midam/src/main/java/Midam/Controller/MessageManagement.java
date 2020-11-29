package Midam.Controller;


import Midam.DAO.community.MessageDAO;
import Midam.model.community.Message;
import Midam.model.token.Token;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value= "/community", method= RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class MessageManagement {

    @ResponseBody
    @PostMapping(value="/message/number")
    public HashMap numberOfMessage(@RequestParam(name="userToken") String userToken) throws IOException {
        HashMap result = new HashMap();
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();
        MessageDAO messageDAO = new MessageDAO();

        int selectResult  = messageDAO.numberOfMessage(id);
        result.put("numberOfMessage",selectResult);
        return result;
    } //받은 쪽지 갯수 확인
    @ResponseBody
    @PostMapping(value="/readMessage")
    public ArrayList readMessageList(@RequestParam(name="userToken") String userToken) throws IOException  {
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();
        MessageDAO messageDAO = new MessageDAO();
        ArrayList<HashMap> messageArrayList = messageDAO.getListMessage(id);
        return messageArrayList;
    }

    @ResponseBody
    @PostMapping(value="/readMessageInfo")
    public HashMap readMessageInfo(HttpServletRequest request)  {
        HashMap result = new HashMap();


        int messageId = Integer.parseInt(request.getParameter("messageId"));

        MessageDAO messageDAO = new MessageDAO();

        Message readResult = messageDAO.readMessageInfo(messageId);
        result.put("messageId",readResult.getMessageId());
        result.put("senderId",readResult.getSenderId());
        result.put("title",readResult.getTitle());
        result.put("content",readResult.getContent());
        result.put("sendDate",readResult.getSendDate());
        result.put("receiveDate",readResult.getReceiveDate());

        return result;
    }

    @ResponseBody
    @PostMapping(value="/createMessage")
    public HashMap createMessage(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        String recevierId = request.getParameter("receiverId");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        MessageDAO messageDAO = new MessageDAO();

        int createResult = messageDAO.createMessage(id, recevierId,title,content);
        result.put("responseMsg",createResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/deleteMessage")
    public HashMap deleteMessage(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        int messageId = Integer.parseInt(request.getParameter("messageId"));

        MessageDAO messageDAO = new MessageDAO();

        int deleteResult = messageDAO.deleteMessage(messageId);
        result.put("responseMsg",deleteResult);
        return result;
    }

    //연계기관 문의
    @ResponseBody
    @PostMapping(value="/inquiry")
    public HashMap inquiry(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        String receiverId = request.getParameter("receiverId");
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        MessageDAO messageDAO = new MessageDAO();

        int inquiryResult = messageDAO.inquiry(receiverId, title, content);
        if(inquiryResult==1) {
            result.put("responseMsg", "성공");
        }else{
            result.put("responseMsg", "실패");
        }
        return result;
    }
}
