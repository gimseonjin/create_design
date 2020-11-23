package Midam.DAO.community;

import Midam.model.community.Message;
import Midam.model.community.Post;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class MessageDAO {
    private Connection conn=null;
    private PreparedStatement pstmt;
    SimpleDateFormat sdfDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date now =new Date();

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
    public int numberOfMessage(String id) {
        int result =0;




        // String sql = "delete from post where postId =?";
        String sql ="select count(*) from message where receiverId =? and status =0 ";
        try {


            conn=getConnection();
            pstmt= conn.prepareStatement(sql);
            pstmt.setString(1, id);  //groupId에 postId 입력

            ResultSet rs =pstmt.executeQuery();
            rs.next();
            result =rs.getInt(1);

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    public ArrayList<HashMap> getListMessage(String id){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql = "select * from message where receiverId =?";

        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1,id);
            ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {

                HashMap messageHashMap = new HashMap();

                messageHashMap.put("messageId",rs.getInt("messageId"));
                messageHashMap.put("senderId",rs.getString("senderId"));
                messageHashMap.put("title",rs.getString("title"));
                messageHashMap.put("sendDate",rs.getString("sendDate"));
                messageHashMap.put("receiveDate",rs.getString("receiveDate"));
                messageHashMap.put("status",rs.getInt("status"));




                list.add(messageHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }

    public Message readMessageInfo(int messageId){
        Message message = new Message();

        String sql = "SELECT * FROM message WHERE messageId = ? ";

        String sql_view = "update message set receiveDate = ?, status =1 where messageId=?";
        String receiveDate = sdfDate.format(now);
        try {
            conn=getConnection();

            pstmt=conn.prepareStatement(sql_view);
            pstmt.setString(1,receiveDate);
            pstmt.setInt(2,messageId);
            pstmt.executeUpdate();

            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, messageId);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()){
                message.setMessageId(rs.getInt("messageId"));
                message.setSenderId(rs.getString("senderId"));
                message.setTitle(rs.getString("title"));
                message.setContent(rs.getString("content"));
                message.setSendDate(rs.getString("sendDate"));
                message.setReceiveDate(rs.getString("receiveDate"));
            }


        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return message;
    }

    public int createMessage(String senderId,String receiverId, String title, String content) { // 수정
        int result =0;

        String sendDate = sdfDate.format(now);
        String sql = "insert into message (senderId, receiverId,title,content,sendDate)  values (?,?,?,?,?) ";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, senderId);
            pstmt.setString(2, receiverId);
            pstmt.setString(3, title);
            pstmt.setString(4, content);
            pstmt.setString(5, sendDate);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }
    public int deleteMessage(int messageId) { // 수정
        int result =0;


        String sql = "delete from message where messageId =? ";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, messageId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }

    //연계기관 문의
    public int inquiry(String receiverId, String title, String content) { // 수정
        int result =0;

        String sendDate = sdfDate.format(now);
        String sql = "insert into message (senderId, receiverId,title,content,sendDate)  values (?,?,?,?,?) ";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, "inquiry");
            pstmt.setString(2, receiverId);
            pstmt.setString(3, title);
            pstmt.setString(4, content);
            pstmt.setString(5, sendDate);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    }


}
