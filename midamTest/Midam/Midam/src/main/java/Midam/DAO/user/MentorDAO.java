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



    private Connection conn;
    private PreparedStatement pstmt;
    private PreparedStatement pstmt2;
    private Statement stmt;
    private ResultSet rs;
    private String sql;
    private String sql2;
        private Connection getConnection(){

            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mydb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&characterEncoding=utf8", "root", "root");

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
/*
        public int create(String id, String regionCode, String volunteerId) { // 등록
            int result =0;
            sql = "insert into mentor (id, regionCode, 1365Id) values( ?, ?, ?)";
            try {

                conn=getConnection();
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, id);
                pstmt.setString(2, regionCode);
                pstmt.setString(3, volunteerId);

                result= pstmt2.executeUpdate();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            } finally {
                closeConnection(conn);
            }
            return result;
        }
*/
}