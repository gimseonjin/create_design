package Midam.Controller;

import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.activity.RecruitmentDAO;

import Midam.DAO.community.PostDAO;
import Midam.DAO.linkAgency.LinkAgencyDAO;
import Midam.DAO.region.RegionDAO;
import Midam.model.community.Post;
import Midam.model.token.Token;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value= "/activity", method=RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class RecruitmentController {

    @ResponseBody
    @PostMapping(value="/readRecruitment")
    public ArrayList readRecruitmentList(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();

        int option = Integer.parseInt(request.getParameter("option"));
        String regionCode = request.getParameter("region");
        String linkAgencyCode = request.getParameter("linkAgency");


        RecruitmentDAO recruitmentDAO = new RecruitmentDAO();
        ArrayList<HashMap> recruitmentArrayList = recruitmentDAO.getListRecruitment(option, regionCode, linkAgencyCode);
        result.add(recruitmentArrayList);
        if(option==0) {
            RegionDAO regionDAO =new RegionDAO();
            ArrayList<HashMap> regionArrayList = regionDAO.readRegionList();
            result.add(regionArrayList);
        }
        return result;

    }


    @ResponseBody
    @PostMapping(value="/getLinkAgencyList")
    public ArrayList<HashMap> getActivityListMentor(MultipartHttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        HashMap result = new HashMap();
        String regionCode = request.getParameter("regionCode");
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();
        ArrayList<HashMap> linkAgencyList = linkAgencyDAO.getLinkAgencyList(regionCode);

        return linkAgencyList;
    }

    @ResponseBody
    @PostMapping(value="/createRecruitment")
    public HashMap createRecruitment(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        String activityName=request.getParameter("activityName");
        int numberOfMentor = Integer.parseInt(request.getParameter("numberOfMentor"));
        String activityInfo=request.getParameter("activityInfo");
        String startDate=request.getParameter("startDate");
        String finishDate=request.getParameter("finishDate");

        RecruitmentDAO recruitmentDAO = new RecruitmentDAO();

        int createResult = recruitmentDAO.createRecruitment(id,activityName,numberOfMentor,activityInfo,startDate,finishDate);
        result.put("responseMsg",createResult);
        return result;
    }
}