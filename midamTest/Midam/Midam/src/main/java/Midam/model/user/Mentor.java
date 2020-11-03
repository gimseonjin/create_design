package Midam.model.user;

public class Mentor extends User{
    String id;
    String regionCode;
    String volunteerId;

    public Mentor(String id, String regionCode, String volunteerId) {
       // super(id, password, name, gender, age, address, phoneNumber, authority);
        this.id= id;
        this.regionCode = regionCode;
        this.volunteerId = volunteerId;
    }


    public String getId() {
        return id;
    }


    public void setId(String id) {
        this.id = id;
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
