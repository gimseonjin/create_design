package Midam.Controller;

import Midam.DAO.activity.ApplicationDAO;

import Midam.DAO.community.PostDAO;
import Midam.model.activity.MentoringApplication;
import Midam.model.community.Post;
import Midam.model.token.Token;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value= "/activity", method= RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class ApplicationController {

    @ResponseBody
    @PostMapping(value="/readMentoringApplication")
    public ArrayList readApplicationList(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException,IOException , UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        ApplicationDAO applicationDAO = new ApplicationDAO();
        ArrayList<HashMap> applicationArrayList = applicationDAO.getListApplication(id);

        return applicationArrayList;
    }

    @ResponseBody
    @PostMapping(value="/readApplicationInfo")
    public HashMap readApplicationInfo(HttpServletRequest request)  {
        HashMap result = new HashMap();

        String id=request.getParameter("id");
        String mentorRecruitmentCode =request.getParameter("mentorRecruitmentCode");
        ApplicationDAO applicationDAO = new ApplicationDAO();

        MentoringApplication readResult = applicationDAO.readApplicationInfo(id,mentorRecruitmentCode);
        result.put("id",readResult.getMentorId());
        result.put("motivation",readResult.getApplicationMotivation());
        result.put("career",readResult.getCareer());
        result.put("ability",readResult.getAbility());
        result.put("applicationDate",readResult.getApplicationDate());
        return result;
    }

    @ResponseBody
    @PostMapping(value="/readApplication/manager")
    public ArrayList readApplication(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException,IOException , UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        ApplicationDAO applicationDAO = new ApplicationDAO();
        ArrayList<HashMap> applicationArrayList = applicationDAO.getListApplication(id);

        return applicationArrayList;
    }
    @ResponseBody
    @PostMapping(value="/createApplication")
    public HashMap createApplication(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        String mentorRecruitmentCode = request.getParameter("mentorRecruitmentCode");
        String motivation = request.getParameter("motivation");
        String career = request.getParameter("career");
        String ability = request.getParameter("ability");

        ApplicationDAO applicationDAO = new ApplicationDAO();

        int createResult = applicationDAO.createApplication(id,mentorRecruitmentCode,motivation,career,ability);
        result.put("responseMsg",createResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/approvalPass")
    public HashMap approvalPass(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        String id =request.getParameter("id");
        String mentorRecruitmentCode =request.getParameter("mentorRecruitmentCode");
        ApplicationDAO applicationDAO = new ApplicationDAO();

        int updateResult = applicationDAO.approvalPass(id,mentorRecruitmentCode);
        result.put("responseMsg",updateResult);
        return result;
    }
    @ResponseBody
    @PostMapping(value="/approvalFail")
    public HashMap approvalFail(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        String id=request.getParameter("id");
        String mentorRecruitmentCode =request.getParameter("mentorRecruitmentCode");
        ApplicationDAO applicationDAO = new ApplicationDAO();

        int updateResult = applicationDAO.approvalFail(id,mentorRecruitmentCode);
        result.put("responseMsg",updateResult);
        return result;
    }
}
