package Midam.Controller;

import Midam.DAO.activity.ApplicationDAO;
import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.linkAgency.LinkAgencyDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.activity.ActivityHistory;

import Midam.model.token.Token;
import Midam.model.user.Mentor;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.Servlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping(value= "/activityHistory", method=RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class ActivityHistoryController {

    @ResponseBody
    @PostMapping(value="/readHistory/mentor")
    public ArrayList readActivityHistoryListMentor(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        String jwt = request.getParameter("userToken") ;
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(jwt).get("data", HashMap.class);
        String id = map.get("id").toString();
        int option = Integer.parseInt(request.getParameter("option"));
        String linkAgency = request.getParameter("linkAgency");
        String activity = request.getParameter("activity");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

            MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
            LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();
                ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getHistoryListMentor(id, option, linkAgency, activity, startDate, endDate);
                result.add(historyArrayList);

                if(option==0) {
                    ArrayList<HashMap> linkAgencyArrayList = linkAgencyDAO.readLinkAgencyListMentor(id);
                    result.add(linkAgencyArrayList);
                }
            return result;
    }
    @ResponseBody
    @PostMapping(value="/readHistory/regionManager")
    public ArrayList readActivityHistoryListRegionManager(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();
        int option = Integer.parseInt(request.getParameter("option"));
        String linkAgency = request.getParameter("linkAgency");
        String activity = request.getParameter("activity");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();
        ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getHistoryListRegionManager(id, option, linkAgency, activity, startDate, endDate);
        result.add(historyArrayList);

        if(option==0) {
            ArrayList<HashMap> linkAgencyArrayList = linkAgencyDAO.readLinkAgencyListMentor(id);
            result.add(linkAgencyArrayList);
        }
        return result;
    }
    @ResponseBody
    @PostMapping(value="/readHistory/info")
    public ArrayList readActivityHistoryInfo(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();


        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        result = mentoringHistoryDAO.readActivityHistoryInfo(activityHistoryCode);


        return result;
    }

    @ResponseBody
    @PostMapping(value="/readHistory/update")
    public ArrayList updateActivityHistory(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();


        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        result = mentoringHistoryDAO.updateActivityHistory(activityHistoryCode,startTime,endTime);


        return result;
    }
    @ResponseBody
    @PostMapping(value="/readHistory/excel")
    public ArrayList readActivityHistoryForExport(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();

        String linkAgencyCode = request.getParameter("linkAgencyCode");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        result = mentoringHistoryDAO.readActivityHistoryForExport(linkAgencyCode,startDate, endDate);


        return result;
    }

    @ResponseBody
    @PostMapping(value="/createActivityHistory")
    public HashMap createActivityHistory(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        String mentorRecruitmentCode = request.getParameter("activity");
        String startTime = request.getParameter("startTime");
        String mentorId = request.getParameter("mentorId");



        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        int createResult = mentoringHistoryDAO.createActivityHistory(mentorRecruitmentCode,id,mentorId,startTime);

        result.put("responseMsg",createResult);
        return result;
    }


    @ResponseBody
    @PostMapping(value="/createReport/mentor")
    public HashMap createReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        String content = request.getParameter("content");
        String note = request.getParameter("note");
        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));
        MultipartFile file=request.getFile("file");
        Blob imageBlob = multipartFileToBlob(file);
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        int updateResult = mentoringHistoryDAO.createReport(activityHistoryCode, id, content, note, imageBlob);

        result.put("responseMsg",updateResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/updateReport/mentor")
    public HashMap updateReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        String content = request.getParameter("content");
        String note = request.getParameter("note");
        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));
        MultipartFile file=request.getFile("file");
        Blob imageBlob = multipartFileToBlob(file);
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        int updateResult = mentoringHistoryDAO.updateReport(activityHistoryCode, id, content, note, imageBlob);
        if(updateResult==1) {
            result.put("responseMsg", "성공");
        }else{
            result.put("responseMsg", "실패");
        }
        return result;
    }

    @ResponseBody
    @PostMapping(value="/readReport/mentor")
    public HashMap readReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ActivityHistory resultHistory = mentoringHistoryDAO.readReport(activityHistoryCode);
        result.put("startTime",resultHistory.getStartTime());
        result.put("endTime",resultHistory.getEndTime());
        result.put("activityContent", resultHistory.getActivityContent());
        result.put("note", resultHistory.getNote());
        result.put("activityPictureBASE64",resultHistory.getActivityPictureBASE64());
        result.put("createDate",resultHistory.getCreateDate());
        result.put("approvalStatus", resultHistory.getApprovalStatus());
        result.put("mentorName",resultHistory.getMentorName());
        result.put("linkAgencyName",resultHistory.getLinkAgencyName());
        result.put("activityName",resultHistory.getActivityName());
        result.put("approvalDate",resultHistory.getApprovalDate());
        result.put("rejectionReason",resultHistory.getRejectionReason());
        result.put("approvalDate",resultHistory.getApprovalDate());

        return result;
    }

    @ResponseBody
    @PostMapping(value="/readActivityList/mentor")
    public ArrayList<HashMap> getActivityListMentor(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String linkAgencyCode = request.getParameter("linkAgencyCode");
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ArrayList<HashMap> activityList = mentoringHistoryDAO.readActivityList(linkAgencyCode);

        return activityList;
    }

    @ResponseBody
    @PostMapping(value="/approveReport/regionManager")
    public HashMap approveReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        // front에서 받을것: 활동코드, 지역본부관리자ID(db에들어감)
        // 날짜는 서버기준으로
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();

        String activityHistoryCode = request.getParameter("activityHistoryCode");
        String resultMessage="";
        int resultInt= mentoringHistoryDAO.approveReport(activityHistoryCode, id);
        if(resultInt > 0){
            resultMessage="성공";
        }
        else{
            resultMessage="실패";
        }

        result.put("resultMessage", resultMessage);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/rejectReport/regionManager")
    public HashMap rejectReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        // front에서 받을것: 활동코드, 지역본부관리자ID(db에들어감)
        // 날짜는 서버기준으로
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();

        String activityHistoryCode = request.getParameter("activityHistoryCode");
        String rejectionReason = request.getParameter("rejectionReason");
        String resultMessage="";
        int resultInt= mentoringHistoryDAO.rejectReport(activityHistoryCode, id, rejectionReason);
        if(resultInt > 0){
            resultMessage="성공";
        }
        else{
            resultMessage="실패";
        }

        result.put("resultMessage", resultMessage);
        return result;
    }
    //QR 입장용 활동 목록 리스트 읽기
    @ResponseBody
    @PostMapping(value="/readActivityToEnter/mentor")
    public ArrayList readActivityToEnter(@RequestParam(value = "userToken") String userToken) throws UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        result = mentoringHistoryDAO.readActivityToEnter(id);

        return result;
    }

    //QR 퇴장용 활동 목록 리스트 읽기
    @ResponseBody
    @PostMapping(value="/readActivityToExit/mentor")
    public ArrayList readActivityToExit(@RequestParam(value = "userToken") String userToken) throws UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        result = mentoringHistoryDAO.readActivityToExit(id);
        return result;
    }
    
    // QR스캔 -> 멘토 활동 시작
    @ResponseBody
    @PostMapping(value="/enterActivity/linkAgencyManager")
    public HashMap enterActivity(HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap();
        String linkAgencyManagerToken = request.getParameter("linkAgencyManagerToken");
        String mentorToken = request.getParameter("mentorToken");
        String activityCode = request.getParameter("activityCode");

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(linkAgencyManagerToken).get("data", HashMap.class);
        String linkAgencyManagerId = map.get("id").toString();

        map = token.verifyJWTAll(mentorToken).get("data", HashMap.class);
        String mentorId = map.get("id").toString();

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();

        int resultRows = mentoringHistoryDAO.enterActivity(linkAgencyManagerId, mentorId, activityCode);

        if(resultRows==1){
            result.put("responseMsg","성공");
        }else if(resultRows ==-1){
            result.put("responseMsg","오늘 중복되는 활동이 있습니다.");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }

    // QR스캔 -> 멘토 활동 종료
    @ResponseBody
    @PostMapping(value="/exitActivity/linkAgencyManager")
    public HashMap exitActivity(HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap();
        String linkAgencyManagerToken = request.getParameter("linkAgencyManagerToken");
        String mentorToken = request.getParameter("mentorToken");
        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(linkAgencyManagerToken).get("data", HashMap.class);
        String linkAgencyManagerId = map.get("id").toString();

        map = token.verifyJWTAll(mentorToken).get("data", HashMap.class);
        String mentorId = map.get("id").toString();

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();

        int resultRows = mentoringHistoryDAO.exitActivity(linkAgencyManagerId, mentorId, activityHistoryCode);

        if(resultRows==1){
            result.put("responseMsg","성공");
        }else if(resultRows ==-1){
            result.put("responseMsg","오늘 활동이 아닙니다. 기관 담당자에게 문의해주세요.");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }

    public Blob multipartFileToBlob(MultipartFile file) throws IOException, SQLException {
        Blob resultBlob;
        byte[] bytes;
        bytes=file.getBytes();
        resultBlob = new javax.sql.rowset.serial.SerialBlob(bytes);

        return resultBlob;
    }

}
