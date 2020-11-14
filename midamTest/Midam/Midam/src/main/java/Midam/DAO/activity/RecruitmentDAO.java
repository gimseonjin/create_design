package Midam.DAO.activity;

import Midam.model.activity.ActivityHistory;
import Midam.model.activity.MentorRecruitment;
import Midam.model.community.Post;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class RecruitmentDAO {


    private Connection conn=null;
    private PreparedStatement pstmt;
    SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date now =new Date();

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

    public boolean createRecruitment(MentorRecruitment mentorRecruitment) { // 등록
        String sql = "insert into midam.user(id, password, name, gender,age,address, authority) values(?, ?, ?, ?, ?, ?, ?)";
        try {


            conn= getConnection();
            pstmt = conn.prepareStatement(sql);

            int r = pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return false;
    }            //회원가입


    public ArrayList<HashMap> getListRecruitment(int option, String regionCode,String linkAgencyCode){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql;


        try {

            conn=getConnection();

            if(option==0){ //아무것도 안할때, 옵션 0
                sql = "SELECT regionName, linkAgencyName, activityName, numberOfMentor, recruitmentStatus" +
                        " FROM mentor_recruitment join link_agency join region " +
                        "on mentor_recruitment.linkAgencyCode=link_agency.linkAgencyCode and link_agency.regionCode= region.regionCode ";
                pstmt = conn.prepareStatement(sql);
            }else if(option == 1){ //지역본부만 선택
                sql = "SELECT regionName, linkAgencyName, activityName, numberOfMentor, recruitmentStatus" +
                        " FROM mentor_recruitment join link_agency join region " +
                        "on mentor_recruitment.linkAgencyCode=link_agency.linkAgencyCode and link_agency.regionCode= region.regionCode " +
                        "where region.regionCode =?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, regionCode);
            }else if(option == 2){ // 연계기관 선택
                sql = "SELECT regionName, linkAgencyName, activityName, numberOfMentor, recruitmentStatus" +
                        " FROM mentor_recruitment join link_agency join region " +
                        "on mentor_recruitment.linkAgencyCode=link_agency.linkAgencyCode and link_agency.regionCode= region.regionCode " +
                        "where link_agency.linkAgencyCode = ?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, linkAgencyCode);

            }
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()) {

                HashMap recruitmentHashMap = new HashMap();
                recruitmentHashMap.put("regionName",rs.getString("regionName"));
                recruitmentHashMap.put("linkAgencyName",rs.getString("linkAgencyName"));
                recruitmentHashMap.put("activityName",rs.getString("activityName"));
                recruitmentHashMap.put("numberOfMentor",rs.getInt("numberOfMentor"));
                recruitmentHashMap.put("recruitmentStatus",rs.getInt("recruitmentStatus"));

                list.add(recruitmentHashMap);
            }

        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //모집 등록 조회


}
