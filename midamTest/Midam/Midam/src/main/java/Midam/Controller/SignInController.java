package Midam.Controller;
import org.springframework.stereotype.Controller;
import Midam.DAO.user.UserDAO;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

@Controller
@RequestMapping(value= "/user", method=RequestMethod.POST)
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
        int authority = Integer.parseInt(request.getParameter("authority"));

        String regionCode = request.getParameter("regionCode");
        String volunteerId = request.getParameter("volunteerId");

        UserDAO userDAO = new UserDAO();

        int createResult = userDAO.createMentor(id,password,name,gender,age,address,phoneNumber,authority, regionCode, volunteerId);
        result.put("responseMsg",createResult);
        return result;
    }

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
        int authority = Integer.parseInt(request.getParameter("authority"));

        String linkAgencyCode = request.getParameter("linkAgencyCode");
    
        
        //수기 등록
        String linkAgencyName = request.getParameter("linkAgencyName");
        String linkAgencyAddress = request.getParameter("linkAgencyAddress");
        String linkAgencyInfo = request.getParameter("linkAgencyInfo");
        UserDAO userDAO = new UserDAO();

        int createResult = userDAO.createLinkAgencyManager(id,password,name,gender,age,address,phoneNumber,
                authority, linkAgencyCode ,linkAgencyName, linkAgencyAddress, linkAgencyInfo);
        result.put("responseMsg",createResult);
        return result;
    }

}
