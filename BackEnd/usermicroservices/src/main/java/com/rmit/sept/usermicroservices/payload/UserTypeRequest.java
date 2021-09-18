package com.rmit.sept.usermicroservices.payload;

import javax.validation.constraints.NotBlank;

public class UserTypeRequest {

    @NotBlank(message = "Username cannot be blank")
    private String username;
    @NotBlank(message = "userTypeRequest cannot be blank")
    private String userTypeRequest;
    private String userType;
    @NotBlank(message = "Status cannot be blank")
    private String status;

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserTypeRequest() {
        return userTypeRequest;
    }

    public void setUserTypeRequest(String userTypeRequest) {
        this.userTypeRequest = userTypeRequest;
    }
}