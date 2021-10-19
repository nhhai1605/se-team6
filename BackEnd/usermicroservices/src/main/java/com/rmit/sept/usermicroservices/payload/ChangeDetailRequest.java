package com.rmit.sept.usermicroservices.payload;

import javax.validation.constraints.NotBlank;

public class ChangeDetailRequest {

    @NotBlank(message = "Username cannot be blank")
    private String username;
    @NotBlank(message = "Password cannot be blank")
    private String fullName;
    @NotBlank(message = "Password cannot be blank")
    private String displayName;
    @NotBlank(message = "userType cannot be blank")
    private String userType;
    @NotBlank(message = "userTypeRequest cannot be blank")
    private String userTypeRequest;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUserTypeRequest() {
        return userTypeRequest;
    }

    public void setUserTypeRequest(String userTypeRequest) {
        this.userTypeRequest = userTypeRequest;
    }
}