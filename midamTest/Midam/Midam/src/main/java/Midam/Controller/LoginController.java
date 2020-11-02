package Midam.Controller;

import Midam.DAO.user.UserDAO;
import Midam.model.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;

@RestController
@RequestMapping("/reqLogin")
@CrossOrigin("http://localhost:3000")
public class LoginController {

    @PostMapping
    public HashMap login(@RequestParam("id") String id, @RequestParam("password") String password, @RequestParam("reqAuthority") int reqAuthority) throws SQLException, ClassNotFoundException {

        System.out.println(id+", "+password+","+reqAuthority);

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();
        int authority = userDAO.login(id, password, reqAuthority);
        
        result.put("authority", authority);
        switch(authority){
//            성공
            case 1:
                result.put("authorityName", "mentor");
                break;
            case 2:
                result.put("authorityName", "regionManager");
                break;
            case 3:
                result.put("authorityName", "linkAgencyManager");
                break;
            case 4:
                result.put("authorityName", "systemManager");
                break;
//                실패
            case 0:
                result.put("message", "미승인");
                break;
            case -1:
                result.put("message", "로그인 실패");
                break;
            case -2:
                result.put("message", "조회 실패");
                break;
            case -3:
                result.put("message", "오류 발생. 다시시도해주세요");
                break;
                
        }
        return result;
    }
}
