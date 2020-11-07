package Midam.Controller;

import Midam.DAO.user.*;
import Midam.model.token.Token;
import Midam.model.user.User;
import io.jsonwebtoken.Claims;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin("http://localhost:3000")
public class LoginController {

    Token tokenController = new Token();
    private Object String;
    private java.lang.Object Object;
    private java.lang.Object Map;

    @PostMapping("login")
    public HashMap loginTest(@RequestParam("id") String id, @RequestParam("password") String password, @RequestParam("reqAuthority") int reqAuthority) throws SQLException, ClassNotFoundException {

        HashMap result = new HashMap();
        String jwt = "";
        UserDAO userDAO = new UserDAO();
        int authority = userDAO.login(id, password, reqAuthority);
        switch (authority) {
            case 1:
            case 2:
            case 3:
            case 4:
                UserToken userToken = new UserToken(id, password, authority);
                jwt = tokenController.createToken(userToken);
                result.put("result", 1);
                result.put("userToken", jwt);
                break;

            case 0:
            case -1:
            case -2:
            case -3:
                result.put("result", 0);
                result.put("message", "login fail");
        }
        return result;
    }

    @PostMapping("checkAuthority")
    public String chekcAuthority(@RequestParam("userToken") String jwt, @RequestParam("authority") String Aut) throws UnsupportedEncodingException {

        System.out.println(jwt);
        Map<String, Object> claimMa = tokenController.verifyJWT(jwt);
        String result = "";
        String id = claimMa.get("id").toString();
        String password = claimMa.get("password").toString();
        int reqAuthority = Integer.parseInt(claimMa.get("authority").toString());

        UserDAO userDAO = new UserDAO();
        int authority = userDAO.login(id, password, reqAuthority);
        System.out.println("success");

        if (reqAuthority == Integer.parseInt(Aut)) {
            result = "TRUE";
        } else {
            result = "FALSE";
        }
        return result;
    }
}


class UserToken {
    String id;
    String password;
    int authority;

    public UserToken(String id, String password, int authority){
        this.id = id;
        this.password = password;
        this.authority = authority;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAuthority() {
        return authority;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }
}
