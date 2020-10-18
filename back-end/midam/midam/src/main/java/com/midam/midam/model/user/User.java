<<<<<<< Updated upstream
package com.midam.midam.model.user;
=======
package com.midam.midam.model.user.;
>>>>>>> Stashed changes

public class User {
    String id;
    String password;
    String name;
    String gender;
    int age;
    String address;
    String phoneNumber;
    int authority;

    public User(String id, String password, String name, String gender, int age, String address, String phoneNumber, int authority) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.authority = authority;
    }

<<<<<<< Updated upstream
    public String getId() {
        return id;
=======
    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public int getAge() {
        return age;
>>>>>>> Stashed changes
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

<<<<<<< Updated upstream
=======
    public int getAuthority() {
        return authority;
    }

>>>>>>> Stashed changes
    public String getGender() {
        return gender;
    }

<<<<<<< Updated upstream
    public int getAge() {
        return age;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public int getAuthority() {
        return authority;
=======
    public String getId() {
        return id;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setAge(int age) {
        this.age = age;
>>>>>>> Stashed changes
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

<<<<<<< Updated upstream
    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setAuthority(int authority) {
        this.authority = authority;
    }
=======
    public void setAuthority(int authority) {
        this.authority = authority;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
>>>>>>> Stashed changes
}
