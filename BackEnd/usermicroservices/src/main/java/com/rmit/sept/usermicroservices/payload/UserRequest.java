package com.rmit.sept.usermicroservices.payload;

import javax.validation.constraints.NotBlank;

public class UserRequest
{
    @NotBlank(message = "ID cannot be blank")
    private Long id;
    @NotBlank(message = "Username cannot be blank")
    private String username;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
