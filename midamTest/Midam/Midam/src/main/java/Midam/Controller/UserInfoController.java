package Midam.Controller;

import Midam.DAO.activity.ApplicationDAO;
import Midam.DAO.community.PostDAO;
import Midam.DAO.linkAgency.LinkAgencyDAO;
import Midam.DAO.region.RegionDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.activity.MentoringApplication;
import Midam.model.token.Token;
import Midam.model.user.LinkAgencyManager;
import Midam.model.user.Mentor;
import Midam.model.user.RegionChangeApplication;
import Midam.model.user.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value= "/user", method= RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class UserInfoController {

    @ResponseBody
    @PostMapping(value = "/readUserInfo/mentor")
    public HashMap readUserInfo(@RequestParam(name="userToken") String userToken) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        Mentor mentor = userDAO.getUserInfo(id);
        result.put("id",mentor.getId());
        result.put("name",mentor.getName());
        result.put("gender",mentor.getGender());
        result.put("age",mentor.getAge());
        result.put("address",mentor.getAddress());
        result.put("phoneNumber",mentor.getPhoneNumber());
        result.put("authority",mentor.getAuthority());
        result.put("volunteerId",mentor.getVolunteerId());
        result.put("region", mentor.getRegionCode());

        return result;
    }




    @ResponseBody
    @PostMapping(value = "/updateUserInfo/mentor")
    public HashMap updateUserInfo(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        String userToken = request.getParameter("userToken");
        String name = request.getParameter("name");
        int age =  Integer.parseInt(request.getParameter("age"));
        String phoneNumber =  request.getParameter("phoneNumber");
        String volunteerId =  request.getParameter("volunteerId");
        String address = request.getParameter("address");

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        int resultRows = userDAO.updateUserInfo(id, name, age, phoneNumber, address,volunteerId);
        if(resultRows==2){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }
        
        return result;
    }

    @ResponseBody
    @PostMapping(value = "/readUserInfo/linkAgencyManager")
    public HashMap readUserInfoManager(@RequestParam(name="userToken") String userToken) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        LinkAgencyManager linkAgencyManager = userDAO.getUserInfoManager(id);
        result.put("id",linkAgencyManager.getId());
        result.put("name",linkAgencyManager.getName());
        result.put("gender",linkAgencyManager.getGender());
        result.put("age",linkAgencyManager.getAge());
        result.put("address",linkAgencyManager.getAddress());
        result.put("phoneNumber",linkAgencyManager.getPhoneNumber());
        result.put("authority",linkAgencyManager.getAuthority());
        result.put("linkAgency", linkAgencyManager.getLinkAgencyCode());

        System.out.println(result);
        return result;
    }

    @ResponseBody
    @PostMapping(value = "/updateUserInfo/linkAgencyManager")
    public HashMap updateUserInfoManager(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        String userToken = request.getParameter("userToken");
        String name = request.getParameter("name");
        int age =  Integer.parseInt(request.getParameter("age"));
        String phoneNumber =  request.getParameter("phoneNumber");
        String address = request.getParameter("address");

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        int resultRows = userDAO.updateUserInfoManager(id, name, age, phoneNumber, address);
        if(resultRows==1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }


    @ResponseBody
    @PostMapping(value="/searchId")
    public HashMap searchId(HttpServletRequest request)  {
        HashMap result = new HashMap();


        String name =request.getParameter("name");

        UserDAO userDAO = new UserDAO();

        User searchResult = userDAO.searchId(name);
        result.put("id",searchResult.getId());


        return result;
    }

    @ResponseBody
    @PostMapping(value = "/readMentorAndRegionManagerList")
    public ArrayList readBelongingMentor(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        String userToken = request.getParameter("userToken");
        String regionCode = request.getParameter("regionCode");

        ArrayList result = new ArrayList();
        UserDAO userDAO = new UserDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String authority = map.get("authority").toString();

        result = userDAO.readMentorAndRegionManagerList(regionCode);

        return result;
    }

    //멘토 -> 관리자, 관리자 -> 멘토 로 권한 변경
    @ResponseBody
    @PostMapping(value = "/changeMentorAuthority/systemManager")
    public HashMap changeMentorAuthority(HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap();

        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        int authority = (Integer)map.get("authority");
        String userId = request.getParameter("userId");
        int userAuthority = Integer.parseInt(request.getParameter("userAuthority"));
        if(authority!=4){
            result.put("responseMsg","권한 없음");
            return result;
        }

        UserDAO userDAO = new UserDAO();
        int resultRows = userDAO.changeMentorAuthority(userId, userAuthority);
        if(resultRows == 1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }
        
        
        return result;
    }

    //지역본부 관리자가 소속 연계기관담당자 조회시 지역본부 리스트 조회
    @ResponseBody
    @PostMapping(value = "/readLinkAgencyList/regionManager")
    public ArrayList readLinkAgencyList(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        String userToken = request.getParameter("userToken");

        ArrayList result = new ArrayList();
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        result = linkAgencyDAO.readLinkAgencyListRegionManager(id);

        return result;
    }
    @ResponseBody  //소속변경시 지역본부 목록 조회
    @PostMapping(value = "/readRegionList")
    public ArrayList readRegionList(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        RegionDAO regionDAO =new RegionDAO();
        ArrayList<HashMap> regionArrayList = regionDAO.readChangeRegionList(id);



        return regionArrayList;
    }
    //지역본부 관리자가 소속 멘토 조회
    @ResponseBody
    @PostMapping(value = "/readMentorList/regionManager")
    public ArrayList readMentorList(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        UserDAO userDAO = new UserDAO();

        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        result = userDAO.readMentorList(id);

        return result;
    }

    //지역본부 관리자가 소속 연계기관담당자 조회
    @ResponseBody
    @PostMapping(value = "/readLinkAgencyManagerList/regionManager")
    public ArrayList readLinkAgencyManagerList(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {
        ArrayList result = new ArrayList();
        UserDAO userDAO = new UserDAO();

        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();
        int option = Integer.parseInt(request.getParameter("option"));

        if(option==0) { //option: 0 지역본부 선택안함
            result = userDAO.readLinkAgencyManagerList(id);
        }else if (option==1){ //option: 1 지역본부 선택시
            String linkAgencyCode = request.getParameter("linkAgencyCode");
            result = userDAO.readLinkAgencyManagerListWithOption(id,linkAgencyCode);
        }
        return result;
    }

    //지역본부관리자가 연계기관 담당자를 삭제. 실제로 delete는아니고 권한을 바꿔서 비활성화.
    @ResponseBody
    @PostMapping(value = "/deleteLinkAgencyManager/regionManager")
    public HashMap deleteLinkAgencyManager(HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap();
        String userToken = request.getParameter("userToken");
        String linkAgencyManagerId = request.getParameter("linkAgencyManagerId");

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        int authority = (Integer)map.get("authority");
        if(authority!=2){
            result.put("responseMsg","권한 없음");
            return result;
        }

        UserDAO userDAO = new UserDAO();

        int resultRows = userDAO.deleteLinkAgencyManager(linkAgencyManagerId);

        if(resultRows==1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }

    //지역본부관리자가 소속 멘토를 삭제. 실제로 delete는아니고 권한을 바꿔서 비활성화.
    @ResponseBody
    @PostMapping(value = "/deleteMentor/regionManager")
    public HashMap deleteMentor(HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap();
        String userToken = request.getParameter("userToken");
        String mentorId = request.getParameter("mentorId");

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        int authority = (Integer)map.get("authority");
        if(authority!=2){
            result.put("responseMsg","권한 없음");
            return result;
        }

        UserDAO userDAO = new UserDAO();

        int resultRows = userDAO.deleteMentor(mentorId);

        if(resultRows==1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }

    @ResponseBody
    @PostMapping(value="/applyChangeRegion")
    public HashMap applyChangeRegion(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        String regionCode=request.getParameter("regionCode");
        String changeReason=request.getParameter("changeReason");

        UserDAO userDAO = new UserDAO();

        int createResult = userDAO.applyChangeRegion(regionCode, id,changeReason);
        result.put("responseMsg",createResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/readChangeRegionApplication")
    public ArrayList readApplication(@RequestParam(name="userToken") String userToken, HttpServletRequest request) throws SQLException, ClassNotFoundException,IOException , UnsupportedEncodingException {

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        Object objectId = map.get("id");
        String id = objectId.toString();

        UserDAO userDAO = new UserDAO();
        ArrayList<HashMap> applicationArrayList = userDAO.readChangeRegionApplication(id);

        return applicationArrayList;
    }

    @ResponseBody
    @PostMapping(value="/approvalPass")
    public HashMap approvalPass(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        String id =request.getParameter("id");
        String regionCode =request.getParameter("regionCode");
        UserDAO userDAO = new UserDAO();

        int updateResult = userDAO.approvalPass(id,regionCode);
        result.put("responseMsg",updateResult);
        return result;
    }
    @ResponseBody
    @PostMapping(value="/approvalFail")
    public HashMap approvalFail(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        String id=request.getParameter("id");
        String regionCode =request.getParameter("regionCode");
        UserDAO userDAO = new UserDAO();

        int updateResult = userDAO.approvalFail(id,regionCode);
        result.put("responseMsg",updateResult);
        return result;
    }

    @ResponseBody
    @PostMapping(value="/readRegionManager/inquiry")
    public ArrayList readRegionManagerInquiry(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        ArrayList result = new ArrayList();

        String regionCode =request.getParameter("regionCode");
        UserDAO userDAO = new UserDAO();

        result= userDAO.readRegionManager(regionCode);

        return result;
    }
}