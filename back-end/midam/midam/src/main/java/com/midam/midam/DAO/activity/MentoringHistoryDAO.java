package com.example.midam.DAO.actitvity;

import com.example.midam.vo.activity.ActivityHistory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;


public class MentoringHistoryDAO {

    //CREATE UPDATE DELETE READ GETList

    private Connection conn=null;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;

    private Connection getConnection(){
        String url= "jdbc:mysql://localhost:3306/mydb?useSSL=false";
        String admin ="root";
        String password="emm05235";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url, admin, password);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    private void closeConnection(Connection conn) {
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(conn!=null) {
            try {
                conn.close();
            }catch(SQLException e) {}
        }
    }

    public boolean create(ActivityHistory activityHistory) { // 등록
        sql = "insert into midam.activity_history(activityHistoryCode, mentoringActivityCode," +
                "linkAgencyManagerId, regionManagerId,mentorId,startTime)"
                + " values(?, ?, ?, ?, ?, ?)";
        try {

            conn= getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, activityHistory.getActivityHistoryCode());
            pstmt.setString(2, activityHistory.getMentoringActivityCode());
            pstmt.setString(3, activityHistory.getLinkAgencyManagerId());
            pstmt.setString(4, activityHistory.getRegionManagerId());
            pstmt.setString(5, activityHistory.getMentorId());
            pstmt.setTimestamp(6, activityHistory.getStartTime());

            int r = pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return false;
    }           //출석
    public boolean update(ActivityHistory activityHistory) {
        sql = "UPDATE midam.activity_history SET startTime= ?,endTime=?,activityContent=?,note=?,activityPicture=? where (mentorId=?)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setTimestamp(1, activityHistory.getStartTime());
            pstmt.setTimestamp(2, activityHistory.getEndTime());

            pstmt.setString(3, activityHistory.getActivityContent());
            pstmt.setString(4, activityHistory.getNote());
            pstmt.setBytes(5, activityHistory.getActivityPicture());

            int r = pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return false;
    }           //활동내역수정(보고서+수기등록)

    public ActivityHistory read(int activityHistoryCode){

        ActivityHistory activityHistory = null;
        String sql = "SELECT * FROM midam.activity_history where activityHistoryCode=?";

        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, activityHistoryCode);  //검색하기위해 입력한 아이디
            ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {
                
                activityHistory =new ActivityHistory();
                activityHistory.setActivityHistoryCode(rs.getInt("activityHistoryCode"));
                activityHistory.setMentoringActivityCode(rs.getString("mentoringActivityCode"));
                activityHistory.setLinkAgencyManagerId(rs.getString("linkAgencyManagerId"));
                activityHistory.setRegionManagerId(rs.getString("regionManagerId"));
                activityHistory.setMentorId(rs.getString("mentorId"));
                activityHistory.setStartTime(rs.getTimestamp("startTime"));
                activityHistory.setEndTime(rs.getTimestamp("endTime"));

                activityHistory.setActivityContent(rs.getString("activityContent"));
                activityHistory.setNote(rs.getString("note"));
                activityHistory.setActivityPicture(rs.getBytes("activityPicture"));
                activityHistory.setCreateDate(rs.getTimestamp("createDate"));
                activityHistory.setApprovalDate(rs.getTimestamp("approvalDate"));
                activityHistory.setApprovalStatus(rs.getInt("approvalStatus"));
                activityHistory.setCompanionReason(rs.getString("companionReason"));

            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return activityHistory;
    }      //활동내역 상세조회
    public ArrayList<ActivityHistory> getList(String linkAgencyCode){

        ArrayList<ActivityHistory> list =new ArrayList<ActivityHistory>();
        String sql = "SELECT * FROM midam.activity_history where linkAgencyCode=?";

        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, linkAgencyCode);  //검색하기위해 입력한 아이디
            ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {
                ActivityHistory activityHistory =new ActivityHistory();
                activityHistory.setActivityHistoryCode(rs.getInt("activityHistoryCode"));
                activityHistory.setMentoringActivityCode(rs.getString("mentoringActivityCode"));
                activityHistory.setLinkAgencyManagerId(rs.getString("linkAgencyManagerId"));
                activityHistory.setRegionManagerId(rs.getString("regionManagerId"));
                activityHistory.setMentorId(rs.getString("mentorId"));
                activityHistory.setStartTime(rs.getTimestamp("startTime"));
                activityHistory.setEndTime(rs.getTimestamp("endTime"));
                /*
                user.setAuthority(rs.getInt("activityContent"));
                user.setPhoneNumber(rs.getString("note"));
                user.setPhoneNumber(rs.getString("activityPicture"));
                user.setPhoneNumber(rs.getString("createDate"));
                user.setPhoneNumber(rs.getString("approvalDate"));
                user.setPhoneNumber(rs.getString("approvalStatus"));
                user.setPhoneNumber(rs.getString("companionReason"));
                */
                list.add(activityHistory);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //전체 활동내역 목록
}
