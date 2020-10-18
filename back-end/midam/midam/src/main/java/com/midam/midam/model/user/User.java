package com.example.midam.vo;

import lombok.Data;


@Data
public class User {
    String id;
    String password;
    String name;
    String gender;
    int age;
    String address;
    String phoneNumber;
    int authority;
}
