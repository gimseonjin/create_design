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
            ResultSet rs= pstmt.executeQuery();

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
            ResultSet rs= pstmt.executeQuery();

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
            ResultSet rs= pstmt.executeQuery();

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
    public String createLinkAgencyApplication(String linkAgencyName, String linkAgencyAddress, String linkAgencyInfo){

    }
}
