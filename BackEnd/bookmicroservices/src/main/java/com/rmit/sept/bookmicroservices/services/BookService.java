package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.model.Book;
import com.rmit.sept.bookmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class BookService
{
    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book newBook)
    {
        return null;
    }

    public Collection<Book> searchBooks(String searchString)
    {
        return bookRepository.searchBooks(searchString);
    }

    public Collection<Book> getAllBooks()
    {
        return bookRepository.getAllBooks();
    }

    public Collection<Book> searchBooksByAuthor(String author)
    {
        return bookRepository.searchBooksByAuthor(author);
    }

    public Book createBook(Book newBook)
    {
        return bookRepository.save(newBook);
    }
}
