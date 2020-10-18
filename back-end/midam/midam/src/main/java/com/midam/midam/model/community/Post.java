package com.midam.midam.model.community;

import java.sql.Timestamp;

public class Post {

    private int postId;
    private int groupId;
    private int replyOrder;
    private int replyStep;
    private String writerId;
    private String title;
    private String content;
    private java.sql.Timestamp writeDate;
    private int numberOfView;

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public int getReplyOrder() {
        return replyOrder;
    }

    public void setReplyOrder(int replyOrder) {
        this.replyOrder = replyOrder;
    }

    public int getReplyStep() {
        return replyStep;
    }

    public void setReplyStep(int replyStep) {
        this.replyStep = replyStep;
    }

    public String getWriterId() {
        return writerId;
    }

    public void setWriterId(String writerId) {
        this.writerId = writerId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(Timestamp writeDate) {
        this.writeDate = writeDate;
    }

    public int getNumberOfView() {
        return numberOfView;
    }

    public void setNumberOfView(int numberOfView) {
        this.numberOfView = numberOfView;
    }
}
