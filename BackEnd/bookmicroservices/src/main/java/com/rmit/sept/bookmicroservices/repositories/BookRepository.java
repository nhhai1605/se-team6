package com.rmit.sept.bookmicroservices.repositories;
import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface BookRepository extends  CrudRepository<Book, Long>
{
    @Query(value = "SELECT * FROM BOOK WHERE LOWER(TITLE) LIKE %?1%", nativeQuery = true)
    Collection<Book> searchBooks(String searchString);
    @Query(value="SELECT * FROM BOOK", nativeQuery = true)
    Collection<Book> getAllBooks();
    @Query(value = "SELECT * FROM BOOK WHERE LOWER(AUTHOR) LIKE %?1%", nativeQuery = true)
    Collection<Book> searchBooksByAuthor(String author);
}
