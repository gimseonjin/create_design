package com.example.demo.model.activity;

import java.sql.Timestamp;

public class MentorRecruitment {
    private char mentoringActivityCode;
    private String linkAgencyManagerId;
    private char linkAgencyCode;
    private String activityName;
    private int numberOfMentor;
    private java.sql.Timestamp startDate;
    private java.sql.Timestamp finishDate;
    private int recruitmentStatus;
    private String activityInfo;

    public char getMentoringActivityCode() {
        return mentoringActivityCode;
    }

    public void setMentoringActivityCode(char mentoringActivityCode) {
        this.mentoringActivityCode = mentoringActivityCode;
    }

    public String getLinkAgencyManagerId() {
        return linkAgencyManagerId;
    }

    public void setLinkAgencyManagerId(String linkAgencyManagerId) {
        this.linkAgencyManagerId = linkAgencyManagerId;
    }

    public char getLinkAgencyCode() {
        return linkAgencyCode;
    }

    public void setLinkAgencyCode(char linkAgencyCode) {
        this.linkAgencyCode = linkAgencyCode;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public int getNumberOfMentor() {
        return numberOfMentor;
    }

    public void setNumberOfMentor(int numberOfMentor) {
        this.numberOfMentor = numberOfMentor;
    }

    public Timestamp getStartDate() {
        return startDate;
    }

    public void setStartDate(Timestamp startDate) {
        this.startDate = startDate;
    }

    public Timestamp getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Timestamp finishDate) {
        this.finishDate = finishDate;
    }

    public int getRecruitmentStatus() {
        return recruitmentStatus;
    }

    public void setRecruitmentStatus(int recruitmentStatus) {
        this.recruitmentStatus = recruitmentStatus;
    }

    public String getActivityInfo() {
        return activityInfo;
    }

    public void setActivityInfo(String activityInfo) {
        this.activityInfo = activityInfo;
    }
}
