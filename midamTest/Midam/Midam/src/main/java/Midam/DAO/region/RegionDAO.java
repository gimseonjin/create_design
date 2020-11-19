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
        sql = "select regionCode, regionName, regionAddress from region WHERE status=1";
        //status 가 1이면 정상. -1이면 비활성화상태.
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
    
    
}