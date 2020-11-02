package Midam.DAO.community;

import Midam.model.community.Post;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

public class PostDAO {

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



    public ArrayList<HashMap> getListPost(){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql = "select postId,groupId,writerId,title,writeDate,numberOfView,replyOrder,replyStep from post";

      //  int start= (page -1 )*10+1;
      //  int end =start+9;
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
          //  pstmt.setInt(1, start);
          //  pstmt.setInt(2, end);
            rs= pstmt.executeQuery();


            while(rs.next()) {
                HashMap postHashMap = new HashMap();

                postHashMap.put("postId",rs.getInt("postId"));
                postHashMap.put("groupId",rs.getInt("groupId"));
                postHashMap.put("writerId",rs.getString("writerId"));
                postHashMap.put("replyOrder",rs.getInt("replyOrder"));
                postHashMap.put("replyStep",rs.getInt("replyStep"));

                postHashMap.put("title",rs.getString("title"));
                postHashMap.put("writeDate",rs.getTimestamp("writeDate"));
                postHashMap.put("numberOfView",rs.getInt("numberOfView"));



                list.add(postHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //전체 활동내역 목록

/*
    public ArrayList<HashMap> getListMentor(String id){

        ArrayList<HashMap> list =new ArrayList<HashMap>();
        String sql = "SELECT * FROM activity_history where mentorId=? ";

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
    }

 */
}