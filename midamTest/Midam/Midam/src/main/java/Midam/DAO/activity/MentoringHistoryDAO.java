package Midam.DAO.activity;

import Midam.model.activity.ActivityHistory;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;


public class MentoringHistoryDAO {

    //CREATE UPDATE DELETE READ GETList

    private Connection conn=null;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;



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

    public boolean create(ActivityHistory activityHistory) { // 등록
        sql = "insert into activity_history(activityHistoryCode, MentorRecruitmentCode," +
                "linkAgencyManagerId, regionManagerId,mentorId,startTime)"
                + " values(?, ?, ?, ?, ?, ?)";
        try {
            conn= getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, activityHistory.getActivityHistoryCode());
            pstmt.setString(2, activityHistory.getMentorRecruitmentCode());
            pstmt.setString(3, activityHistory.getLinkAgencyManagerId());
            pstmt.setString(4, activityHistory.getRegionManagerId());
            pstmt.setString(5, activityHistory.getMentorId());
            pstmt.setString(6, activityHistory.getStartTime());

            int r = pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return false;
    }           //출석
    public boolean update(ActivityHistory activityHistory) {
        sql = "UPDATE activity_history SET startTime= ?,endTime=?,activityContent=?,note=?,activityPicture=? where (mentorId=?)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, activityHistory.getStartTime());
            pstmt.setString(2, activityHistory.getEndTime());

            pstmt.setString(3, activityHistory.getActivityContent());
            pstmt.setString(4, activityHistory.getNote());
            pstmt.setBytes(5, activityHistory.getActivityPicture());

            int r = pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return false;
    }           //활동내역수정(보고서+수기등록)

    public ActivityHistory read(int activityHistoryCode){

        ActivityHistory activityHistory = null;
        sql = "SELECT * FROM activity_history where activityHistoryCode=?";

        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, activityHistoryCode);  //검색하기위해 입력한 아이디
            ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {
                
                activityHistory =new ActivityHistory();
                activityHistory.setActivityHistoryCode(rs.getInt("activityHistoryCode"));
                activityHistory.setMentorRecruitmentCode(rs.getString("MentorRecruitmentCode"));
                activityHistory.setLinkAgencyManagerId(rs.getString("linkAgencyManagerId"));
                activityHistory.setRegionManagerId(rs.getString("regionManagerId"));
                activityHistory.setMentorId(rs.getString("mentorId"));
                activityHistory.setStartTime(rs.getString("startTime"));

                activityHistory.setEndTime(rs.getString("endTime"));

                activityHistory.setActivityContent(rs.getString("activityContent"));
                activityHistory.setNote(rs.getString("note"));
                activityHistory.setActivityPicture(rs.getBytes("activityPicture"));
                activityHistory.setCreateDate(rs.getString("createDate"));
                activityHistory.setApprovalDate(rs.getString("approvalDate"));
                activityHistory.setApprovalStatus(rs.getInt("approvalStatus"));
                activityHistory.setRejectionReason(rs.getString("rejectionReason"));

            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return activityHistory;
    }      //활동내역 상세조회


//    지훈.11.01 추가 - 멘토가 자신의 id를 통해 자기 활동 내역만 조회
    public ArrayList<HashMap> getHistoryListMentor(String id, int option, String linkAgency, String activity, String startDate, String endDate){

        ArrayList<HashMap> list =new ArrayList<HashMap>();
        try {
            conn=getConnection();
            if(option==0){ //아무것도 안할때, 옵션 0
                sql = "SELECT * FROM activity_history where mentorId=? AND startTime >= ? AND startTime <= ?";
                pstmt = conn.prepareStatement(sql);

            }else if(option == 1){ //연계기관만 선택
                sql = "SELECT activityHistoryCode, startTime, endTime, approvalStatus, createDate FROM activity_history JOIN mentor_recruitment On activity_history.mentorRecruitmentCode=mentor_recruitment.mentorRecruitmentCode Where activity_history.mentorId= ? AND activity_history.startTime>= ? AND activity_history.startTime <= ? AND mentor_recruitment.linkAgencyCode=?;";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(4, linkAgency);
            }else if(option == 2){ // 연계기관 + 활동 선택
                sql = "SELECT activityHistoryCode, startTime, endTime, approvalStatus, createDate FROM activity_history JOIN mentor_recruitment On activity_history.mentorRecruitmentCode=mentor_recruitment.mentorRecruitmentCode Where activity_history.mentorId= ? AND activity_history.startTime>= ? AND activity_history.startTime <= ? AND mentor_recruitment.linkAgencyCode=?  AND activity_history.mentorRecruitmentCode=?;";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(4, linkAgency);
                pstmt.setString(5, activity);
            }
            pstmt.setString(1, id);  //검색하기위해 입력한 아이디
            pstmt.setString(2, startDate);
            pstmt.setString(3, endDate);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()) {
                ActivityHistory activityHistory =new ActivityHistory();

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("activityHistoryCode",rs.getInt("activityHistoryCode"));
                historyHashMap.put("startTime", rs.getString("startTime"));
                historyHashMap.put("endTime", rs.getString("endTime"));
                historyHashMap.put("date",rs.getString("createDate"));
                historyHashMap.put("status",rs.getString("approvalStatus"));

                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {


            closeConnection(conn);
        }
        return list;
    }      //전체 활동내역 목록 for 멘토

    public ArrayList<HashMap> getHistoryListRegionManager(String id, int option, String linkAgency, String activity, String startDate, String endDate){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        try {
            conn=getConnection();
            if(option==0){ //아무것도 안할때, 옵션 0
                sql = "SELECT activityHistoryCode, startTime, endTime, approvalStatus, createDate, name FROM activity_history Join mentor Join link_agency Join mentor_recruitment JOIN user ON mentor.regionCode=link_agency.regionCode AND link_agency.linkAgencyCode = mentor_recruitment.linkAgencyCode AND mentor_recruitment.mentorRecruitmentCode = activity_history.mentorRecruitmentCode AND user.id=mentor.id Where mentor.id=? AND startTime >= ? AND startTime <= ?; ";
                pstmt = conn.prepareStatement(sql);
            }else if(option == 1){ //연계기관만 선택
                sql = "SELECT activityHistoryCode, startTime, endTime, approvalStatus, createDate, name FROM activity_history Join mentor Join link_agency Join mentor_recruitment JOIN user ON mentor.regionCode=link_agency.regionCode AND link_agency.linkAgencyCode = mentor_recruitment.linkAgencyCode AND mentor_recruitment.mentorRecruitmentCode = activity_history.mentorRecruitmentCode AND user.id=mentor.id Where mentor.id=? AND startTime >= ? AND startTime <= ? AND mentor_recruitment.linkAgencyCode=?;";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(4, linkAgency);
            }else if(option == 2){ // 연계기관 + 활동 선택
                sql = "SELECT activityHistoryCode, startTime, endTime, approvalStatus, createDate, name FROM activity_history Join mentor Join link_agency Join mentor_recruitment JOIN user ON mentor.regionCode=link_agency.regionCode AND link_agency.linkAgencyCode = mentor_recruitment.linkAgencyCode AND mentor_recruitment.mentorRecruitmentCode = activity_history.mentorRecruitmentCode AND user.id=mentor.id Where mentor.id=? AND startTime >= ? AND startTime <= ? AND mentor_recruitment.linkAgencyCode=?  AND activity_history.mentorRecruitmentCode=?;";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(4, linkAgency);
                pstmt.setString(5, activity);
            }
            pstmt.setString(1, id);  //검색하기위해 입력한 아이디
            pstmt.setString(2, startDate);
            pstmt.setString(3, endDate);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()) {
                ActivityHistory activityHistory =new ActivityHistory();

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("activityHistoryCode",rs.getInt("activityHistoryCode"));
                historyHashMap.put("startTime", rs.getString("startTime"));
                historyHashMap.put("endTime", rs.getString("endTime"));
                historyHashMap.put("date",rs.getString("createDate"));
                historyHashMap.put("status",rs.getString("approvalStatus"));
                historyHashMap.put("mentorName",rs.getString("name"));
                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {


            closeConnection(conn);
        }return list;

    }      //전체 활동내역 목록 for 지역본부 관리자
    public ArrayList<HashMap> readActivityHistoryInfo(int activityHistoryCode){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        try {
            conn=getConnection();

            sql = "SELECT name, activityName, startTime, endTime from activity_history " +
                    " join user on activity_history.mentorId = user.id " +
                    " join mentor_recruitment on activity_history.mentorRecruitmentCode = mentor_recruitment.mentorRecruitmentCode" +
                    " where activityHistoryCode =?";
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, activityHistoryCode);  //검색하기위해 입력한 아이디
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()) {

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("name",rs.getString("name"));
                historyHashMap.put("activityName", rs.getString("activityName"));
                historyHashMap.put("startTime", rs.getString("startTime"));
                historyHashMap.put("endTime", rs.getString("endTime"));

                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }return list;

    }


    public ArrayList<HashMap> readActivityHistoryForExport(String linkAgencyCode, String startDate, String endDate){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        try {
            conn=getConnection();

                sql = "SELECT 1365Id, name, phoneNumber, activityName, startTime ,endTime from activity_history " +
                        "join mentor_recruitment on activity_history.mentorRecruitmentCode=mentor_recruitment.mentorRecruitmentCode " +
                        "join mydb.user on activity_history.mentorId = user.id " +
                        "join mydb.mentor on user.id =mentor.id where linkAgencyCode=? AND startTime >= ? AND startTime <= ?";
                pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, linkAgencyCode);  //검색하기위해 입력한 아이디
            pstmt.setString(2, startDate);
            pstmt.setString(3, endDate);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()) {

                HashMap historyHashMap = new HashMap();
                historyHashMap.put("volunteerId",rs.getString("1365Id"));
                historyHashMap.put("name", rs.getString("name"));
                historyHashMap.put("phoneNumber", rs.getString("phoneNumber"));
                historyHashMap.put("activityName", rs.getString("activityName"));
                historyHashMap.put("startTime",rs.getString("startTime"));
                historyHashMap.put("endTime",rs.getString("endTime"));
                list.add(historyHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }return list;

    }

    public ArrayList<HashMap> updateActivityHistory(int activityHistoryCode, String startTime, String endTime){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        try {
            conn=getConnection();

            sql = "update activity_history set startTime =? , endTime =?  where activityHistoryCode =?";
            pstmt = conn.prepareStatement(sql);

            pstmt.setString(1, startTime);
            pstmt.setString(2, endTime);
            pstmt.setInt(3, activityHistoryCode);
            pstmt.executeUpdate();

        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }return list;

    }

    // 보고서 최초작성 createReport. content, note, image DB상에 업데이트
    public int createReport(int activityHistoryCode, String id, String content, String note, Blob imageBlob){
        int result = 0;
        String createDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern(("yyyy-MM-dd hh:mm:ss")));
        sql = "UPDATE activity_history SET activityContent = ?, note = ? ,activityPicture=?, approvalStatus=?, createDate=?  WHERE activityHistoryCode = ? AND mentorId= ?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,content);
            pstmt.setString(2,note);
            pstmt.setBlob(3,imageBlob);
            pstmt.setInt(4,2); //최초 0, 활동완료 1, 보고서 작성 2, 보고서 승인 3, 보고서 반려 4, 비활성화 -1
            pstmt.setString(5,createDate);
            pstmt.setInt(6,activityHistoryCode);
            pstmt.setString(7,id);
            result= pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
//    보고서 수정
    public int updateReport(int activityHistoryCode, String id, String content, String note, Blob imageBlob){
        int result = 0;
        sql = "UPDATE activity_history SET activityContent = ?, note = ? ,activityPicture=?  WHERE activityHistoryCode = ? AND mentorId= ?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            //update
            pstmt.setString(1,content);
            pstmt.setString(2,note);
            pstmt.setBlob(3,imageBlob);
            //where
            pstmt.setInt(4,activityHistoryCode);
            pstmt.setString(5,id);
            result= pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    //보고서 조회
    public ActivityHistory readReport(int activityHistoryCode){
        ActivityHistory activityHistory = new ActivityHistory();
        sql = "SELECT startTime, endTime, activityContent, note, activityPicture, createDate, approvalStatus,createDate, approvalDate, rejectionReason, user.name, mentor_recruitment.activityName, link_agency.linkAgencyName FROM activity_history JOIN user JOIN mentor_recruitment JOIN link_agency ON user.id = activity_history.mentorId AND mentor_recruitment.mentorRecruitmentCode=activity_history.mentorRecruitmentCode AND link_agency.linkAgencyCode=mentor_recruitment.linkAgencyCode WHERE activityHistoryCode = ?;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1,activityHistoryCode);
            rs= pstmt.executeQuery();
            while(rs.next()){
                activityHistory.setStartTime(rs.getString("startTime"));
                activityHistory.setEndTime(rs.getString("endTime"));
                activityHistory.setActivityContent(rs.getString("activityContent"));
                activityHistory.setNote(rs.getString("note"));
                activityHistory.setActivityPicture(rs.getBytes("activityPicture"));
                activityHistory.setCreateDate(rs.getString("createDate"));
                activityHistory.setApprovalStatus(rs.getInt("approvalStatus"));
                activityHistory.setMentorName(rs.getString("name"));
                activityHistory.setLinkAgencyName(rs.getString("linkAgencyName"));
                activityHistory.setActivityName(rs.getString("activityName"));
                activityHistory.setApprovalDate(rs.getString("approvalDate"));
                activityHistory.setRejectionReason(rs.getString("rejectionReason"));

            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return activityHistory;
    }

    // 연계기관에 소속되어있는 활동 조회
    public ArrayList<HashMap> readActivityList(String linkAgencyCode){
        ArrayList<HashMap> list =new ArrayList<HashMap>();
        sql = "SELECT mentorRecruitmentCode, activityName FROM mentor_recruitment WHERE linkAgencyCode=?;";

        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, linkAgencyCode);  //검색하기위해 입력한 아이디
            ResultSet rs= pstmt.executeQuery();

            while(rs.next()) {

                HashMap activityHashMap = new HashMap();
                activityHashMap.put("activityCode",rs.getString("mentorRecruitmentCode"));
                activityHashMap.put("activityName",rs.getString("activityName"));
                list.add(activityHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }

    //보고서 승인
    public int approveReport(String activityHistoryCode, String id ){
        int result = 0;
        sql = "UPDATE activity_history SET regionManagerId=?, approvalStatus = 3 WHERE activityHistoryCode = ?;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, activityHistoryCode);  //검색하기위해 입력한 아이디
            result= pstmt.executeUpdate();


        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return result;
    }
    //보고서 반려
    public int rejectReport(String activityHistoryCode, String id, String rejectionReason){
        int result = 0;
        sql = "UPDATE activity_history SET regionManagerId=?, approvalStatus = 4, rejectionReason=? WHERE activityHistoryCode = ?;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, id);
            pstmt.setString(2, rejectionReason);
            pstmt.setString(3, activityHistoryCode);  //검색하기위해 입력한 아이디
            result= pstmt.executeUpdate();


        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return result;
    }
    //QR 입장용 활동 목록 리스트 읽기
    public ArrayList readActivityToEnter(String id){
        ArrayList result = new ArrayList();
        sql = "SELECT mentor_recruitment.mentorRecruitmentCode, mentor_recruitment.activityName " +
                "FROM mentoring_application JOIN mentor_recruitment \n" +
                "ON mentoring_application.mentorRecruitmentCode=mentor_recruitment.mentorRecruitmentCode\n" +
                " WHERE mentorId=? AND applicationStatus=1;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs= pstmt.executeQuery();
            while(rs.next()){
                HashMap activity = new HashMap();
                activity.put("activityCode",rs.getString("mentorRecruitmentCode"));
                activity.put("activityName",rs.getString("activityName"));
                result.add(activity);
            }

        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return result;
    }

    //QR 퇴장용 활동 목록 리스트 읽기
    public ArrayList readActivityToExit(String id){
        ArrayList result = new ArrayList();
        sql = "SELECT activity_history.activityHistoryCode, activity_history.startTime, mentor_recruitment.activityName \n" +
                "FROM activity_history JOIN mentor_recruitment \n" +
                "ON activity_history.mentorRecruitmentCode=mentor_recruitment.mentorRecruitmentCode \n" +
                "WHERE mentorId=? AND approvalStatus=0;";
        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs= pstmt.executeQuery();
            while(rs.next()){
                HashMap activity = new HashMap();
                activity.put("activityHistoryCode",rs.getString("activityHistoryCode"));
                activity.put("startTime",rs.getString("startTime"));
                activity.put("activityName",rs.getString("activityName"));
                result.add(activity);
            }

        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return result;
    }

    // QR 스캔 후 활동 내역 입력.
    public int enterActivity(String linkAgencyManagerId, String mentorId, String activityCode){
        int result = 0;
        String now = LocalDateTime.now().toString();
        String today = LocalDate.now().toString();

        sql = "select * from activity_history WHERE mentorId=? AND startTime > ? AND mentorRecruitmentCode=?";
        String sql2 = "INSERT INTO activity_history(mentorRecruitmentCode, linkAgencyManagerId, mentorId, startTime) VALUES (?,?,?,?);";
        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            Savepoint savepoint1 = conn.setSavepoint("before_duplicate_check");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, mentorId);
            pstmt.setString(2, today);
            pstmt.setString(3, activityCode);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                return -1; // 오늘 이미 이 활동에대한 기록이 있으니 중복, 실패
            }


            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1, activityCode);
            pstmt.setString(2, linkAgencyManagerId);
            pstmt.setString(3, mentorId);
            pstmt.setString(4,now);
            result = pstmt.executeUpdate();
            conn.commit();
        }catch(SQLException se){
            se.printStackTrace();
            System.out.println("QR스캔 후 활동 시작 기록 실패. 롤백");
            try {
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException seRollback) {
                seRollback.printStackTrace();
            }

        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            closeConnection(conn);
        }

        return result;
    }

    //QR 스캔 -> 활동 종료
    public int exitActivity(String linkAgencyManagerId, String mentorId, int activityHistoryCode) {
        int result = 0;
        String now = LocalDateTime.now().toString();
        String today = LocalDate.now().toString();
        sql = "select * from activity_history WHERE mentorId=? AND startTime < ? AND activityHistoryCode=?"; // 오늘 0시00분 이전에 있었던 활동은 종료할 수 없도록
        String sql2 = "UPDATE activity_history SET endTime = ?, approvalStatus = 1 WHERE activityHistoryCode = ? AND mentorId=? AND approvalStatus=0;";

        try {
            conn = getConnection();
            conn.setAutoCommit(false);
            Savepoint savepoint1 = conn.setSavepoint("before_duplicate_check");
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, mentorId);
            pstmt.setString(2, today);
            pstmt.setInt(3, activityHistoryCode);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                return -1; // 오늘 이미 이 활동에대한 기록이 있으니 중복, 실패
            }

            pstmt = conn.prepareStatement(sql2);
            pstmt.setString(1, now);
            pstmt.setInt(2, activityHistoryCode);
            pstmt.setString(3, mentorId);
            result = pstmt.executeUpdate();
            conn.commit();
        } catch (SQLException se) {
            se.printStackTrace();
            System.out.println("QR스캔 후 활동 종료 기록 실패. 롤백");
            try {
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException seRollback) {
                seRollback.printStackTrace();
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public int createActivityHistory(String mentorRecruitmentCode,String id,String mentorId,String startTime) { // 등록
        sql = "insert into activity_history(mentorRecruitmentCode, linkAgencyManagerId, mentorId ,startTime)"
                + " values(?, ?, ?, ?)";
        int result =0;

        try {
            conn= getConnection();
            pstmt = conn.prepareStatement(sql);


            pstmt.setString(1,mentorRecruitmentCode);
            pstmt.setString(2,id);
            pstmt.setString(3,mentorId);
            pstmt.setString(4,startTime);


            result = pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

}
