//package Midam.Controller;
//
//import Midam.DAO.user.UserDAO;
//import org.springframework.boot.autoconfigure.web.ServerProperties;
//import org.springframework.http.converter.FormHttpMessageConverter;
//import org.springframework.stereotype.Controller;
//import org.springframework.stereotype.Repository;
//import org.springframework.web.bind.annotation.*;
//
//import javax.servlet.Servlet;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.sql.SQLException;
//import java.util.HashMap;
//
//
//
//@Controller
//@RequestMapping(value= "/testPost", method=RequestMethod.POST)
//@CrossOrigin("http://localhost:3000")
//public class ReadActivityHistoryController {
//
//
//
////    @ResponseBody
////    public String simpleTest(@RequestParam("id") String id, @RequestParam("name") String password) {
////        System.out.println(id + password);
////        return id + password;
////    }
//    @ResponseBody
//    @PostMapping
//    public HashMap hello(@RequestParam("id") String id, @RequestParam("password") String password, HttpServletResponse response) throws SQLException, ClassNotFoundException {
//        HashMap result = new HashMap();
//        result.put("hello", "hello");
//        System.out.println("passed readActivityHistoryController");
//        System.out.println(id +","+ password);
//        UserDAO userDAO = new UserDAO();
//        int authority = userDAO.readLogin(id, password);
//        System.out.println(authority);
//        result.put("authority",authority);
//
//        return result;
//    }
//
////    public int login(String id, String password){
////
////
////    }
//}
