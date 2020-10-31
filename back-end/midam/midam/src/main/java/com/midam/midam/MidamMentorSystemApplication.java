package com.midam.midam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class MidamMentorSystemApplication {
	@PostConstruct
	void init() { TimeZone.setDefault(TimeZone.getTimeZone("UTC")); }

	public static void main(String[] args) {
		SpringApplication.run(MidamMentorSystemApplication.class, args);
	}

}
