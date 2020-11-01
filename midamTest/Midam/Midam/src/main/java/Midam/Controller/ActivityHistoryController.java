package Midam.Controller;

import Midam.DAO.activity.MentoringHistoryDAO;
import Midam.DAO.user.UserDAO;
import Midam.model.activity.ActivityHistory;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import javax.servlet.Servlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
        HashMap result = new HashMap();

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getListMentor(id);
        int size = historyArrayList.size();

        for(int i = 0; i< size; i++){
            result.put("list",historyArrayList.get(i));
        }

        return historyArrayList;
    }

    @ResponseBody
    @PostMapping(value="/createReport")
    public ArrayList createReport(@RequestParam("id") String id, @RequestParam("activityHistoryCode") int activityHistoryCode) throws SQLException, ClassNotFoundException {
        HashMap result = new HashMap();

        MentoringHistoryDAO mentoringHistoryDAO = new MentoringHistoryDAO();
        ArrayList<HashMap> historyArrayList = mentoringHistoryDAO.getListMentor(id);
        int size = historyArrayList.size();

        for(int i = 0; i< size; i++){
            result.put("list",historyArrayList.get(i));
        }

        return historyArrayList;
    }

//    public int login(String id, String password){
//
//
//    }
}
