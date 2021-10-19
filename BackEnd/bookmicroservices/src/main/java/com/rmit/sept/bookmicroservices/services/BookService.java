package com.rmit.sept.bookmicroservices.services;

import com.rmit.sept.bookmicroservices.model.Book;
import com.rmit.sept.bookmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class BookService
{
    @Autowired
    private BookRepository bookRepository;

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

    public Book getBook(Long id)
    {
        return bookRepository.getBook(id);
    }

    public void deleteBook(Long id)
    {
        bookRepository.deleteById(id);
    }

    public Collection<Book> getBooksByUsername(String username)
    {
        return bookRepository.getBooksByUsername(username);
    }

    public void changeUserDisplayName(String username, String newName)
    {
        bookRepository.changeUserDisplayName(username, newName);
    }
}
