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


    public Collection<Book> getAllBooks()
    {
        return bookRepository.getAllBooks();
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


    public Collection<Book> search(String searchString, String searchType, String searchCategory)
    {
        Collection <Book> book = null;
        if(searchType.equals("Title"))
        {
            book = bookRepository.searchByTitle(searchString, searchCategory);
        }
        else if(searchType.equals("Author"))
        {
            book = bookRepository.searchByAuthor(searchString, searchCategory);
        }
        else if(searchType.equals("ISBN"))
        {
            book = bookRepository.searchByISBN(searchString, searchCategory);
        }
        else if(searchType.equals("ID"))
        {
            book = bookRepository.searchByID(searchString, searchCategory);
        }
        return book;
    }

    public Collection<Book> getPopularBooks()
    {
        return bookRepository.getPopularBooks();
    }
}
