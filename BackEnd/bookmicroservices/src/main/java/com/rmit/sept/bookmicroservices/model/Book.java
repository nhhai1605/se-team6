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
    private int quality;
    private int isShareBook;
    private int price;
    private Date postDate;
    private float rate;

    public Book()
    {
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

    public int getQuality() {
        return quality;
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

    public void setQuality(int quality) {
        this.quality = quality;
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