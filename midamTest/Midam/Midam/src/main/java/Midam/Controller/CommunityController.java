package Midam.Controller;

import Midam.DAO.community.MessageDAO;
import Midam.DAO.community.PostDAO;

import Midam.DAO.user.UserDAO;
import Midam.model.community.Message;
import Midam.model.community.Post;
import Midam.model.token.Token;
import Midam.model.user.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
    @RequestMapping(value= "/community", method=RequestMethod.POST)
    @CrossOrigin("http://localhost:3000")
    public class CommunityController {

        @ResponseBody
        @PostMapping(value="/readPost")
        public ArrayList readPostList()  {

            PostDAO postDAO = new PostDAO();
            ArrayList<HashMap> postArrayList = postDAO.getListPost();
            return postArrayList;
        }
        @ResponseBody
        @PostMapping(value="/readPostInfo")
        public HashMap readPostInfo(HttpServletRequest request)  {
            HashMap result = new HashMap();


            int postId = Integer.parseInt(request.getParameter("postId"));

            PostDAO postDAO = new PostDAO();

            Post readResult = postDAO.readPostInfo(postId);
            result.put("postId",readResult.getPostId());
            result.put("writerId",readResult.getWriterId());
            result.put("writeDate",readResult.getWriteDate());
            result.put("title",readResult.getTitle());
            result.put("content",readResult.getContent());
            result.put("bundleId",readResult.getBundleId());
            return result;
        }

        @ResponseBody
        @PostMapping(value="/createPost")
        public HashMap createPost(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

            HashMap result = new HashMap();

            Token token = new Token();
            Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
            Object objectId = map.get("id");
            String id = objectId.toString();

            String title=request.getParameter("title");
            String content=request.getParameter("content");

            PostDAO postDAO = new PostDAO();

            int createResult = postDAO.createPost(id,title,content);
            result.put("responseMsg",createResult);
            return result;
        }
    @ResponseBody
    @PostMapping(value="/updatePost")
    public HashMap updatePost(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        int postId = Integer.parseInt(request.getParameter("postId"));
        String title=request.getParameter("title");
        String content=request.getParameter("content");

        PostDAO postDAO = new PostDAO();

        int updateResult = postDAO.updatePost(postId,title,content);
        result.put("responseMsg",updateResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/deletePost")
    public HashMap deletePost(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        int postId = Integer.parseInt(request.getParameter("postId"));


        PostDAO postDAO = new PostDAO();

        int deleteResult = postDAO.deletePost(postId);
        result.put("responseMsg",deleteResult);
        return result;
    }
        @ResponseBody
        @PostMapping(value="/readReply")
        public ArrayList readReply(HttpServletRequest request)  {

            int postId = Integer.parseInt(request.getParameter("postId"));
            PostDAO postDAO = new PostDAO();

            ArrayList<HashMap> replyArrayList = postDAO.getListReply(postId);

           return replyArrayList;
        } //해당 게시글 댓글목록 조회

        @ResponseBody
        @PostMapping(value="/createReply")
        public HashMap createReply(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

            HashMap result = new HashMap();
            Token token = new Token();
            Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
            Object objectId = map.get("id");
            String id = objectId.toString();

            int postId = Integer.parseInt(request.getParameter("postId"));

            String content=request.getParameter("reply");

            PostDAO postDAO = new PostDAO();

            int createResult = postDAO.createReply(id, content,postId);
            result.put("responseMsg",createResult);
            return result;
        }
    @ResponseBody
    @PostMapping(value="/deleteReply")
    public HashMap deleteReply(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();



        int postId = Integer.parseInt(request.getParameter("postId"));



        PostDAO postDAO = new PostDAO();

        int createResult = postDAO.deleteReply(postId);
        result.put("responseMsg",createResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/message/number")
    public HashMap numberOfMessage(@RequestParam(name="userToken") String userToken) throws IOException  {
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




}


