package Midam.DAO.community;



import Midam.model.community.Post;

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
        String sql_view = "update post set numberOfView =numberOfView+1 where postId=?";
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
            pstmt=conn.prepareStatement(sql_view);
            pstmt.setInt(1,postId);
            pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return post;
    }

    public int createPost(String id, String title, String content) { // 등록
        int result =0;
        String writeDate = sdfDate.format(now);
        String sql1 ="select max(postId) from post";
        int postId =0;
        String sql2 = "insert into post"+
                "(postId,groupId,writerId,title,content,writeDate,numberOfView, replyOrder, replyStep) values(?,?,?,?,?,?,0,0,0)";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql1);
            ResultSet rs= pstmt.executeQuery();
            rs.next();
            postId = rs.getInt(1);

            pstmt= conn.prepareStatement(sql2);
            pstmt.setInt(1, postId+1);
            pstmt.setInt(2, postId+1);  //groupId에 postId 입력
            pstmt.setString(3, id);
            pstmt.setString(4, title);
            pstmt.setString(5, content);
            pstmt.setString(6, writeDate);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //게시글 작성
    public int updatePost(int postId, String title, String content) { // 수정
        int result =0;


        String sql = "update post set title= ? , content= ? where postId =?";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, title);
            pstmt.setString(2, content);
            pstmt.setInt(3, postId);


            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //게시글 수정

    public int deletePost(int postId) { // 수정
        int result =0;


        String sql = "delete from post where groupId =? ";
        try {

            conn=getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, postId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //게시글 삭제
    
    public ArrayList<HashMap> getListReply(int postId){
        int groupId =postId;
        ArrayList<HashMap> list =new ArrayList<HashMap>();

        String sql = "select * from post where replyStep >0 and groupId = ? ORDER BY bundleId, replyOrder";


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
                postHashMap.put("bundleId",rs.getInt("bundleId"));

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
        String sql_group= "select groupId from post where postId =?";
        String sql_order= "select replyOrder from post where postId =?";
        String sql_maxOrder="select max(replyOrder) from post where bundleId =? and replyStep= ? and groupId= ?";
        String sql_step= "select replyStep from post where postId =?";
        String sql_bundle= "select bundleId from post where postId= ?";
        String sql_bundle2;
        String sql_update ="update post set replyOrder = replyOrder +1 where bundleId=? and replyOrder >= ?";
        String writeDate = sdfDate.format(now);
        String sql_title="select title from post where postId =?";

        String sql = "insert into post"+
                "(writerId,title,content,writeDate,replyOrder,replyStep,groupId,bundleId) values(?,?,?,?,?,?,?,?)";
        try {

            conn=getConnection();

            pstmt=conn.prepareStatement(sql_group);
            pstmt.setInt(1,postId);
            ResultSet rs= pstmt.executeQuery();
            rs.next();
            int groupId =rs.getInt(1);  //게시물의 groupId

            pstmt=conn.prepareStatement(sql_bundle);
            pstmt.setInt(1,postId);
            rs= pstmt.executeQuery();
            rs.next();
            int bundleId =rs.getInt(1); //대댓글 등록시
            int replyOrder;
            String replyTitle="";

            pstmt=conn.prepareStatement(sql_step);
            pstmt.setInt(1,postId);
            rs= pstmt.executeQuery();
            rs.next();
            int replyStep =rs.getInt(1);

            pstmt=conn.prepareStatement(sql_order);
            pstmt.setInt(1,postId);
            rs= pstmt.executeQuery();
            rs.next();
            int order =rs.getInt(1)+1;


            pstmt=conn.prepareStatement(sql_maxOrder);
            pstmt.setInt(1,bundleId);
            pstmt.setInt(2,replyStep+1);
            pstmt.setInt(3,groupId);
            rs= pstmt.executeQuery();
            rs.next();
            int maxOrder =rs.getInt(1)+1;

            if(order>=maxOrder){
                    replyOrder = order;
            }else{
                    replyOrder =maxOrder;
            }

            if(bundleId ==0){ //게시글에 댓글등록시
                sql_bundle2= "select max(bundleId) from post where groupId =?";
                pstmt=conn.prepareStatement(sql_bundle2);
                pstmt.setInt(1,groupId);
                rs=pstmt.executeQuery();
                rs.next();
                bundleId = rs.getInt(1)+1; //댓글 bundleId 설정



            }else{ //게시글 대댓글 작성시




                pstmt=conn.prepareStatement(sql_update);
                pstmt.setInt(1,bundleId);
                pstmt.setInt(2,replyOrder);
                pstmt.executeUpdate();


                pstmt=conn.prepareStatement(sql_title);
                pstmt.setInt(1,postId);
                rs= pstmt.executeQuery();
                rs.next();
                String title =rs.getString(1);
                String add="RE:";
                replyTitle =  add.concat(title);
            }


            pstmt= conn.prepareStatement(sql);
            pstmt.setString(1, id);  //groupId에 postId 입력
            pstmt.setString(2, replyTitle);
            pstmt.setString(3, content);
            pstmt.setString(4, writeDate);
            pstmt.setInt(5, replyOrder);
            pstmt.setInt(6, replyStep+1);
            pstmt.setInt(7, groupId);
            pstmt.setInt(8, bundleId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //댓글 등록


    public int deleteReply(int postId) {
        int result =0;




       // String sql = "delete from post where postId =?";
        String sql_delete ="update post set content= ? where postId =? ";
        try {


            String content ="삭제된 댓글입니다.";

            conn=getConnection();
            pstmt= conn.prepareStatement(sql_delete);
            pstmt.setString(1, content);  //groupId에 postId 입력
            pstmt.setInt(2,postId);
            result = pstmt.executeUpdate();

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } finally {
            closeConnection(conn);
        }
        return result;
    } //댓글 삭제




}