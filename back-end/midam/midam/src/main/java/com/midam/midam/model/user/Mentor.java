package com.midam.midam.model.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Mentor {
    User user;
    String regionCode;
    String address;
    String phoneNumber;
    int age;
    String volunteerId;
}
