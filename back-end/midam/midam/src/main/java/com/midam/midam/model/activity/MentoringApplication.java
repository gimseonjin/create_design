package com.example.midam.vo.activity;

import java.sql.Timestamp;

public class MentoringApplication {
    private char mentoringActivityCode;
    private String mentorId;
    private java.sql.Timestamp applicationDate;
    private String applicationMotivation;
    private String career;
    private String ability;

    public char getMentoringActivityCode() {
        return mentoringActivityCode;
    }

    public void setMentoringActivityCode(char mentoringActivityCode) {
        this.mentoringActivityCode = mentoringActivityCode;
    }

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public Timestamp getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(Timestamp applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getApplicationMotivation() {
        return applicationMotivation;
    }

    public void setApplicationMotivation(String applicationMotivation) {
        this.applicationMotivation = applicationMotivation;
    }

    public String getCareer() {
        return career;
    }

    public void setCareer(String career) {
        this.career = career;
    }

    public String getAbility() {
        return ability;
    }

    public void setAbility(String ability) {
        this.ability = ability;
    }
}
