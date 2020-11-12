package Midam.Controller;

import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.activity.ActivityHistory;

import Midam.model.token.Token;
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
        Object objectId = map.get("id");
        String id = objectId.toString();
        int option = Integer.parseInt(request.getParameter("option"));
        String linkAgency = request.getParameter("linkAgency");
        String activity = request.getParameter("activity");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

            MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
                ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getHistoryListMentor(id, option, linkAgency, activity, startDate, endDate);
                result.add(historyArrayList);

                if(option==0) {
                    ArrayList<HashMap> linkAgencyArrayList = mentoringHistoryDAO.getLinkAgencyList(id);
                    result.add(linkAgencyArrayList);
                }
            return result;
    }
    @ResponseBody
    @PostMapping(value="/readHistory/regionManager")
    public ArrayList readActivityHistoryListRegionManager(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        String jwt = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(jwt).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();
        int option = Integer.parseInt(request.getParameter("option"));
        String linkAgency = request.getParameter("linkAgency");
        String activity = request.getParameter("activity");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getHistoryListRegionManager(id, option, linkAgency, activity, startDate, endDate);
        result.add(historyArrayList);

        if(option==0) {
            ArrayList<HashMap> linkAgencyArrayList = mentoringHistoryDAO.getLinkAgencyList(id);
            result.add(linkAgencyArrayList);
        }
        return result;
    }

    @ResponseBody
    @PostMapping(value="/createReport/mentor")
    public HashMap createReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String jwt = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(jwt).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

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
        String jwt = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(jwt).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        String content = request.getParameter("content");
        String note = request.getParameter("note");
        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));
        MultipartFile file=request.getFile("file");
        Blob imageBlob = multipartFileToBlob(file);
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        int updateResult = mentoringHistoryDAO.updateReport(activityHistoryCode, id, content, note, imageBlob);
        result.put("responseMsg",updateResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/readReport/mentor")
    public HashMap readReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String jwt = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(jwt).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

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
    @PostMapping(value="/getActivityList/mentor")
    public ArrayList<HashMap> getActivityListMentor(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String linkAgencyCode = request.getParameter("linkAgencyCode");
        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ArrayList<HashMap> activityList = mentoringHistoryDAO.getActivityList(linkAgencyCode);

        return activityList;
    }



    public Blob multipartFileToBlob(MultipartFile file) throws IOException, SQLException {
        Blob resultBlob;
        byte[] bytes;
        bytes=file.getBytes();
        resultBlob = new javax.sql.rowset.serial.SerialBlob(bytes);

        return resultBlob;
    }

//    /getActivityList/mentor
}
