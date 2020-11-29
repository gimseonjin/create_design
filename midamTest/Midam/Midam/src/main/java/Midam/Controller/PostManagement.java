package Midam.Controller;


import Midam.DAO.community.PostDAO;
import Midam.model.community.Post;
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
public class PostManagement {


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

        Post readResult = postDAO.readInfo(postId);
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

        int createResult = postDAO.create(id,title,content);
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

        int updateResult = postDAO.update(postId,title,content);
        result.put("responseMsg",updateResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/deletePost")
    public HashMap deletePost(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        int postId = Integer.parseInt(request.getParameter("postId"));


        PostDAO postDAO = new PostDAO();

        int deleteResult = postDAO.delete(postId);
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
}
