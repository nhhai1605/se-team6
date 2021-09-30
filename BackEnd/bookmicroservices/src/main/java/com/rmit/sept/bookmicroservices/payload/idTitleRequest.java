package com.rmit.sept.bookmicroservices.payload;

import javax.validation.constraints.NotBlank;

public class idTitleRequest
{
    @NotBlank(message = "ID cannot be blank")
    private Long id;
    @NotBlank(message = "Title cannot be blank")
    private String title;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
