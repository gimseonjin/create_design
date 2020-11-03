package Midam.Controller;

import Midam.DAO.user.UserDAO;
import Midam.model.token.Token;
import Midam.model.user.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

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
    public HashMap hello(@RequestParam("userToken") String jwt ) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        System.out.println(jwt);
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(jwt).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();
        System.out.println(id);

        User user = userDAO.getUserInfo(id);



        result.put("id",user.getId());
        result.put("name",user.getName());
        result.put("gender",user.getGender());
        result.put("age",user.getAge());
        result.put("address",user.getAddress());
        result.put("phoneNumber",user.getPhoneNumber());
        result.put("authority",user.getAuthority());

        System.out.println(result);

        return result;
    }
}