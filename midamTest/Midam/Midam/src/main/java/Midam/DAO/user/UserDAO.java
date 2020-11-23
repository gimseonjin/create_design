package Midam.DAO.user;

import Midam.model.community.Message;
import Midam.model.linkAgency.LinkAgency;
import Midam.model.user.LinkAgencyManager;
import Midam.model.user.Mentor;
import Midam.model.user.RegionChangeApplication;
import Midam.model.user.User;

import java.sql.*;
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
            sql = "SELECT * FROM user JOIN mentor ON user.id=mentor.id Join region on mentor.regionCode=region.regionCode WHERE user.id=?;";
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

    //회원정보수정.
    public int updateUserInfo(String id, String name, int age, String phoneNumber,String address, String volunteerId ){
        int result=0;
        try {
            getConnection();
            sql = "UPDATE user JOIN mentor on user.id=mentor.id SET user.name = ?, user.age = ?, user.address = ?, user.phoneNumber = ?, mentor.1365Id=? WHERE user.id = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,name);
            pstmt.setInt(2,age);
            pstmt.setString(3,address);
            pstmt.setString(4,phoneNumber);
            pstmt.setString(5,volunteerId);
            pstmt.setString(6,id);

            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return result;
    }
    public LinkAgencyManager getUserInfoManager(String id){
        try {
            getConnection();
            sql = "SELECT * FROM user " +
                    "JOIN link_agency_manager ON user.id=link_agency_manager.id " +
                    "Join link_agency on link_agency_manager.linkAgencyCode=link_agency.linkAgencyCode" +
                    " WHERE user.id=?;";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs = pstmt.executeQuery();
            LinkAgencyManager linkAgencyManager = new LinkAgencyManager();
            if(rs.next()){

                linkAgencyManager.setId(rs.getString("id"));
                linkAgencyManager.setName(rs.getString("name"));
                linkAgencyManager.setGender(rs.getString("gender"));
                linkAgencyManager.setAge(rs.getInt("age"));
                linkAgencyManager.setAddress(rs.getString("address"));
                linkAgencyManager.setPhoneNumber(rs.getString("phoneNumber"));
                linkAgencyManager.setAuthority(rs.getInt("authority"));
                linkAgencyManager.setLinkAgencyCode(rs.getString("linkAgencyName"));




                return linkAgencyManager;
            }
            else
                return null;
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }
    public int updateUserInfoManager(String id, String name, int age, String phoneNumber,String address ){
        int result=0;
        try {
            getConnection();
            sql = "UPDATE user JOIN link_agency_manager on user.id=link_agency_manager.id SET user.name = ?, user.age = ?, user.address = ?, user.phoneNumber = ? WHERE user.id = ?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,name);
            pstmt.setInt(2,age);
            pstmt.setString(3,address);
            pstmt.setString(4,phoneNumber);
            pstmt.setString(5,id);

            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return result;
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
    public ArrayList readMentorApplicantList(String id){
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
    public ArrayList readLinkAgencyApplicantList(String id){
        ArrayList result = new ArrayList();
        sql = "SELECT * FROM user Join link_agency_manager Join link_agency ON user.id=link_agency_manager.id \n" +
                "AND link_agency_manager.linkAgencyCode=link_agency.linkAgencyCode WHERE user.authority=6 AND link_agency.regionCode=(SELECT regionCode FROM mentor WHERE id=?);";
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
                applicant.put("linkAgencyName", rs.getString("linkAgencyName"));
                applicant.put("linkAgencyStatus", rs.getInt("status"));
                result.add(applicant);
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    // 연계기관 담당자 회원가입 신청자의 상세 조회
    public HashMap readLinkAgencyApplicantInfo(String id){
        HashMap result = new HashMap();
        sql = "SELECT * FROM user Join link_agency_manager Join link_agency ON user.id=link_agency_manager.id \n" +
                "AND link_agency_manager.linkAgencyCode=link_agency.linkAgencyCode WHERE user.id=?;";
        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql);  //회원테이블 회원가입
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                result.put("id", rs.getString("id"));
                result.put("name", rs.getString("name"));
                result.put("gender",rs.getString("gender"));
                result.put("age",rs.getInt("age"));
                result.put("address",rs.getString("address"));
                result.put("phoneNumber",rs.getString("phoneNumber"));
                result.put("linkAgencyName", rs.getString("linkAgencyName"));
                result.put("linkAgencyStatus", rs.getInt("status"));
                result.put("linkAgencyCode", rs.getString("linkAgencyCode"));
                result.put("linkAgencyAddress", rs.getString("linkAgencyAddress"));
            }
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
    // 연계기관 담당자 회원가입 신청자 승인
    public int approveLinkAgencyApplicant(String applicantId){
        int result = 0;
        sql = "UPDATE user SET authority = 3 WHERE (id = ?);";
        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql);  //회원테이블 회원가입
            pstmt.setString(1, applicantId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    // 연계기관 담당자 회원가입 신청자 승인
    public int[] deleteLinkAgencyManagerApplicant(String applicantId){
        int result[] = {0};
        sql = "DELETE FROM link_agency_manager WHERE (id = ?);";
        String sql2 = "DELETE FROM user WHERE id=?";
        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql);  //회원테이블 회원가입
            pstmt.setString(1, applicantId);
            result[0] = pstmt.executeUpdate();


            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1,applicantId);
            result[1] = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    //SELECT * FROM user JOIN mentor ON user.id=mentor.id WHERE mentor.regionCode=?;
        //액터: 시스템 관리자, 해당 지역본부의 멘토와 관리자를 조회
    public ArrayList readMentorAndRegionManagerList(String regionCode){
        ArrayList result = new ArrayList();
        ArrayList listMentor = new ArrayList();
        ArrayList listRegionManager = new ArrayList();

        sql = "SELECT * FROM user JOIN mentor ON user.id=mentor.id WHERE mentor.regionCode=? AND user.authority=1;";
        String sql2 = "SELECT * FROM user JOIN mentor ON user.id=mentor.id WHERE mentor.regionCode=? AND user.authority=2;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, regionCode);
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
                applicant.put("authority", rs.getString("authority"));
                listMentor.add(applicant);
            }

            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1, regionCode);
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
                applicant.put("authority", rs.getInt("authority"));
                listRegionManager.add(applicant);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        result.add(listMentor);
        result.add(listRegionManager);

        return result;
    }

    //멘토와 지역본부 관리자 사이에 권한 변경. 멘토->관리자/ 관리자->멘토
    public int changeMentorAuthority(String userId, int userAuthority){
        int result = 0;
        sql = "UPDATE user SET authority = ? WHERE (id = ?);";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            if(userAuthority==1) {
                pstmt.setInt(1, 2);
            }else if(userAuthority==2){
                pstmt.setInt(1,1);
            }
            pstmt.setString(2, userId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;

    }

    // 지역본부 관리자가 소속 연계기관 담당자 조회 : default, 모든 연계기관 조회
    public ArrayList readLinkAgencyManagerList(String id){
        ArrayList result = new ArrayList();

        sql = "SELECT user.id, user.name, user.age, user.gender, user.address, user.phoneNumber, link_agency.linkAgencyName FROM mentor JOIN link_agency JOIN link_agency_manager JOIN user ON mentor.regionCode=link_agency.regionCode AND link_agency.linkAgencyCode=link_agency_manager.linkAgencyCode AND link_agency_manager.id=user.id WHERE mentor.id = ? AND user.authority =3 AND link_agency.status=1;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap linkAgencyManager = new HashMap();
                linkAgencyManager.put("id", rs.getString("id"));
                linkAgencyManager.put("name", rs.getString("name"));
                linkAgencyManager.put("age",rs.getInt("age"));
                linkAgencyManager.put("gender",rs.getString("gender"));
                linkAgencyManager.put("address",rs.getString("address"));
                linkAgencyManager.put("phoneNumber",rs.getString("phoneNumber"));
                linkAgencyManager.put("linkAgencyName", rs.getString("linkAgencyName"));
                result.add(linkAgencyManager);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;
    }

    public User searchId(String name){
        User user = new User();

        String sql = "SELECT id FROM user WHERE name = ? ";


        try {
            conn=getConnection();


            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, name);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()){
                user.setId(rs.getString("id"));

            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return user;
    }
    public int applyChangeRegion(String regionCode, String id,String changeReason) { // 등록
        int result =0;

        String sql = "insert into region_change_application"+
                " (regionCode, mentorId, changeReason) values(?,?,?)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, regionCode);
            pstmt.setString(2, id);
            pstmt.setString(3, changeReason);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }


    // 지역본부 관리자가 소속 연계기관 담당자 조회 : linkAgencyCode 받아서 해당하는 연계기관의 담당자 조회
    public ArrayList readLinkAgencyManagerListWithOption(String id, String linkAgencyCode){
        ArrayList result = new ArrayList();

        sql = "SELECT user.id, user.name, user.age, user.gender, user.address, user.phoneNumber, link_agency.linkAgencyName FROM mentor JOIN link_agency JOIN link_agency_manager JOIN user ON mentor.regionCode=link_agency.regionCode AND link_agency.linkAgencyCode=link_agency_manager.linkAgencyCode AND link_agency_manager.id=user.id WHERE mentor.id = ? AND link_agency.linkAgencyCode=? AND user.authority =3 AND link_agency.status=1;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2,linkAgencyCode);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap linkAgencyManager = new HashMap();
                linkAgencyManager.put("id", rs.getString("id"));
                linkAgencyManager.put("name", rs.getString("name"));
                linkAgencyManager.put("age",rs.getInt("age"));
                linkAgencyManager.put("gender",rs.getString("gender"));
                linkAgencyManager.put("address",rs.getString("address"));
                linkAgencyManager.put("phoneNumber",rs.getString("phoneNumber"));
                linkAgencyManager.put("linkAgencyName", rs.getString("linkAgencyName"));
                result.add(linkAgencyManager);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    // 지역본부 관리자가 소속 멘토 조회
    public ArrayList readMentorList(String id){
        ArrayList result = new ArrayList();

        sql = "SELECT user.id, user.name, user.gender, user.age, user.address, user.phoneNumber, mentor.1365Id FROM mentor JOIN user ON mentor.id=user.id where mentor.regionCode=(SELECT regionCode from mentor where id=?) AND user.authority = 1;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap mentor = new HashMap();
                mentor.put("id", rs.getString("id"));
                mentor.put("name", rs.getString("name"));
                mentor.put("age",rs.getInt("age"));
                mentor.put("gender",rs.getString("gender"));
                mentor.put("address",rs.getString("address"));
                mentor.put("phoneNumber",rs.getString("phoneNumber"));
                mentor.put("volunteerId", rs.getString("1365Id"));
                result.add(mentor);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;
    }


    //연계기관 담당자 삭제. 권한 3 -> -3(연계기관 담당자,비활성화)
    public int deleteLinkAgencyManager(String linkAgencyManagerId){
        int result=0;

        sql = "UPDATE user SET authority = -3 WHERE id = ?;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, linkAgencyManagerId);
            result = pstmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    //멘토 삭제. 권한 1->-1 (멘토 비활성화)
    public int deleteMentor(String mentorId){
        int result=0;

        sql = "UPDATE user SET authority = -1 WHERE id = ?;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, mentorId);
            result = pstmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public ArrayList readChangeRegionApplication(String id){
        ArrayList result = new ArrayList();
        sql="select * from region_change_application" +
                " join user join region" +
                " on region_change_application.mentorId = user.id " +
                "and region_change_application.regionCode  = region.regionCode" +
                " where region_change_application.regionCode = (SELECT regionCode from mentor where id = ?);";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap mentor = new HashMap();
                mentor.put("id", rs.getString("id"));
                mentor.put("name", rs.getString("name"));
                mentor.put("age",rs.getInt("age"));
                mentor.put("gender",rs.getString("gender"));
                mentor.put("address",rs.getString("address"));
                mentor.put("regionCode",rs.getString("regionCode"));
                mentor.put("changeReason",rs.getString("changeReason"));

                result.add(mentor);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;
    }

    public int approvalPass(String id, String regionCode) {
        int result =0;


        String sql = "update mentor set regionCode =? where id =?";
        String sql_delete ="delete from region_change_application where mentorId=? and regionCode =?";

        try {

            conn=getConnection();

                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, regionCode);
                pstmt.setString(2, id);
                pstmt.executeUpdate();

                pstmt = conn.prepareStatement(sql_delete);
                pstmt.setString(1, id);
                pstmt.setString(2, regionCode);
                pstmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
    public int approvalFail(String id, String regionCode) {
        int result =0;

        String sql_delete ="delete from region_change_application where mentorId=? and regionCode =?";
        try {

            conn=getConnection();

            pstmt = conn.prepareStatement(sql_delete);
            pstmt.setString(1, id);
            pstmt.setString(2, regionCode);
            pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public int approveMentorApplicant(String id){
        int result = 0;
        sql = "UPDATE user SET authority=1 WHERE id=?";
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            result = pstmt.executeUpdate();
        }catch (SQLException se){
            se.printStackTrace();
        }finally {
            closeConnection(conn);
        }

        return result;
    }

    public int[] rejectMentorApplicant(String id){
        int[] result = {0,0};
        sql = "DELETE FROM mentor WHERE id = ?";
        String sql2 = "DELETE FROM user WHERE id = ?";
        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            Savepoint savepoint1 = conn.setSavepoint("before_delete_mentor");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            result[0] = pstmt.executeUpdate();

            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1,id);
            result[1] = pstmt.executeUpdate();

            conn.commit();
        }catch (SQLException se){
            se.printStackTrace();
            System.out.println("회원가입 신청 멘토 삭제 실패. 롤백");
            try {
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException seRollback) {
                seRollback.printStackTrace();
            }

        }finally {
            closeConnection(conn);
        }

        return result;
    }

    //연계기관 문의 시 지역본부 관리자 목록 조회
    public ArrayList readRegionManager(String regionCode){
        ArrayList result = new ArrayList();
        sql = "SELECT user.id, user.name FROM mentor JOIN user ON mentor.id=user.id WHERE mentor.regionCode=? AND user.authority=2;";
        try {
            conn = getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,regionCode);
            rs=pstmt.executeQuery();
            while(rs.next()){
                HashMap regionManager = new HashMap();
                regionManager.put("id",rs.getString("id"));
                regionManager.put("name",rs.getString("name"));
                result.add(regionManager);
            }
        }catch (SQLException se){
            se.printStackTrace();
        }finally {
            closeConnection(conn);
        }

        return result;
    }
}