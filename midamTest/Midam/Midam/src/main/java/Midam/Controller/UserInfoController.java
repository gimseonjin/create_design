package Midam.Controller;

import Midam.DAO.user.UserDAO;
import Midam.model.user.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.HashMap;

@Controller
@RequestMapping(value= "/reqUserInfo", method= RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class UserInfoController {


    //    @ResponseBody
//    public String simpleTest(@RequestParam("id") String id, @RequestParam("name") String password) {
//        System.out.println(id + password);
//        return id + password;
//    }
    @ResponseBody
    @PostMapping
    public HashMap hello(@RequestParam("id") String id) throws SQLException, ClassNotFoundException {
        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();
        System.out.println(id);
        User user = userDAO.getUserInfo(id);

        result.put("id",user.getId());
        result.put("name",user.getName());
        result.put("gender",user.getGender());
        result.put("age",user.getAge());
        result.put("address",user.getAddress());
        result.put("phoneNumber",user.getPhoneNumber());
        result.put("authority",user.getAuthority());



        return result;
    }
}