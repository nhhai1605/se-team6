package com.rmit.sept.bookmicroservices.model;

import javax.persistence.*;
import java.util.Date;
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private int quantity;
    private int isShareBook;
    private int price;
    private Date postDate;
    private float rate;
    private String username;
    private String displayName;
    private String description;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Book()
    {
    }
    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    public int getIsShareBook() {
        return isShareBook;
    }

    public void setIsShareBook(int isShareBook) {
        this.isShareBook = isShareBook;
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

    public int isShareBook() {
        return isShareBook;
    }

    public int getPrice() {
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

    public void setShareBook(int shareBook) {
        isShareBook = shareBook;
    }

    public void setPrice(int price) {
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