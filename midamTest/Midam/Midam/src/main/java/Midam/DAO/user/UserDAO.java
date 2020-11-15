package Midam.DAO.user;

import Midam.model.linkAgency.LinkAgency;
import Midam.model.user.Mentor;
import Midam.model.user.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

public class UserDAO {

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
//    로그인기능, id로 조회하여 password, 권한 일치여부 검사 후 권한반환
    public int login(String id, String password, int reqAuthority) {
        try {
            getConnection();
            sql = "select password, authority from user where id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs = pstmt.executeQuery();
            if(rs.next()) {
                //rs.next()로 rs 조회 결과가 있는지 판단. 없을시 else로
                if(rs.getInt(2)!=reqAuthority){ 
                    //원하는 로그인 권한과 일치하는지 검사
                    return -1;
                }
                else if (rs.getString(1).equals(password)) {
                    //비밀번호 일치여부 검사 후 권한을 반환
                    return rs.getInt(2);
                } else if (!rs.getString(1).equals(password)) {
                    //비밀번호 불일치시
                    return -1;
                } 
            }else {// rs가 null일때
                return -2;
            }
            
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
       return -3;
    }

    //회원정보조회. 사용자 권한에 따라 세부적인 부분 필요.
    public Mentor getUserInfo(String id){
        try {
            getConnection();
            System.out.println(id);
            sql = "SELECT * FROM mydb.user JOIN mentor ON user.id=mentor.id Join region on mentor.regionCode=region.regionCode WHERE user.id=?;";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs = pstmt.executeQuery();
            Mentor mentor;
            if(rs.next()){
                mentor = new Mentor(rs.getString(1), rs.getString(2),rs.getString(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8), rs.getString(13), rs.getString(11));
                return mentor;
            }
            else
                return null;



        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }
    
    //회원가입
    public int createMentor(String id, String password, String name, String gender, int age, String address, String phoneNumber, String regionCode, String volunteerId) { // 등록
        int result =0;
        sql = "insert into user (id, password, name, gender, age, address, phoneNumber, authority) values(?, ?, ?, ?, ?, ?, ?, ?)";
        String sql2 = "insert into mentor (id, regionCode, 1365Id) values(?, ?, ?)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, password);
            pstmt.setString(3, name);
            pstmt.setString(4, gender);
            pstmt.setInt(5, age);
            pstmt.setString(6, address);
            pstmt.setString(7, phoneNumber);
            pstmt.setInt(8, 5); // 멘토: 1 ,지역본부관리자: 2, 연계기관 담당자: 3, 시스템 관리자: 4, 멘토 가입 신청: 5, 연계기관 가입신청: 6

            pstmt.executeUpdate();

            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1, id);
            pstmt.setString(2, regionCode);
            pstmt.setString(3, volunteerId);

            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
    public int createLinkAgencyManager(String id, String password, String name, String gender, int age, String address, String phoneNumber, String linkAgencyCode) { // 등록
        int result =0;
        sql = "insert into user (id, password, name, gender, age, address, phoneNumber, authority) values(?, ?, ?, ?, ?, ?, ?, ?)";
        String sql2 = "insert into link_agency_manager (id, linkAgencyCode) values(?, ?)";

        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql);  //회원테이블 회원가입
            pstmt.setString(1, id);
            pstmt.setString(2, password);
            pstmt.setString(3, name);
            pstmt.setString(4, gender);
            pstmt.setInt(5, age);
            pstmt.setString(6, address);
            pstmt.setString(7, phoneNumber);
            pstmt.setInt(8, 6);

            pstmt.executeUpdate();

            pstmt = conn.prepareStatement(sql2); //담당자 테이블 회원가입
            pstmt.setString(1, id);
            pstmt.setString(2, linkAgencyCode);

            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    //지역본부 관리자가 자신이 소속된 지역본부에 신청한 멘토 회원가입 신청자들을 조회함.
    public ArrayList readMentorApplicant(String id){
        ArrayList result = new ArrayList();
        sql = "SELECT user.id, name, gender, age, address, phoneNumber, mentor.1365Id FROM user JOIN mentor ON user.id=mentor.id WHERE user.authority=5 AND mentor.regionCode=(SELECT regionCode FROM mentor WHERE id=?);";
        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql);  //회원테이블 회원가입
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap applicant = new HashMap();
                applicant.put("id", rs.getString("id"));
                applicant.put("name", rs.getString("name"));
                applicant.put("gender",rs.getString("gender"));
                applicant.put("age",rs.getInt("age"));
                applicant.put("address",rs.getString("address"));
                applicant.put("phoneNumber",rs.getString("phoneNumber"));
                applicant.put("volunteerId", rs.getString("1365Id"));
                result.add(applicant);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
    //지역본부 관리자가 자신이 소속된 지역본부에 신청한 연계기관 담당자 회원가입 신청자들을 조회함.
    public ArrayList readLinkAgencyApplicant(String id){
        ArrayList result = new ArrayList();
        sql = "SELECT user.id, name, gender, age, address, phoneNumber FROM user JOIN mentor ON user.id=mentor.id WHERE user.authority=5 AND mentor.regionCode=(SELECT regionCode FROM mentor WHERE id=?);";
        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql);  //회원테이블 회원가입
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap applicant = new HashMap();
                applicant.put("id", rs.getString("id"));
                applicant.put("name", rs.getString("name"));
                applicant.put("gender",rs.getString("gender"));
                applicant.put("age",rs.getInt("age"));
                applicant.put("address",rs.getString("address"));
                applicant.put("phoneNumber",rs.getString("phoneNumber"));
                result.add(applicant);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
}