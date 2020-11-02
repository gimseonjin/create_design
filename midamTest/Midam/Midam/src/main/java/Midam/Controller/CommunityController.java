package Midam.Controller;




//import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.community.PostDAO;
import Midam.DAO.user.UserDAO;
//import Midam.model.activity.ActivityHistory;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.Servlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;



    @Controller
    @RequestMapping(value= "/mentor/post", method=RequestMethod.POST)
    @CrossOrigin("http://localhost:3000")
    public class CommunityController {

        @ResponseBody
        @PostMapping(value="/read")
        public ArrayList readPostList() throws SQLException, ClassNotFoundException {
            HashMap result = new HashMap();

            PostDAO postDAO = new PostDAO();
            ArrayList<HashMap> postArrayList = postDAO.getListPost();
            int size = postArrayList.size();

            for(int i = 0; i< size; i++){
                result.put("list",postArrayList.get(i));
            }

            return postArrayList;
        }



    }


