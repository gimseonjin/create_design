package Midam.DAO.community;

import Midam.model.activity.ActivityHistory;
import Midam.model.community.Post;
import com.mysql.cj.protocol.Resultset;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Date;
import java.util.HashMap;

public class PostDAO {

    //CREATE UPDATE DELETE READ GETList

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



    public ArrayList<HashMap> getListPost(){

        ArrayList<HashMap> list =new ArrayList<HashMap>();

       String sql = "select * from post where replyStep =0";

       // int start= (page -1 )*10+1;
       // int end =start+9;
        try {

             conn=getConnection();
             pstmt = conn.prepareStatement(sql);
             //  pstmt.setInt(1, start);
             //  pstmt.setInt(2, end);
             ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {
                Post post = new Post();
                HashMap postHashMap = new HashMap();

                postHashMap.put("postId",rs.getInt("postId"));
                postHashMap.put("groupId",rs.getInt("groupId"));
                postHashMap.put("writerId",rs.getString("writerId"));
                postHashMap.put("replyOrder",rs.getInt("replyOrder"));
                postHashMap.put("replyStep",rs.getInt("replyStep"));

                postHashMap.put("title",rs.getString("title"));
                postHashMap.put("writeDate",rs.getString("writeDate"));
                postHashMap.put("numberOfView",rs.getInt("numberOfView"));



                list.add(postHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //게시글 목록 조회

    public Post readPostInfo(int postId){
        Post post = new Post();
        String sql = "SELECT postId, writerId, title, content, writeDate FROM post WHERE postId = ? ;";

        try {
            conn=getConnection();
            pstmt = conn.prepareStatement(sql);

            pstmt.setInt(1, postId);
            ResultSet rs= pstmt.executeQuery();
            while(rs.next()){
                post.setPostId(rs.getInt("postId"));
                post.setWriterId(rs.getString("writerId"));
                post.setTitle(rs.getString("title"));
                post.setContent(rs.getString("content"));
                post.setWriteDate(rs.getString("writeDate"));

            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return post;
    }

    public int createPost(String writerId, String title, String content) { // 등록
        int result =0;
        String writeDate = sdfDate.format(now);
        String sql1 ="select max(postId) from post";
        int postId =0;
        String sql2 = "insert into post"+
                "(groupId,writerId,title,content,writeDate,numberOfView, replyOrder, replyStep) values(?,?,?,?,?,0,0,0)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql1);
            ResultSet rs= pstmt.executeQuery();
            rs.next();
            postId = rs.getInt(1)+1;    //자동증분 된 값

            pstmt= conn.prepareStatement(sql2);
            pstmt.setInt(1, postId);  //groupId에 postId 입력
            pstmt.setString(2, writerId);
            pstmt.setString(3, title);
            pstmt.setString(4, content);
            pstmt.setString(5, writeDate);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //게시글 작성

    public ArrayList<HashMap> getListReply(int postId){
        int groupId =postId;
        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql = "select * from post where replyStep >0 and groupId = ?";


        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, groupId);
            ResultSet rs= pstmt.executeQuery();


            while(rs.next()) {
                Post post = new Post();
                HashMap postHashMap = new HashMap();

                postHashMap.put("postId",rs.getInt("postId"));
                postHashMap.put("groupId",rs.getInt("groupId"));
                postHashMap.put("writerId",rs.getString("writerId"));
                postHashMap.put("replyOrder",rs.getInt("replyOrder"));
                postHashMap.put("replyStep",rs.getInt("replyStep"));
                postHashMap.put("title",rs.getString("title"));
                postHashMap.put("content",rs.getString("content"));
                postHashMap.put("writeDate",rs.getString("writeDate"));
                postHashMap.put("numberOfView",rs.getInt("numberOfView"));

                list.add(postHashMap);
            }
        }catch(Exception e) {
            e.printStackTrace();

        }finally {
            closeConnection(conn);
        }
        return list;
    }      //게시글 목록 조회

    public int createReply(String id,String content, int postId) { // 등록
        int result =0;
        int groupId =postId;
        String writeDate = sdfDate.format(now);
        String sql1 ="select max(replyOrder) from post where groupId =?";

        String sql2 = "insert into post"+
                "(writerId,title,content,writeDate,replyOrder,replyStep,groupId) values(?,?,?,?,?,1,?)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql1);
            pstmt.setInt(1, groupId);
            ResultSet rs= pstmt.executeQuery();
            rs.next();
            int replyOrder = rs.getInt(1)+1;    //자동증분 된 값
            String title="RE: 댓글";
            pstmt= conn.prepareStatement(sql2);
            pstmt.setString(1, id);  //groupId에 postId 입력
            pstmt.setString(2, title);
            pstmt.setString(3, content);
            pstmt.setString(4, writeDate);
            pstmt.setInt(5, replyOrder);
            pstmt.setInt(6, groupId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //게시글 작성

}