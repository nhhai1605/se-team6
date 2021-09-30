package com.rmit.sept.reviewmicroservices.payload;

import javax.validation.constraints.NotBlank;

public class ReviewRequest
{
    @NotBlank(message = "ID cannot be blank")
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
