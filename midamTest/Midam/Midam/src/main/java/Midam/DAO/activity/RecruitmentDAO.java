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
            ResultSet rs= pstmt.executeQuery();
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
    } //게시글 작성


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

    public Post readRecruitmentInfo(int postId){
        Post post = new Post();
        String sql = "SELECT postId, writerId, title, content, writeDate FROM post WHERE postId = ? ;";
        String sql_view = "update post set numberOfView =numberOfView+1 where postId=?";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, postId);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()){
                post.setPostId(rs.getInt("postId"));
                post.setWriterId(rs.getString("writerId"));
                post.setTitle(rs.getString("title"));
                post.setContent(rs.getString("content"));
                post.setWriteDate(rs.getString("writeDate"));
            }
            pstmt=conn.prepareStatement(sql_view);
            pstmt.setInt(1,postId);
            pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return post;
    }
}
