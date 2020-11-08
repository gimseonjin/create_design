package Midam.Controller;

import Midam.DAO.community.PostDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.community.Post;
import Midam.model.token.Token;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
        public HashMap readPostInfo(MultipartHttpServletRequest request)  {
            HashMap result = new HashMap();


            int postId = Integer.parseInt(request.getParameter("postId"));

            PostDAO postDAO = new PostDAO();

            Post readResult = postDAO.readPostInfo(postId);
            result.put("postId",readResult.getPostId());
            result.put("writerId",readResult.getWriterId());
            result.put("writeDate",readResult.getWriteDate());
            result.put("title",readResult.getTitle());
            result.put("content",readResult.getContent());
            return result;
        }

        @ResponseBody
        @PostMapping(value="/createPost")
        public HashMap createPost(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

            HashMap result = new HashMap();

            String writerId= request.getParameter("writerId");
            String title=request.getParameter("title");
            String content=request.getParameter("content");

            PostDAO postDAO = new PostDAO();

            int createResult = postDAO.createPost(writerId,title,content);
            result.put("responseMsg",createResult);
            return result;
        }
    @ResponseBody
    @PostMapping(value="/updatePost")
    public HashMap updatePost(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        int postId = Integer.parseInt(request.getParameter("postId"));
        String title=request.getParameter("title");
        String content=request.getParameter("content");

        PostDAO postDAO = new PostDAO();

        int createResult = postDAO.updatePost(postId,title,content);
        result.put("responseMsg",createResult);
        return result;
    }
        @ResponseBody
        @PostMapping(value="/readReply")
        public ArrayList readReply(MultipartHttpServletRequest request)  {

            int postId = Integer.parseInt(request.getParameter("postId"));
            PostDAO postDAO = new PostDAO();

            ArrayList<HashMap> replyArrayList = postDAO.getListReply(postId);

           return replyArrayList;
        } //해당 게시글 댓글목록 조회

        @ResponseBody
        @PostMapping(value="/createReply")
        public HashMap createReply(@RequestParam(name="userToken") String userToken, MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

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

    
    
    
    }


