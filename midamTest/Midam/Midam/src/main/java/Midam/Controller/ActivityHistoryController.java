package Midam.Controller;

import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.activity.ActivityHistory;

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
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;



@Controller
@RequestMapping(value= "/mentor/activityHistory", method=RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class ActivityHistoryController {

    @ResponseBody
    @PostMapping(value="/read")
    public ArrayList readActivityHistoryList(@RequestParam("id") String id) throws SQLException, ClassNotFoundException {

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getListMentor(id);

        return historyArrayList;
    }

    @ResponseBody
    @PostMapping(value="/createReport")
    public HashMap createReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String id = request.getParameter("id");
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
    @PostMapping(value="/updateReport")
    public HashMap updateReport(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String id = request.getParameter("id");
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
    @PostMapping(value="/readReport")
    public HashMap readReport(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String id = request.getParameter("id");
        String content = request.getParameter("content");
        String note = request.getParameter("note");
        int activityHistoryCode = Integer.parseInt(request.getParameter("activityHistoryCode"));
        MultipartFile file;

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
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
