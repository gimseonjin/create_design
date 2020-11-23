package Midam.Controller;

import Midam.DAO.linkAgency.LinkAgencyDAO;
import Midam.model.token.Token;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/linkAgency")
@CrossOrigin("http://localhost:3000")
public class LinkAgencyController {

    //지역본부 관리자가 자기 지역본부에 소속된 연계기관 리스트 조회.
    @ResponseBody
    @PostMapping(value="/readLinkAgencyList/regionManager")
    public ArrayList readLinkAgency(HttpServletRequest request) throws UnsupportedEncodingException {
        String userToken = request.getParameter("userToken");

        ArrayList result = new ArrayList();
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();

        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        result = linkAgencyDAO.readLinkAgencyInfoListRegionManager(id);

        return result;
    }

    @ResponseBody
    @PostMapping(value = "/deleteLinkAgency/regionManager")
    public HashMap deleteLinkAgency(HttpServletRequest request){
        HashMap result = new HashMap();

        String linkAgencyCode = request.getParameter("linkAgencyCode");
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();

        int[] resultRows = linkAgencyDAO.deleteLinkAgency(linkAgencyCode);

        if(resultRows[0] == 1 && resultRows[1] == 1){
            result.put("responseMsg","기관 및 소속 인원 삭제 성공.");
        }else if(resultRows[0] == 1 && resultRows[1] == 0){
            result.put("responseMsg","기관 삭제 성공");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }

    @ResponseBody
    @PostMapping(value = "/updateLinkAgency/regionManager")
    public HashMap updateLinkAgency(HttpServletRequest request){
        HashMap result = new HashMap();

        String linkAgencyCode = request.getParameter("linkAgencyCode");
        String linkAgencyName = request.getParameter("linkAgencyName");
        String linkAgencyAddress = request.getParameter("linkAgencyAddress");
        String linkAgencyInfo = request.getParameter("linkAgencyInfo");

        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();

        int resultRows = linkAgencyDAO.updateLinkAgency(linkAgencyCode, linkAgencyName, linkAgencyAddress, linkAgencyInfo);

        if(resultRows == 1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }

    //연계기관 신규등록 - 지역본부 관리자가
    @ResponseBody
    @PostMapping(value = "/createLinkAgency/regionManager")
    public HashMap createLinkAgency(HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap();

        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        String id = map.get("id").toString();

        String linkAgencyName = request.getParameter("linkAgencyName");
        String linkAgencyAddress = request.getParameter("linkAgencyAddress");
        String linkAgencyInfo = request.getParameter("linkAgencyInfo");
        LinkAgencyDAO linkAgencyDAO = new LinkAgencyDAO();

        int resultRows = linkAgencyDAO.createLinkAgency(id, linkAgencyName, linkAgencyAddress, linkAgencyInfo);

        if(resultRows == 1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }

        return result;
    }


}
