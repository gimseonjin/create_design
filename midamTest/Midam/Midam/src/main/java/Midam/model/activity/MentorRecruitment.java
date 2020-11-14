package Midam.model.activity;

import java.sql.Timestamp;

public class MentorRecruitment {
    private String mentorRecruitmentCode;
    private String linkAgencyManagerId;
    private char linkAgencyCode;
    private String activityName;
    private int numberOfMentor;
    private String startDate;
    private String finishDate;
    private int recruitmentStatus;
    private String activityInfo;
    private int passedNumber;
    public String getMentorRecruitmentCode() {
        return mentorRecruitmentCode;
    }

    public void setMentorRecruitmentCode(String mentorRecruitmentCode) {
        this.mentorRecruitmentCode = mentorRecruitmentCode;
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

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(String finishDate) {
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

    public int getPassedNumber() {
        return passedNumber;
    }

    public void setPassedNumber(int passedNumber) {
        this.passedNumber = passedNumber;
    }
}
