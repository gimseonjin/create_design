package com.midam.midam.DAO.user;
import com.midam.midam.model.user.LinkAgencyManager;
import com.midam.midam.model.user.User;

import java.sql.*;

public class LinkAgencyDAO {UserDAO userDAO = new UserDAO();

    private Connection conn;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;

    public String create(LinkAgencyManager linkAgencyManager) { // 등록
        sql = "insert into LinkAgencyManager(id, linkAgencyCode) values(?, ?)";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb?useSSL=false", "root", "emm05235");
            System.out.println(conn);

            User user = new User(linkAgencyManager.getId(), linkAgencyManager.getPassword(), linkAgencyManager.getName(),
                    linkAgencyManager.getGender(), linkAgencyManager.getAge(), linkAgencyManager.getAddress(),
                    linkAgencyManager.getPhoneNumber(), linkAgencyManager.getAuthority());
            String userInsert = userDAO.create(user);
            System.out.println(userInsert);
            if (userInsert == "true") {
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, linkAgencyManager.getId());
                pstmt.setString(2, linkAgencyManager.getLinkAgencyCode());
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