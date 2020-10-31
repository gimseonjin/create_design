package Midam.model.community;

import java.sql.Timestamp;

public class Message {
    private int messageId;
    private String senderId;
    private String receiverId;
    private String title;
    private String content;
    private java.sql.Timestamp sendDate;
    private java.sql.Timestamp receiveDate;
    private int status;

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
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

    public Timestamp getSendDate() {
        return sendDate;
    }

    public void setSendDate(Timestamp sendDate) {
        this.sendDate = sendDate;
    }

    public Timestamp getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Timestamp receiveDate) {
        this.receiveDate = receiveDate;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
