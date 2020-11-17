package Midam.model.activity;

import java.sql.Timestamp;

public class MentoringApplication {
    private String mentorRecruitmentCode;
    private String mentorId;
    private String applicationDate;
    private String applicationMotivation;
    private String career;
    private String ability;

    public String getMentorRecruitmentCode() {
        return mentorRecruitmentCode;
    }

    public void setMentorRecruitmentCode(String mentorRecruitmentCode) {
        this.mentorRecruitmentCode = mentorRecruitmentCode;
    }

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public String getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(String applicationDate) {
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
