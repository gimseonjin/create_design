package Midam.DAO.linkAgency;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class LinkAgencyDAO {

    private Connection conn=null;
    private PreparedStatement pstmt;
    SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date now =new Date();
    String sql;
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



    public ArrayList<HashMap> getLinkAgencyList(String id){
        ArrayList<HashMap> list =new ArrayList<HashMap>();
        sql = "SELECT * FROM link_agency where regionCode=?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);  //검색하기위해 입력한 아이디
            rs= pstmt.executeQuery();

            while(rs.next()) {

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("linkAgencyCode",rs.getString("linkAgencyCode"));
                historyHashMap.put("regionCode",rs.getString("regionCode"));
                historyHashMap.put("linkAgencyName",rs.getString("linkAgencyName"));
                historyHashMap.put("link_AgencyAddress",rs.getString("link_AgencyAddress"));
                historyHashMap.put("link_AgencyInfo",rs.getString("link_AgencyInfo"));

                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }

    // 멘토, 지역본부관리자 : mentor.id가 소속되어있는 지역본부에 소속되어있는 연계기관 조회. 연계기관담당자는 테이블이 달라서 안됨.
    public ArrayList<HashMap> readLinkAgencyListMentor(String id){
        ArrayList<HashMap> list =new ArrayList<HashMap>();
        sql = "SELECT region.regionCode, region.regionName, link_agency.linkAgencyCode, link_agency.linkAgencyName FROM mentor JOIN region Join link_agency on mentor.regionCode = region.regionCode AND region.regionCode=link_agency.regionCode WHERE mentor.id=?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);  //검색하기위해 입력한 아이디
            rs= pstmt.executeQuery();

            while(rs.next()) {

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("regionCode",rs.getString("regionCode"));
                historyHashMap.put("regionName",rs.getString("regionName"));
                historyHashMap.put("linkAgencyCode",rs.getString("linkAgencyCode"));
                historyHashMap.put("linkAgencyName",rs.getString("linkAgencyName"));


                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }

    // 지역본부 코드를 통해 소속된 연계기관 목록을 리스트로 반환
    public ArrayList<HashMap> readLinkAgencyList(String regionCode){
        ArrayList<HashMap> list =new ArrayList<HashMap>();
        sql = "SELECT linkAgencyCode, linkAgencyName FROM link_agency WHERE regionCode=?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, regionCode);  //검색하기위해 입력한 아이디
            rs= pstmt.executeQuery();

            while(rs.next()) {

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("linkAgencyCode",rs.getString("linkAgencyCode"));
                historyHashMap.put("linkAgencyName",rs.getString("linkAgencyName"));


                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }
    // 회원가입에서 연계기관 담당자가 신규 연계기관 등록 요청. Name,Address,Info를 등록하고 Code를 추가해 insert 한 후 Code 반환
    public String createLinkAgencyApplication(String regionCode, String linkAgencyName, String linkAgencyAddress, String linkAgencyInfo){
        String result = null;
        String linkAgencyCode=null;
        sql = "SELECT max(linkAgencyCode) FROM link_agency;";
        String sql2 = "INSERT INTO link_agency (linkAgencyCode, regionCode, linkAgencyName, linkAgencyAddress, linkAgencyInfo, status) VALUES (?, ?, ?, ?, ?, 0);";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);//검색하기위해 입력한 아이디
            rs= pstmt.executeQuery();

            while(rs.next()){
                linkAgencyCode=getNextCode(rs.getString(1));
            }

            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1, linkAgencyCode);
            pstmt.setString(2, regionCode);
            pstmt.setString(3, linkAgencyName);
            pstmt.setString(4, linkAgencyAddress);
            pstmt.setString(5, linkAgencyInfo);

            int insertRow = pstmt.executeUpdate();

            if(insertRow >= 1){
                result = linkAgencyCode;
            }

        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
            return result;
    }

    //연계기관 등록 승인
    public HashMap approveLinkAgency(String linkAgencyCode){
        HashMap result = new HashMap();
        sql = "UPDATE link_agency SET status = 1 WHERE (linkAgencyCode = ?);";

        try {
            conn=getConnection();
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,linkAgencyCode);
            int resultRows = pstmt.executeUpdate();
            if(resultRows>0){
                result.put("resultMsg","성공");
            }else{
                result.put("resultMsg","실패");
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
        closeConnection(conn);
        }

        return result;
    }

// 다음 코드 반환
    public String getNextCode(String code){

        String nextCode;
        String character=code.substring(0,2);
        String stringNumber=code.substring(2,6);


        int intNumber = Integer.parseInt(stringNumber);

        String nextNumber=String.format("%04d", intNumber+1);
        nextCode= character.concat(nextNumber);

        return nextCode;

    }


}
