package Midam.Controller;

import Midam.DAO.activity.ApplicationDAO;
import Midam.DAO.activity.RecruitmentDAO;
import Midam.model.token.Token;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value= "/activity", method= RequestMethod.POST)
@CrossOrigin("http://localhost:3000")
public class ApplicationController {


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
}
