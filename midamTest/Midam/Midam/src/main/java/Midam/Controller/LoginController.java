package Midam.Controller;

import Midam.DAO.user.UserDAO;
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
    public String loginTest(@RequestParam("id") String id, @RequestParam("password") String password, @RequestParam("reqAuthority") int reqAuthority) throws SQLException, ClassNotFoundException{
        String jwt = "";
        if((id.equals("test1") && password.equals("1234") && reqAuthority == 1) ||
                (id.equals("test2") && password.equals("1234") && reqAuthority == 2) ||
                (id.equals("test3") && password.equals("1234") && reqAuthority == 3) ||
                (id.equals("test4") && password.equals("1234") && reqAuthority == 4)){
            UserToken userToken = new UserToken(id,password,reqAuthority);
            jwt = tokenController.createToken(userToken);
        } else{
            jwt = "Login False";
        }
        return jwt;
    }

    @PostMapping("checkAuthority")
    public String chekcAuthority(@RequestParam("userToken") String jwt) throws UnsupportedEncodingException {

        System.out.println(jwt);
        Map<String, Object> claimMa = tokenController.verifyJWT(jwt);
        String result = "";
        Object id = claimMa.get("id");
        Object password = claimMa.get("password");
        Object reqAuthority = claimMa.get("authority");
        System.out.println("success");

        if((id.equals("test1") && password.equals("1234") && reqAuthority.equals(1)) ||
                (id.equals("test2") && password.equals("1234") && reqAuthority.equals(2)) ||
                (id.equals("test3") && password.equals("1234") && reqAuthority.equals(3)) ||
                (id.equals("test4") && password.equals("1234") && reqAuthority.equals(4))){
            result = "TRUE";
        } else{
            jwt = "FALSE";
        }
        return jwt;

    }

    @RequestMapping("test")
    public String test(@RequestBody t T) throws UnsupportedEncodingException {
//

       if(T.equals(" "))
           return "FALSE";

        Claims claims = tokenController.verifyJWTAll(T.getUserToken());

        Map<String, Object> data = claims.get("data", HashMap.class);
        Object id = data.get("id");
        Object password = data.get("password");
        Object authority = data.get("authority");

//
        if(id.equals("test1") && password.equals("1234") && authority.equals(1))
            return "TRUE";
//

            return "FALSE";

    }
}

class t {
    String userToken;

    public String getUserToken() {
        return userToken;
    }

    public void setUserToken(String userToken) {
        this.userToken = userToken;
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
