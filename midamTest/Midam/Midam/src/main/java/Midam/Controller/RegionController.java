package Midam.Controller;

import Midam.DAO.region.RegionDAO;
import Midam.model.token.Token;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/region")
@CrossOrigin("http://localhost:3000")
public class RegionController {

    @ResponseBody
    @PostMapping(value = "/readRegionList/systemManager")
    public ArrayList readRegion(HttpServletRequest request) throws UnsupportedEncodingException {
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        int authority = (Integer)map.get("authority");
        ArrayList result = new ArrayList();
        if(authority!=4){
            result.add("권한없음");
            return result;
        }

        RegionDAO regionDAO = new RegionDAO();

        result = regionDAO.readRegionList();

        return result;
    }

    @ResponseBody
    @PostMapping(value = "/updateRegion/systemManager")
    public HashMap updateRegion(HttpServletRequest request) throws UnsupportedEncodingException {
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        int authority = (Integer)map.get("authority");
        HashMap result = new HashMap();
        if(authority!=4){
            result.put("responseMsg","권한없음");
            return result;
        }
        String regionCode = request.getParameter("regionCode");
        String regionName = request.getParameter("regionName");
        String regionAddress = request.getParameter("regionAddress");

        RegionDAO regionDAO = new RegionDAO();

        int resultRows = regionDAO.updateRegion(regionCode, regionName, regionAddress);
        if(resultRows==1){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }
        return result;
    }

    //지역본부 삭제
    @ResponseBody
    @PostMapping(value = "/deleteRegion/systemManager")
    public HashMap deleteRegion(HttpServletRequest request) throws UnsupportedEncodingException {
        String userToken = request.getParameter("userToken");
        Token token = new Token();
        Map<String, Object> map = token.verifyJWTAll(userToken).get("data", HashMap.class);
        int authority = (Integer)map.get("authority");
        HashMap result = new HashMap();
        if(authority!=4){
            result.put("responseMsg","권한없음");
            return result;
        }
        String regionCode = request.getParameter("regionCode");

        RegionDAO regionDAO = new RegionDAO();

        int[] resultRows = regionDAO.deleteRegion(regionCode);
        if(resultRows[0]==1 && resultRows[1]!=0 && resultRows[2]!=0){
            result.put("responseMsg","성공");
        }else{
            result.put("responseMsg","실패");
        }
        return result;
    }
}
