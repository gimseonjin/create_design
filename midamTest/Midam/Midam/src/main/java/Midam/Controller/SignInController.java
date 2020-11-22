package Midam.Controller;
import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.linkAgency.LinkAgencyDAO;
import Midam.DAO.region.RegionDAO;
import Midam.model.token.Token;
import org.springframework.stereotype.Controller;
import Midam.DAO.user.UserDAO;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value= "/signIn", method=RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class SignInController {

    @ResponseBody
    @PostMapping(value="/createMentor")
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
    @PostMapping(value="/createLinkAgencyManager")
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
    @PostMapping(value="/createLinkAgencyManagerNewLinkAgency")
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
    @PostMapping(value="/readRegionList")
    public ArrayList<HashMap> readRegionList(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {

        HashMap result = new HashMap();

        RegionDAO regionDAO = new RegionDAO();
        ArrayList<HashMap> regionList = regionDAO.readRegionList();

        return regionList;
    }
    // 회원가입 시 지역본부에 소속되어있는 연계기관 리스트로 반환
    @ResponseBody
    @PostMapping(value="/readLinkAgencyList")
    public ArrayList<HashMap> readLinkAgencyList(HttpServletRequest request) throws SQLException, ClassNotFoundException, IOException {
        String regionCode = request.getParameter("regionCode");
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();
        ArrayList<HashMap> linkAgencyList = linkAgencyDAO.readLinkAgencyList(regionCode);

        return linkAgencyList;
    }

    //지역본부 관리자가 신청자 리스트 조회
    @ResponseBody
    @PostMapping(value="/readApplicant/regionManager")
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
    @PostMapping(value="/readLinkAgencyApplicantInfo/regionManager")
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
    @PostMapping(value="/approveLinkAgencyApplicant/regionManager")
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

    //회원가입 신청자 거절
    @ResponseBody
    @PostMapping(value="/rejectLinkAgencyApplicant/regionManager")
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
}
