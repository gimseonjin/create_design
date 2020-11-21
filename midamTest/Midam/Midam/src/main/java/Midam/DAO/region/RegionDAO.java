package Midam.DAO.region;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class RegionDAO {


    private Connection conn=null;
    private PreparedStatement pstmt;

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


    //지역본부 목록을 List로 반환
    public ArrayList<HashMap> readRegionList(){
        ArrayList<HashMap> list =new ArrayList<HashMap>();
        String sql = "select * from region WHERE status=1";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            ResultSet rs= pstmt.executeQuery();

            while(rs.next()) {

                HashMap regionHashMap = new HashMap();
                regionHashMap.put("regionCode",rs.getString("regionCode"));
                regionHashMap.put("regionName",rs.getString("regionName"));
                regionHashMap.put("regionAddress",rs.getString("regionAddress"));

                list.add(regionHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }

    //지역본부 정보 수정
    public int updateRegion(String regionCode, String regionName, String regionAddress){
        int result=0;
        sql = "UPDATE region SET regionName=?, regionAddress=? WHERE regionCode=?";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,regionName);
            pstmt.setString(2,regionAddress);
            pstmt.setString(3,regionCode);
            result= pstmt.executeUpdate();
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return result;
    }
    //지역본부 비활성화, 소속된 멘토/관리자도 비활성화
    public int[] deleteRegion(String regionCode){
        int[] result={0,0,0};
        sql = "UPDATE region SET status=-1 WHERE regionCode=?";
        String sql2 = "UPDATE user JOIN mentor ON user.id=mentor.id  SET user.authority=? WHERE mentor.regionCode=? AND user.authority=?;";

        try {
            conn = getConnection();

            conn.setAutoCommit(false); //자동 커밋을 하지않도록, 이 함수와 동시에 begin(); 시작됨.

            Savepoint savepoint1 = conn.setSavepoint("before_delete_region");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, regionCode);
            result[0] = pstmt.executeUpdate();

            pstmt = conn.prepareStatement(sql2);
            pstmt.setInt(1,-1);
            pstmt.setString(2, regionCode);
            pstmt.setInt(3,1);
            result[1] = pstmt.executeUpdate();

            pstmt.setInt(1,-2);
            pstmt.setString(2, regionCode);
            pstmt.setInt(3,2);
            result[2] = pstmt.executeUpdate();

            conn.commit();

        }catch(SQLException se){
            se.printStackTrace();
            System.out.println("지역본부/ 소속인원 삭제 실패. 롤백");
            try{
                if(conn!=null){
                    conn.rollback();
                }
            } catch (SQLException seRollback) {
                seRollback.printStackTrace();
  
        return result;
    }

    public ArrayList<HashMap> readChangeRegionList(String id){
        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql_region = "select regionCode from mentor where id =? ";
        String sql = "select * from region WHERE status=1 and regionCode != ?";

        try {
            conn=getConnection();

            pstmt = conn.prepareStatement(sql_region);
            pstmt.setString(1,id);
            ResultSet rs= pstmt.executeQuery();
            rs.next();
            String regionCode =rs.getString(1);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,regionCode);
            rs= pstmt.executeQuery();

            while(rs.next()) {

                HashMap regionHashMap = new HashMap();
                regionHashMap.put("regionCode",rs.getString("regionCode"));
                regionHashMap.put("regionName",rs.getString("regionName"));
                regionHashMap.put("regionAddress",rs.getString("regionAddress"));

                list.add(regionHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }
    
    
}