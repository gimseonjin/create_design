package Midam.model.activity;

import java.sql.Blob;
import java.sql.Timestamp;
import java.util.Base64;


public class ActivityHistory {

    private int activityHistoryCode;
    private String mentorRecruitmentCode;
    private String linkAgencyManagerId;
    private String regionManagerId;
    private String mentorId;
    private java.sql.Timestamp startTime;
    private java.sql.Timestamp endTime;
    private String activityContent;
    private String note;
    private byte[] activityPicture;
    private java.sql.Timestamp createDate;
    private java.sql.Timestamp approvalDate;
    private int approvalStatus;
    private String companionReason;

    public int getActivityHistoryCode() {
        return activityHistoryCode;
    }

    public void setActivityHistoryCode(int activityHistoryCode) {
        this.activityHistoryCode = activityHistoryCode;
    }

    public String getMentoringActivityCode() {
        return mentorRecruitmentCode;
    }

    public void setMentoringActivityCode(String mentorRecruitmentCode) {
        this.mentorRecruitmentCode = mentorRecruitmentCode;
    }

    public String getLinkAgencyManagerId() {
        return linkAgencyManagerId;
    }

    public void setLinkAgencyManagerId(String linkAgencyManagerId) {
        this.linkAgencyManagerId = linkAgencyManagerId;
    }

    public String getRegionManagerId() {
        return regionManagerId;
    }

    public void setRegionManagerId(String regionManagerId) {
        this.regionManagerId = regionManagerId;
    }

    public String getMentorId() {
        return mentorId;
    }

    public void setMentorId(String mentorId) {
        this.mentorId = mentorId;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public String getActivityContent() {
        return activityContent;
    }

    public void setActivityContent(String activityContent) {
        this.activityContent = activityContent;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public byte[] getActivityPicture() {
        return activityPicture;
    }

    public void setActivityPicture(byte[] activityPicture) {
        this.activityPicture = activityPicture;
    }

    public Timestamp getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Timestamp createDate) {
        this.createDate = createDate;
    }

    public Timestamp getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(Timestamp approvalDate) {
        this.approvalDate = approvalDate;
    }

    public int getApprovalStatus() {
        return approvalStatus;
    }

    public void setApprovalStatus(int approvalStatus) {
        this.approvalStatus = approvalStatus;
    }

    public String getCompanionReason() {
        return companionReason;
    }

    public void setCompanionReason(String companionReason) {
        this.companionReason = companionReason;
    }

//    BLOB을 JSON으로 보낼수가 없어. binary데이터는 담을 수 없는듯. 그래서 uri로 바꿔서 보낼수있게 바꾸려고함.

    public String getActivityPictureBASE64(){
        return "data:image/jpeg;base64,"+ new String(Base64.getEncoder().encode(activityPicture));
    }

}
