package Midam.DAO.user;

import Midam.model.user.Mentor;
import Midam.model.user.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class MentorDAO {

    UserDAO userDAO = new UserDAO();

    private Connection conn;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;

    public MentorDAO() throws SQLException, ClassNotFoundException {
    }

    public String create(Mentor mentor) { // 등록
        sql = "insert into mentor(id, regionCode, 1365Id) values(?, ?, ?)";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb?useSSL=false", "root", "emm05235");
            System.out.println(conn);

            User user = new User(mentor.getId(), mentor.getPassword(), mentor.getName(), mentor.getGender(), mentor.getAge(), mentor.getAddress(), mentor.getPhoneNumber(), mentor.getAuthority());
            String userInsert = userDAO.create(user);
            System.out.println(userInsert);
            if (userInsert == "true") {
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, mentor.getId());
                pstmt.setString(2, mentor.getRegionCode());
                pstmt.setString(3, mentor.getVolunteerId());
                int r = pstmt.executeUpdate();
                return "true";
            } else
                return "false1";
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        } finally { // 사용순서와 반대로 close 함
            if (pstmt != null) {
                try {
                    pstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
        return "false2";
    }
}