package Midam.model.community;


import java.util.Date;

public class Post {

    private int postId;
    private int groupId;
    private int replyOrder;
    private int replyStep;
    private String writerId;
    private String title;
    private String content;
    private String writeDate;
    private int numberOfView;
    private int bundleId;

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

    public String getWriteDate() {
        return writeDate;
    }

    public void setWriteDate(String writeDate) {
        this.writeDate = writeDate;
    }

    public int getNumberOfView() {
        return numberOfView;
    }

    public void setNumberOfView(int numberOfView) {
        this.numberOfView = numberOfView;
    }

    public int getBundleId() {
        return bundleId;
    }

    public void setBundleId(int bundleId) {
        this.bundleId = bundleId;
    }
}
