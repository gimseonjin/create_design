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
}
