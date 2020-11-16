package Midam.DAO.activity;

import Midam.model.activity.MentorRecruitment;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ApplicationDAO {


    private Connection conn=null;
    private PreparedStatement pstmt;
    SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date now =new Date();
    ResultSet rs;

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


    public int createApplication(String id,String mentorRecruitmentCode,String motivation,String career,String ability) { // 등록
        int result =0;
        String applicationDate = sdfDate.format(now);

        String sql_check_recruit = "select region.regionCode from region join link_agency join mentor_recruitment " +
                "on mentor_recruitment.linkAgencyCode = link_agency.linkAgencyCode and link_agency.regionCode = region.regionCode" +
                " where mentorRecruitmentCode=? ";
        String sql_check_id ="select region.regionCode from mentor join region on mentor.regionCode = region.regionCode where id =?";
        String sql_create = "insert into mentoring_application"+
                "(mentorRecruitmentCode,mentorId,applicationDate,applicationMotivation,career,ability,applicationStatus)" +
                " values(?,?,?,?,?,?,0)";
        try {

            conn=getConnection();


            pstmt=conn.prepareStatement(sql_check_recruit);
            pstmt.setString(1, mentorRecruitmentCode);
            rs=pstmt.executeQuery();
            rs.next();
            String regionCode_region = rs.getString(1);
            pstmt=conn.prepareStatement(sql_check_id);
            pstmt.setString(1, id);
            rs=pstmt.executeQuery();
            rs.next();
            String regionCode_mentor = rs.getString(1);

            if(regionCode_mentor.equals(regionCode_region)){
                pstmt= conn.prepareStatement(sql_create);
                pstmt.setString(1, mentorRecruitmentCode);
                pstmt.setString(2, id);
                pstmt.setString(3, applicationDate);
                pstmt.setString(4, motivation);
                pstmt.setString(5, career);
                pstmt.setString(6, ability);

                result = pstmt.executeUpdate();
            }
            else{
                result =-1;
            }








        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //신청 등록

}
