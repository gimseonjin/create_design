package Midam.Controller;
import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.user.MentorDAO;
import Midam.model.user.Mentor;
import org.springframework.stereotype.Controller;
import Midam.DAO.user.UserDAO;
import Midam.model.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.HashMap;

@Controller
@RequestMapping(value= "/user", method=RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class SignInController {

    @ResponseBody
    @PostMapping(value="/createUser")
    public HashMap createUser(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        int age = Integer.parseInt(request.getParameter("age"));
        String address = request.getParameter("address");
        String phoneNumber = request.getParameter("phoneNumber");
        int authority = Integer.parseInt(request.getParameter("authority"));

        //String regionCode = request.getParameter("regionCode");
        //volunteerId = request.getParameter("volunteerId");

        UserDAO userDAO = new UserDAO();

        int createResult = userDAO.createUser(id,password,name,gender,age,address,phoneNumber,authority);
        result.put("responseMsg",createResult);
        return result;
    }
}
