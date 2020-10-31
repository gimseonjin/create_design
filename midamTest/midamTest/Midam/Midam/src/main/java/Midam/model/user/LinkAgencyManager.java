package Midam.model.user;

public class LinkAgencyManager extends User{
    String linkAgencyCode;

    public LinkAgencyManager(String id, String password, String name, String gender, int age, String address, String phoneNumber, int authority, String linkAgencyCode) {
        super(id, password, name, gender, age, address, phoneNumber, authority);
        this.linkAgencyCode = linkAgencyCode;
    }

    public String getLinkAgencyCode() {
        return linkAgencyCode;
    }

    public void setLinkAgencyCode(String linkAgencyCode) {
        this.linkAgencyCode = linkAgencyCode;
    }
}
