package com.rmit.sept.bookmicroservices.web;

import com.rmit.sept.bookmicroservices.model.Book;
import com.rmit.sept.bookmicroservices.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;


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
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book)
    {
        Book newBook = bookService.createBook(book);
        return new ResponseEntity<Book>(newBook, HttpStatus.CREATED);
    }

    @GetMapping("/getBook")
    public @ResponseBody Book getBook(@RequestParam("id") Long id)
    {
        return bookService.getBook(id);
    }

    @DeleteMapping("/deleteBook/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id)
    {
        bookService.deleteBook(id);
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }

    @GetMapping("/getBooksFromUsername")
    public @ResponseBody Collection<Book> getBooksFromUsername(@RequestParam("username") String username)
    {
        return bookService.getBooksByUsername(username);
    }
    @PutMapping("/changeUserDisplayName/{username}/{newName}")
    public ResponseEntity<?> changeUserDisplayName(@PathVariable String username, @PathVariable String newName)
    {
        bookService.changeUserDisplayName(username, newName);
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }
}