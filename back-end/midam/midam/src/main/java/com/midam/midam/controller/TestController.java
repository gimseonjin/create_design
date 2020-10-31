package com.midam.midam.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController("/test")
public class TestController {

    @GetMapping
    public HashMap testApi() {
        HashMap result = new HashMap();
        result.put("message", "HelloTest");
        System.out.println("여기지나감");

        return result;
    }
}
