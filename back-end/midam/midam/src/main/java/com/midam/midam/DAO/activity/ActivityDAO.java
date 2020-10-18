package com.midam.midam.DAO.activity;

import com.midam.midam.model.activity.

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class ActivityDAO {


    private Connection conn=null;
    private PreparedStatement pstmt;
    private Statement stmt;
    private ResultSet rs;
    private String sql;

    private Connection getConnection(){
        String url= "jdbc:mysql://localhost:3306/mydb?useSSL=false";
        String admin ="root";
        String password="emm05235";
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url, admin, password);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }

    private void closeConnection(Connection conn) {
        if (pstmt != null) {
            try {
                pstmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if(conn!=null) {
            try {
                conn.close();
            }catch(SQLException e) {}
        }
    }

    public boolean create(MentorRecruitment mentorRecruitment) { // 등록
        sql = "insert into midam.user(id, password, name, gender,age,address, authority) values(?, ?, ?, ?, ?, ?, ?)";
        try {


            conn= getConnection();
            pstmt = conn.prepareStatement(sql);

            int r = pstmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return false;
    }            //회원가입

}
