package com.midam.midam.config;
import com.midam.midam.model.user.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.midam.midam.DAO.user.UserDAO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/mentor")
public class webController {

 /*   // 메인 페이지
    @RequestMapping(value = "/")
    public String index() {
        return "/index";
    }*/
    UserDAO userDAO = new UserDAO();

    @GetMapping
    public ArrayList<User> userList(){
        System.out.println(userDAO.readUser());
        System.out.println("유저리스트 출력 성공");
        return userDAO.readUser();
    }
}