package Midam.DAO.user;

import Midam.model.user.User;

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

    public UserDAO() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/mydb?useUnicode=true&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC&characterEncoding=utf8", "root", "root");


    }
    
//    로그인기능, id로 조회하여 password, 권한 일치여부 검사 후 권한반환
    public int readLogin(String id, String password, int reqAuthority) {
        try {
            sql = "select password, authority from user where id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs = pstmt.executeQuery();
            if(rs.next()) {
                //rs.next()로 rs 조회 결과가 있는지 판단. 없을시 else로
                if(rs.getInt(2)!=reqAuthority){ 
                    //원하는 로그인 권한과 일치하는지 검사
                    return -1;
                }
                else if (rs.getString(1).equals(password)) {
                    //비밀번호 일치여부 검사 후 권한을 반환
                    return rs.getInt(2);
                } else if (!rs.getString(1).equals(password)) {
                    //비밀번호 불일치시
                    return -1;
                } 
            }else {// rs가 null일때
                return -2;
            }
            
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
       return -3;
    }

    //회원정보조회. 사용자 권한에 따라 세부적인 부분 필요.
    public User getUserInfo(String id){
        try {
            sql = "select * from user where id=?";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            rs = pstmt.executeQuery();
            User user;
            if(rs.next()){
                user = new User(rs.getString(1), rs.getString(2),rs.getString(3),rs.getString(4),rs.getInt(5),rs.getString(6),rs.getString(7),rs.getInt(8));
                return user;
            }
            else
                return null;



        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        return null;
    }

    public String create(User user) { // 등록
        sql = "insert into user(id, password, name, gender, authority) values(?, ?, ?, ?, ?)";
        try {
           System.out.println(conn);

            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, user.getId());
            pstmt.setString(2, user.getPassword());
            pstmt.setString(3, user.getName());
            pstmt.setString(4, user.getGender());
            pstmt.setInt(5, user.getAuthority());
            int r = pstmt.executeUpdate();
            return "true";
        } catch (SQLException e) {
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