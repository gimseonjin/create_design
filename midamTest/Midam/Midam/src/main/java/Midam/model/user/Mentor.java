package Midam.model.user;

public class Mentor extends User{
    String regionCode;
    String volunteerId;

    public Mentor(String id, String password, String name, String gender, int age, String address, String phoneNumber, int authority, String regionCode, String volunteerId) {
        super(id, password, name, gender, age, address, phoneNumber, authority);

        this.regionCode = regionCode;
        this.volunteerId = volunteerId;
    }


    public String getRegionCode() {
        return regionCode;
    }

    public void setRegionCode(String regionCode) {
        this.regionCode = regionCode;
    }

    public String getVolunteerId() {
        return volunteerId;
    }

    public void setVolunteerId(String volunteerId) {
        this.volunteerId = volunteerId;
    }
}
