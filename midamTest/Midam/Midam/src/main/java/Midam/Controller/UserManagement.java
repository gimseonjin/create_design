package Midam.Controller;

import Midam.DAO.activity.ApplicationDAO;
import Midam.DAO.community.PostDAO;
import Midam.DAO.linkAgency.LinkAgencyDAO;
import Midam.DAO.region.RegionDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.activity.MentoringApplication;
import Midam.model.token.Token;
import Midam.model.token.UserToken;
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

@RestController
@CrossOrigin("http://localhost:3000")
public class UserManagement {

    Token tokenController = new Token();

    @ResponseBody
    @PostMapping("/login")
    public HashMap login(@RequestParam("id") String id, @RequestParam("password") String password, @RequestParam("reqAuthority") int reqAuthority) throws SQLException, ClassNotFoundException {

        HashMap result = new HashMap();
        String jwt = "";
        UserDAO userDAO = new UserDAO();
        int authority = userDAO.login(id, password, reqAuthority);
        switch (authority) {
            case 1:
            case 2:
            case 3:
            case 4:
                UserToken userToken = new UserToken(id, password, authority);
                jwt = tokenController.createToken(userToken);
                result.put("result", 1);
                result.put("userToken", jwt);
                result.put("responseMsg","성공");
                break;

            case 0:
            case -1:
            case -2:
            case -3:
                result.put("result", 0);
                result.put("responseMsg","실패");
        }
        return result;
    }

    @ResponseBody
    @PostMapping("/checkAuthority")
    public String checkAuthority(@RequestParam("userToken") String jwt, @RequestParam("authority") String Aut) throws UnsupportedEncodingException {

        Map<String, Object> claimMa = tokenController.verifyJWTAll(jwt).get("data", HashMap.class);
        String result = "";
        String id = claimMa.get("id").toString();
        String password = claimMa.get("password").toString();
        int reqAuthority = Integer.parseInt(claimMa.get("authority").toString());

        UserDAO userDAO = new UserDAO();
        int authority = userDAO.login(id, password, reqAuthority);

        if (reqAuthority == Integer.parseInt(Aut)) {
            result = "TRUE";
        } else {
            result = "FALSE";
        }
        return result;
    }

    @ResponseBody
    @PostMapping(value = "/user/readUserInfo/mentor")
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
    @PostMapping(value = "/user/updateUserInfo/mentor")
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
    @PostMapping(value = "/user/readUserInfo/linkAgencyManager")
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
    @PostMapping(value = "/user/updateUserInfo/linkAgencyManager")
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
    @PostMapping(value="/user/searchId")
    public HashMap searchId(HttpServletRequest request)  {
        HashMap result = new HashMap();


        String name =request.getParameter("name");

        UserDAO userDAO = new UserDAO();

        User searchResult = userDAO.searchId(name);
        result.put("id",searchResult.getId());


        return result;
    }

    @ResponseBody
    @PostMapping(value = "/user/readMentorAndRegionManagerList")
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
    @PostMapping(value = "/user/changeMentorAuthority/systemManager")
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
    @PostMapping(value = "/user/readLinkAgencyList/regionManager")
    public ArrayList readLinkAgency(HttpServletRequest request) throws SQLException, ClassNotFoundException, UnsupportedEncodingException {

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
    @PostMapping(value = "/user/readRegionList")
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
    @PostMapping(value = "/user/readMentorList/regionManager")
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
    @PostMapping(value = "/user/readLinkAgencyManagerList/regionManager")
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
    @PostMapping(value = "/user/deleteLinkAgencyManager/regionManager")
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
    @PostMapping(value = "/user/deleteMentor/regionManager")
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
    @PostMapping(value="/user/applyChangeRegion")
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
    @PostMapping(value="/user/readChangeRegionApplication")
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
    @PostMapping(value="/user/approvalPass")
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
    @PostMapping(value="/user/approvalFail")
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
    @PostMapping(value="/user/readRegionManager/inquiry")
    public ArrayList readRegionManagerInquiry(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        ArrayList result = new ArrayList();

        String regionCode =request.getParameter("regionCode");
        UserDAO userDAO = new UserDAO();

        result= userDAO.readRegionManager(regionCode);

        return result;
    }

    @ResponseBody
    @PostMapping(value="/signIn/createMentor")
    public HashMap createMentor(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        int age = Integer.parseInt(request.getParameter("age"));
        String address = request.getParameter("address");
        String phoneNumber = request.getParameter("phoneNumber");

        String regionCode = request.getParameter("regionCode");
        String volunteerId = request.getParameter("volunteerId");

        UserDAO userDAO = new UserDAO();

        int createResult = userDAO.createMentor(id,password,name,gender,age,address,phoneNumber, regionCode, volunteerId);
        result.put("responseMsg",createResult);
        return result;
    }

    //연계기관 담당자 기존 연계기관으로 신청
    @ResponseBody
    @PostMapping(value="/signIn/createLinkAgencyManager")
    public HashMap createLinkAgencyManager(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        int age = Integer.parseInt(request.getParameter("age"));
        String address = request.getParameter("address");
        String phoneNumber = request.getParameter("phoneNumber");

        String linkAgencyCode = request.getParameter("linkAgencyCode");

        UserDAO userDAO = new UserDAO();

        int createResult = userDAO.createLinkAgencyManager(id,password,name,gender,age,address,phoneNumber,
                linkAgencyCode);
        result.put("responseMsg",createResult);
        return result;
    }
    //연계기관 담당자 신규 연계기관 등록
    @ResponseBody
    @PostMapping(value="/signIn/createLinkAgencyManagerNewLinkAgency")
    public HashMap createLinkAgencyManagerNewLinkAgency(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();
        String id = request.getParameter("id");
        String password = request.getParameter("password");
        String name = request.getParameter("name");
        String gender = request.getParameter("gender");
        int age = Integer.parseInt(request.getParameter("age"));
        String address = request.getParameter("address");
        String phoneNumber = request.getParameter("phoneNumber");

        // 연계기관 신규 등록
        String regionCode = request.getParameter("regionCode");
        String linkAgencyName = request.getParameter("linkAgencyName");
        String linkAgencyAddress = request.getParameter("linkAgencyAddress");
        String linkAgencyInfo = request.getParameter("linkAgencyInfo");
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();
        UserDAO userDAO = new UserDAO();

        String linkAgencyCode = linkAgencyDAO.createLinkAgencyApplication(regionCode, linkAgencyName, linkAgencyAddress, linkAgencyInfo);
        //등록결과 연계기관 코드를 반환
        //신규 연계기관을 등록 한 후 그 연계기관의 코드를 가져와야한다
        if(linkAgencyCode != null) {

            int createResult = userDAO.createLinkAgencyManager(id, password, name, gender, age, address, phoneNumber,
                    linkAgencyCode);

            if(createResult >= 1) {
                result.put("responseMsg", "신청 성공");
            }
        }else{
            result.put("responseMsg", "신청 실패, 다시 시도해주세요");
        }
        return result;
    }

    // 회원가입시 선택할 지역본부 목록 리스트로 반환
    @ResponseBody
    @PostMapping(value="/signIn/readRegionList")
    public ArrayList<HashMap> readRegionList(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        RegionDAO regionDAO = new RegionDAO();
        ArrayList<HashMap> regionList = regionDAO.readRegionList();

        return regionList;
    }
    // 회원가입 시 지역본부에 소속되어있는 연계기관 리스트로 반환
    @ResponseBody
    @PostMapping(value="/signIn/readLinkAgencyList")
    public ArrayList<HashMap> readLinkAgencySignIn(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        String regionCode = request.getParameter("regionCode");
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();
        ArrayList<HashMap> linkAgencyList = linkAgencyDAO.readLinkAgency(regionCode);

        return linkAgencyList;
    }

    //지역본부 관리자가 신청자 리스트 조회
    @ResponseBody
    @PostMapping(value="/signIn/readApplicant/regionManager")
    public ArrayList readApplicant(@RequestParam("userToken") String userToken) throws UnsupportedEncodingException {
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        UserDAO userDAO = new UserDAO();
        ArrayList<HashMap> mentorApplicantList = userDAO.readMentorApplicantList(id);
        ArrayList<HashMap> linkAgencyManagerApplicantList = userDAO.readLinkAgencyApplicantList(id);

        ArrayList result = new ArrayList();
        result.add(mentorApplicantList);
        result.add(linkAgencyManagerApplicantList);

        return result;
    }
    //신청자 승인 겸 상세 조회.
    @ResponseBody
    @PostMapping(value="/signIn/readLinkAgencyApplicantInfo/regionManager")
    public HashMap readApplicantInfo(@RequestParam("userToken") String userToken, @RequestParam("applicantId") String applicantId) throws UnsupportedEncodingException {
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String authority = map.get("authority").toString();

        HashMap result = null;
        UserDAO userDAO = new UserDAO();
        result = userDAO.readLinkAgencyApplicantInfo(applicantId);

        return result;
    }

    //연계기관 담당자 회원가입 승인
    @ResponseBody
    @PostMapping(value="/signIn/approveLinkAgencyApplicant/regionManager")
    public HashMap approveLinkAgencyApplicant(HttpServletRequest request) throws UnsupportedEncodingException {
        String applicantId = request.getParameter("applicantId");
        String linkAgencyCode = request.getParameter("linkAgencyCode");
        int linkAgencyStatus = Integer.parseInt(request.getParameter("linkAgencyStatus"));

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();


        //연계기관 등록을 승인 한 후
        if(linkAgencyStatus == 0 ) {
            int linkAgencyResult = linkAgencyDAO.approveLinkAgency(linkAgencyCode);
            int applicantResult = userDAO.approveLinkAgencyApplicant(applicantId);
            if(linkAgencyResult==1 && applicantResult==1) {
                result.put("responseMsg", "성공");
            }else{
                result.put("responseMsg", "실패");
            }
            return result;
        }else {
            //연계기관 담당자 승인.
            int applicantResult = userDAO.approveLinkAgencyApplicant(applicantId);
            if(applicantResult == 1){
                result.put("responseMsg", "성공");
            }else{
                result.put("responseMsg", "실패");
            }
            return result;
        }
    }

    //연계기관 담당자 회원가입 신청자 거절
    @ResponseBody
    @PostMapping(value="/signIn/rejectLinkAgencyApplicant/regionManager")
    public HashMap rejectLinkAgencyApplicant(HttpServletRequest request) throws UnsupportedEncodingException {
        String applicantId = request.getParameter("applicantId");
        String linkAgencyCode = request.getParameter("linkAgencyCode");
        int linkAgencyStatus = Integer.parseInt(request.getParameter("linkAgencyStatus"));

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();

        //연계기관 등록신청을 삭제
        if(linkAgencyStatus == 0 ) {
            int[] applicantResult = userDAO.deleteLinkAgencyManagerApplicant(applicantId);
            int linkAgencyResult = linkAgencyDAO.deleteLinkAgencyApplication(linkAgencyCode);
            if(applicantResult[0] ==1 && applicantResult[1] ==1 && linkAgencyResult==1){
                result.put("responseMsg","성공");
            }else{
                result.put("responseMsg","실패");
            }
        }else{
            //연계기관 담당자 삭제.
            int[] applicantResult = userDAO.deleteLinkAgencyManagerApplicant(applicantId);
            //index 0: link_agency_manager에서 삭제, 1: user에서 삭제 한 결과
            if(applicantResult[0] ==1 && applicantResult[1] ==1){
                result.put("responseMsg","성공");
            }else{
                result.put("responseMsg","실패");
            }
        }
        return result;
    }

    //멘토 회원가입 승인
    @ResponseBody
    @PostMapping(value="/signIn/approveMentorApplicant/regionManager")
    public HashMap approveMentorApplicant(HttpServletRequest request) throws UnsupportedEncodingException {
        String applicantId = request.getParameter("applicantId");

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        //멘토 담당자 승인.
        int applicantResult = userDAO.approveMentorApplicant(applicantId);
        if(applicantResult == 1){
            result.put("responseMsg", "성공");
        }else{
            result.put("responseMsg", "실패");
        }
        return result;
    }

    //멘토 회원가입 신청자 거절
    @ResponseBody
    @PostMapping(value="/signIn/rejectMentorApplicant/regionManager")
    public HashMap rejectMentorApplicant(HttpServletRequest request) throws UnsupportedEncodingException {
        String applicantId = request.getParameter("applicantId");

        HashMap result = new HashMap();
        UserDAO userDAO = new UserDAO();

        int[] resultRows = userDAO.rejectMentorApplicant(applicantId);
        if(resultRows[0] == 1 && resultRows[1] == 1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","성공");
        }

        return result;
    }
}