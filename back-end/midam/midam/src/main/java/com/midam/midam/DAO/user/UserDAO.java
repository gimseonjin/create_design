package com.example.midam.DAO;

import com.example.midam.vo.user.User;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDAO {

    private Connection conn;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;

    public String creat(User user) { // 등록
        sql = "insert into user(id, password, name, gender, authority) values(?, ?, ?, ?, ?)";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb?useSSL=false", "root", "emm05235");
            System.out.println(conn);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, user.getId());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setString(4, user.getGender());
            pstmt.setInt(5, user.getAuthority());
            int r = pstmt.executeUpdate();
            return "true";
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
        return "false";
    }
}