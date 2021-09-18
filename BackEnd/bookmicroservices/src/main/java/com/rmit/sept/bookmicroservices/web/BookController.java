package com.rmit.sept.bookmicroservices.web;

import com.rmit.sept.bookmicroservices.model.Book;
import com.rmit.sept.bookmicroservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Locale;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @GetMapping("/all")
    public @ResponseBody Collection<Book> getAllBooks()
    {
        Collection<Book> books = bookService.getAllBooks();
        return books;
    }

    @GetMapping("/search")
    public @ResponseBody Collection<Book> searchBooks(@RequestParam("searchString") String searchString)
    {
        searchString = searchString.toLowerCase();
        return bookService.searchBooks(searchString);
    }

    @GetMapping("/searchByAuthor")
    public @ResponseBody Collection<Book> searchBooksByAuthor(@RequestParam("searchString") String searchString)
    {
        searchString = searchString.toLowerCase();
        return bookService.searchBooksByAuthor(searchString);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createBook(@RequestBody Book book)
    {
        Book newBook = bookService.createBook(book);
        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

}