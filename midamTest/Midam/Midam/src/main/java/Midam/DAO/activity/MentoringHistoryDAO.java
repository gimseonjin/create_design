package Midam.DAO.activity;

import Midam.model.activity.ActivityHistory;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;


public class MentoringHistoryDAO {

    //CREATE UPDATE DELETE READ GETList

    private Connection conn=null;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;

    private Connection getConnection(){

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mydb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&characterEncoding=utf8", "root", "root");

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
        sql = "insert into activity_history(activityHistoryCode, mentoringActivityCode," +
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
        sql = "UPDATE activity_history SET startTime= ?,endTime=?,activityContent=?,note=?,activityPicture=? where (mentorId=?)";
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
        sql = "SELECT * FROM activity_history where activityHistoryCode=?";

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
        sql = "SELECT * FROM activity_history where linkAgencyCode=?";

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
                
                list.add(activityHistory);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //전체 활동내역 목록

//    지훈.11.01 추가 - 멘토가 자신의 id를 통해 자기 활동 내역만 조회
    public ArrayList<HashMap> getListMentor(String id){

        ArrayList<HashMap> list =new ArrayList<HashMap>();
        sql = "SELECT * FROM activity_history where mentorId=? ";

        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);  //검색하기위해 입력한 아이디
            ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {

                ActivityHistory activityHistory =new ActivityHistory();

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("activityHistoryCode",rs.getInt("activityHistoryCode"));
                historyHashMap.put("mentoringActivityCode",rs.getString("mentoringActivityCode"));
                historyHashMap.put("linkAgencyManagerId",rs.getString("linkAgencyManagerId"));
                historyHashMap.put("regionManagerId",rs.getString("regionManagerId"));
                historyHashMap.put("mentorId",rs.getString("mentorId"));
                historyHashMap.put("startTime",rs.getTimestamp("startTime"));
                historyHashMap.put("endTime",rs.getTimestamp("endTime"));
                historyHashMap.put("date",rs.getString("createDate"));
                historyHashMap.put("status",rs.getString("approvalStatus"));
                historyHashMap.put("report",rs.getString("activityContent"));

                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //전체 활동내역 목록

    // 보고서 업데이트 updateReport. content, note, image 업데이트
    public int updateReport(int activityHistoryCode, String id, String content, String note, Blob imageBlob){
        int result = 0;
        sql = "UPDATE activity_history SET activityContent = ?, note = ? ,activityPicture=?  WHERE activityHistoryCode = ? AND mentorId= ?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,content);
            pstmt.setString(2,note);
            pstmt.setBlob(3,imageBlob);
            pstmt.setInt(4,activityHistoryCode);
            pstmt.setString(5,id);
            result= pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }






        return result;
    }

}
