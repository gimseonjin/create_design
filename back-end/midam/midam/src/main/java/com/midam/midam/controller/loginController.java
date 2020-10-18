package com.midam.midam.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class loginController {

    @GetMapping
    public String loginView() {
        return "login-form.html";
    }

    @GetMapping("/loginAfter")
    public String afterView() {
        return "admin.html";
    }

}