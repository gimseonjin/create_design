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
    ResultSet rs;
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

    public int createRecruitment(String id,String activityName,int numberOfMentor,String activityInfo,String startDate,String finishDate) { // 등록
        int result =0;
        String max_code,str_code, code3 ,RC="RC" ,mentorRecruitmentCode;
        int code,code2;

        String sql_max ="select max(mentorRecruitmentCode) from mentor_recruitment";

        String sql_id = "SELECT linkAgencyCode FROM mydb.link_agency_manager where id= ?";

        String sql_create = "insert into mentor_recruitment"+
                "(mentorRecruitmentCode,linkAgencyManagerId,linkAgencyCode,activityName,numberOfMentor,startDate,finishDate,recruitmentStatus,activityInfo)" +
                " values(?,?,?,?,?,?,?,0,?)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql_max);
            rs= pstmt.executeQuery();
            rs.next();
            max_code = rs.getString(1);
            str_code=max_code.substring(2,6);

            code = Integer.parseInt(str_code);
            code2 =code+1;
            code3=String.format("%04d", code2);
            mentorRecruitmentCode= RC.concat(code3);

            pstmt = conn.prepareStatement(sql_id);
            pstmt.setString(1,id);
            rs= pstmt.executeQuery();
            rs.next();
            String linkAgencyCode =rs.getString(1);


            pstmt= conn.prepareStatement(sql_create);
            pstmt.setString(1, mentorRecruitmentCode);
            pstmt.setString(2, id);
            pstmt.setString(3, linkAgencyCode);
            pstmt.setString(4, activityName);
            pstmt.setInt(5, numberOfMentor);
            pstmt.setString(6, startDate);
            pstmt.setString(7, finishDate);
            pstmt.setString(8, activityInfo);

            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //모집 등록

    public int updateRecruitment(String mentorRecruitmentCode,String activityName,int numberOfMentor,String activityInfo,String startDate,String finishDate) { // 수정
        int result =0;


        String sql = "update mentor_recruitment set activityName= ? , numberOfMentor= ? ,activityInfo =? , startDate= ?, finishDate = ? where mentorRecruitmentCode =?";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, activityName);
            pstmt.setInt(2, numberOfMentor);
            pstmt.setString(3, activityInfo);
            pstmt.setString(3, startDate);
            pstmt.setString(3, finishDate);



            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //모집 수정


    public ArrayList<HashMap> readRecruitment(int option, String regionCode,String linkAgencyCode){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql;


        try {

            conn=getConnection();

            if(option==0){ //아무것도 안할때, 옵션 0
                sql = "SELECT mentorRecruitmentCode ,regionName, linkAgencyName, activityName, numberOfMentor, recruitmentStatus" +
                        " FROM mentor_recruitment join link_agency join region " +
                        "on mentor_recruitment.linkAgencyCode=link_agency.linkAgencyCode and link_agency.regionCode= region.regionCode ";
                pstmt = conn.prepareStatement(sql);
            }else if(option == 1){ //지역본부만 선택
                sql = "SELECT mentorRecruitmentCode, regionName, linkAgencyName, activityName, numberOfMentor, recruitmentStatus" +
                        " FROM mentor_recruitment join link_agency join region " +
                        "on mentor_recruitment.linkAgencyCode=link_agency.linkAgencyCode and link_agency.regionCode= region.regionCode " +
                        "where region.regionCode =?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, regionCode);
            }else if(option == 2){ // 연계기관 선택
                sql = "SELECT mentorRecruitmentCode, regionName, linkAgencyName, activityName, numberOfMentor, recruitmentStatus" +
                        " FROM mentor_recruitment join link_agency join region " +
                        "on mentor_recruitment.linkAgencyCode=link_agency.linkAgencyCode and link_agency.regionCode= region.regionCode " +
                        "where link_agency.linkAgencyCode = ?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, linkAgencyCode);

            }
            rs= pstmt.executeQuery();
            while(rs.next()) {

                HashMap recruitmentHashMap = new HashMap();
                recruitmentHashMap.put("mentorRecruitmentCode",rs.getString("mentorRecruitmentCode"));
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

    public MentorRecruitment readRecruitmentInfo(String mentorRecruitmentCode){

        MentorRecruitment mentorRecruitment = new MentorRecruitment();
        String sql = "SELECT mentorRecruitmentCode, linkAgencyManagerId, activityName, numberOfMentor, startDate, finishDate, activityInfo, passedNumber " +
                     "FROM mentor_recruitment WHERE mentorRecruitmentCode = ? ";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, mentorRecruitmentCode);
            rs= pstmt.executeQuery();
            while(rs.next()){
                mentorRecruitment.setMentorRecruitmentCode(rs.getString("mentorRecruitmentCode"));
                mentorRecruitment.setLinkAgencyManagerId(rs.getString("linkAgencyManagerId"));
                mentorRecruitment.setActivityName(rs.getString("activityName"));
                mentorRecruitment.setNumberOfMentor(rs.getInt("numberOfMentor"));
                mentorRecruitment.setStartDate(rs.getString("startDate"));
                mentorRecruitment.setFinishDate(rs.getString("finishDate"));
                mentorRecruitment.setActivityInfo(rs.getString("activityInfo"));
                mentorRecruitment.setPassedNumber(rs.getInt("passedNumber"));

            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return mentorRecruitment;
    }



}
