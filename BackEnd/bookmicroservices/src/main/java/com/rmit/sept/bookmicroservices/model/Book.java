package com.rmit.sept.bookmicroservices.model;

import javax.persistence.*;
import java.util.Date;
@Entity
@Table(name ="BOOK")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private int quantity;
    private String type;
    private String isbn;
    private String category;
    private float price;
    private Date postDate;
    private float rate;
    private String username;
    private String description;
    private String displayName;

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Book()
    {
    }
    @PrePersist
    protected void onCreate(){
        this.postDate = new Date();
    }
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String poster) {
        this.username = poster;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }
    public String getTitle()
    {
        return this.title;
    }

    public Long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public int getQuantity() {
        return quantity;
    }


    public float getPrice() {
        return price;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }

    public float getRate() {
        return rate;
    }

}