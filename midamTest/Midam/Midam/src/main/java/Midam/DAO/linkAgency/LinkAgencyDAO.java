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

            if(rs.next()){
                linkAgencyCode=getNextCode(rs.getString(1));
            }else{
                linkAgencyCode="LC0000";
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
    public int approveLinkAgency(String linkAgencyCode){
        int result = 0;
        sql = "UPDATE link_agency SET status = 1 WHERE (linkAgencyCode = ?);";

        try {
            conn=getConnection();
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,linkAgencyCode);
            result = pstmt.executeUpdate();


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
        closeConnection(conn);
        }

        return result;
    }

    //회원가입 거절 -> DB에서 삭제
    public int deleteLinkAgencyApplication(String linkAgencyCode){
       int result = 0;
        sql = "DELETE FROM link_agency WHERE (linkAgencyCode = ?);";
        try {
            conn=getConnection();
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,linkAgencyCode);
            result = pstmt.executeUpdate();


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;

    }


    //지역본부 관리자가 소속 연계기관담당자 조회시 지역본부 리스트 조회 -> option 선택용
    public ArrayList readLinkAgencyListRegionManager(String id){
        ArrayList result = new ArrayList();
        sql="SELECT linkAgencyCode, linkAgencyName FROM mentor JOIN link_agency ON mentor.regionCode=link_agency.regionCode where mentor.id=? AND link_agency.status=1;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap linkAgency = new HashMap();
                linkAgency.put("linkAgencyCode",rs.getString("linkAgencyCode"));
                linkAgency.put("linkAgencyName",rs.getString("linkAgencyName"));
                result.add(linkAgency);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;
    }

    //지역본부 관리자가 소속 연계기관담당자 조회시 지역본부 리스트 조회 -> 전체 정보 조회
    public ArrayList readLinkAgencyInfoListRegionManager(String id){
        ArrayList result = new ArrayList();
        sql="SELECT linkAgencyCode, linkAgencyName, linkAgencyAddress, linkAgencyInfo FROM mentor JOIN link_agency ON mentor.regionCode=link_agency.regionCode where mentor.id=? AND link_agency.status=1;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            rs = pstmt.executeQuery();

            while(rs.next()){
                HashMap linkAgency = new HashMap();
                linkAgency.put("linkAgencyCode",rs.getString("linkAgencyCode"));
                linkAgency.put("linkAgencyName",rs.getString("linkAgencyName"));
                linkAgency.put("linkAgencyAddress", rs.getString("linkAgencyAddress"));
                linkAgency.put("linkAgencyInfo", rs.getString("linkAgencyInfo"));
                result.add(linkAgency);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;
    }

    //연계기관 삭제 -> DB에서  status -1로 비활성화.
    public int[] deleteLinkAgency(String linkAgencyCode){
        int[] result = {0, 0};
        sql = "UPDATE link_agency SET status = -1 WHERE linkAgencyCode = ?;";
        String sql2 = "UPDATE user JOIN link_agency_manager ON user.id=link_agency_manager.id SET authority=-3 WHERE link_agency_manager.linkAgencyCode=?;";
        try {
            conn=getConnection();
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,linkAgencyCode);
            result[0] = pstmt.executeUpdate();

            pstmt=conn.prepareStatement(sql2);
            pstmt.setString(1,linkAgencyCode);
            result[1] = pstmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();

        } finally {
            closeConnection(conn);
        }

        return result;
    }

    //연계기관 수정 -> 이름, 주소, 정보 수정
    public int updateLinkAgency(String linkAgencyCode, String linkAgencyName, String linkAgencyAddress, String linkAgencyInfo){
        int result = 0;
        sql = "UPDATE link_agency SET linkAgencyName=?, linkAgencyAddress=?, linkAgencyInfo=? WHERE linkAgencyCode = ?;";

        try {
            conn=getConnection();
            pstmt=conn.prepareStatement(sql);
            pstmt.setString(1,linkAgencyName);
            pstmt.setString(2,linkAgencyAddress);
            pstmt.setString(3,linkAgencyInfo);
            pstmt.setString(4,linkAgencyCode);
            result = pstmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }

        return result;
    }

    // "XX0000" 형식에서 다음 코드 반환
    public String getNextCode(String code){

        String nextCode;
        String character=code.substring(0,2);
        String stringNumber=code.substring(2,6);


        int intNumber = Integer.parseInt(stringNumber);

        String nextNumber=String.format("%04d", intNumber+1);
        nextCode= character.concat(nextNumber);

        return nextCode;

    }

    //연계기관 신규 등록
    public int createLinkAgency(String regionManagerId, String linkAgencyName, String linkAgencyAddress, String linkAgencyInfo){
        int result=0;
        sql = "SELECT max(linkAgencyCode) FROM link_agency;";
        String sql2 = "INSERT INTO link_agency(linkAgencyCode, linkAgencyName, linkAgencyAddress, linkAgencyInfo, status, regionCode) VALUES(?, ?, ?, ?,1,(SELECT regionCode from mentor WHERE id=?))";
        String linkAgencyCode="";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);//검색하기위해 입력한 아이디
            rs= pstmt.executeQuery();

            if(rs.next()){
                linkAgencyCode=getNextCode(rs.getString(1));
            }else{
                linkAgencyCode="LC0000";
            }

            pstmt = conn.prepareStatement(sql2);

            pstmt.setString(1,linkAgencyCode);
            pstmt.setString(2,linkAgencyName);
            pstmt.setString(3,linkAgencyAddress);
            pstmt.setString(4,linkAgencyInfo);
            pstmt.setString(5,regionManagerId);
            result= pstmt.executeUpdate();
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return result;
    }
}
