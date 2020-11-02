package Midam.Controller;

import Midam.DAO.user.UserDAO;
import Midam.model.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLException;
import java.util.HashMap;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class SignInController {

    @RequestMapping(value ="/signIn", method = RequestMethod.POST)
    public HashMap signIn(HttpServletRequest request) throws Exception {

        //User user = new User(request.getParameter("id"));


        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();
       // userDAO.create(user);

        return result;
    }
}
