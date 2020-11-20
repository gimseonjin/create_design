package Midam.Controller;

import Midam.DAO.user.UserDAO;
import Midam.model.token.Token;
import Midam.model.user.Mentor;
import Midam.model.user.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
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
    public HashMap getUserInfo(@RequestParam(name="userToken") String userToken) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        System.out.println(userToken);
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();
        System.out.println(id);

        Mentor mentor = userDAO.getUserInfo(id);



        result.put("id",mentor.getId());
        result.put("name",mentor.getName());
        result.put("gender",mentor.getGender());
        result.put("age",mentor.getAge());
        result.put("address",mentor.getAddress());
        result.put("phoneNumber",mentor.getPhoneNumber());
        result.put("authority",mentor.getAuthority());
        result.put("volunteerId",mentor.getVolunteerId());
        result.put("region", mentor.getRegionCode());

        System.out.println(result);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/searchId")
    public HashMap searchId(HttpServletRequest request)  {
        HashMap result = new HashMap();


        String name =request.getParameter("name");

        UserDAO userDAO = new UserDAO();

        User searchResult = userDAO.searchId(name);
        result.put("id",searchResult.getId());


        return result;
    }
}