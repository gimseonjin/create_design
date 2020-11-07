package Midam.Controller;

import Midam.DAO.community.PostDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.community.Post;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

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
        @PostMapping(value="/readReplyPost")
        public ArrayList replyPostList()  {

            PostDAO postDAO = new PostDAO();
            ArrayList<HashMap> replyPostArrayList = postDAO.getListReplyPost();

            return replyPostArrayList;
        } //해당 게시글 댓글목록 조회
    
    
    
    
    }


