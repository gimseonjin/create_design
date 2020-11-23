package Midam.DAO.activity;



import Midam.model.activity.MentoringApplication;
import Midam.model.community.Post;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class ApplicationDAO {


    private Connection conn=null;
    private PreparedStatement pstmt;
    SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date now =new Date();
    ResultSet rs;
    String sql;
    private Connection getConnection(){

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://midam-db.cd0zkvanrwmx.ap-northeast-2.rds.amazonaws.com/mydb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&characterEncoding=utf8", "admin", "midam1234");

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

    public ArrayList<HashMap> getListApplication(String id){

        ArrayList<HashMap> list =new ArrayList<HashMap>();
        String sql_user = "select authority from user where id =?";


        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql_user);
            pstmt.setString(1,id);
            rs= pstmt.executeQuery();
            rs.next();
            int authority = rs.getInt(1);

            if(authority==1){
                sql = "select * from mentoring_application join link_agency join mentor_recruitment join user " +
                        "on mentoring_application.mentorRecruitmentCode= mentor_recruitment.mentorRecruitmentCode" +
                        " and mentor_recruitment.linkAgencyCode = link_agency.linkAgencyCode" +
                        " and mentoring_application.mentorId = user.id" +
                        " where mentorId =?";

                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1,id);
                ResultSet rs= pstmt.executeQuery();


                while(rs.next()) {

                    HashMap applicationHashMap = new HashMap();
                    applicationHashMap.put("mentorRecruitmentCode",rs.getString("mentorRecruitmentCode"));
                    applicationHashMap.put("linkAgencyName",rs.getString("linkAgencyName"));
                    applicationHashMap.put("activityName",rs.getString("activityName"));
                    applicationHashMap.put("applicationDate",rs.getString("applicationDate"));
                    applicationHashMap.put("applicationStatus",rs.getInt("applicationStatus"));



                    list.add(applicationHashMap);
                }
            }else if(authority==2){

            }else if(authority==3){
                sql ="select activityName, name,id,age, gender, applicationDate ,applicationStatus ,mentoring_application.mentorRecruitmentCode " +
                        "from mentoring_application join link_agency join mentor_recruitment join user" +
                        " on mentoring_application.mentorRecruitmentCode= mentor_recruitment.mentorRecruitmentCode" +
                        " and mentor_recruitment.linkAgencyCode = link_agency.linkAgencyCode" +
                        " and mentoring_application.mentorId = user.id" +
                        " where linkAgencyManagerId =?";

                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1,id);
                ResultSet rs= pstmt.executeQuery();


                while(rs.next()) {

                    HashMap applicationHashMap = new HashMap();

                    applicationHashMap.put("mentorRecruitmentCode",rs.getString("mentorRecruitmentCode"));
                    applicationHashMap.put("activityName",rs.getString("activityName"));
                    applicationHashMap.put("id",rs.getString("id"));
                    applicationHashMap.put("name",rs.getString("name"));
                    applicationHashMap.put("age",rs.getInt("age"));
                    applicationHashMap.put("gender",rs.getString("gender"));
                    applicationHashMap.put("applicationDate",rs.getString("applicationDate"));
                    applicationHashMap.put("applicationStatus",rs.getInt("applicationStatus"));



                    list.add(applicationHashMap);
                }
            }else {

            }




        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //신청 목록 조회

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

    public MentoringApplication readApplicationInfo(String id,String mentorRecruitmentCode){
       MentoringApplication mentoringApplication = new MentoringApplication();
        String sql = "SELECT * from mentoring_application where mentorId = ? and mentorRecruitmentCode =?";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, id);
            pstmt.setString(2, mentorRecruitmentCode);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()){

                mentoringApplication.setApplicationMotivation(rs.getString("applicationMotivation"));
                mentoringApplication.setCareer(rs.getString("career"));
                mentoringApplication.setAbility(rs.getString("ability"));
                mentoringApplication.setApplicationDate(rs.getString("applicationDate"));

            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return mentoringApplication;
    }

    public int approvalPass(String id, String mentorRecruitmentCode) {
        int result =0;

        String sql_checkNum ="select passedNumber, numberOfMentor from mentor_recruitment where mentorRecruitmentCode =?";
        String sql = "update mentoring_application set applicationStatus =? where mentorId =? and mentorRecruitmentCode= ?";
        String sql_pass ="update mentor_recruitment set passedNumber =passedNumber+1  where mentorRecruitmentCode =?";

        try {

            conn=getConnection();

            pstmt = conn.prepareStatement(sql_checkNum);
            pstmt.setString(1, mentorRecruitmentCode);
            rs=pstmt.executeQuery();
            rs.next();
            int passedNumber =rs.getInt(1);
            int numberOfMentor = rs.getInt(2);

            if(passedNumber ==numberOfMentor){
                result =-1;
            }else{
                pstmt = conn.prepareStatement(sql);
                pstmt.setInt(1, 1);
                pstmt.setString(2, id);
                pstmt.setString(3, mentorRecruitmentCode);
                pstmt.executeUpdate();


                pstmt = conn.prepareStatement(sql_pass);
                pstmt.setString(1, mentorRecruitmentCode);
                pstmt.executeUpdate();
            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //멘토링 신청 합격
    public int approvalFail(String id, String mentorRecruitmentCode) {
        int result =0;


        String sql = "update mentoring_application set applicationStatus =? where mentorId =? and mentorRecruitmentCode= ?";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, -1);
            pstmt.setString(2, id);
            pstmt.setString(3, mentorRecruitmentCode);



            pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //멘토링 신청 탈락
}
