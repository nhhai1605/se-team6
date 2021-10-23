package com.rmit.sept.bookmicroservices.repositories;
import com.rmit.sept.bookmicroservices.model.Book;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Repository
public interface BookRepository extends  CrudRepository<Book, Long>
{

    @Query(value="SELECT * FROM BOOK ORDER BY POSTDATE DESC", nativeQuery = true)
    Collection<Book> getAllBooks();

    @Query(value = "SELECT * FROM BOOK WHERE ID = ?1 ", nativeQuery = true)
    Book getBook(Long id);
    @Query(value = "SELECT * FROM BOOK WHERE USERNAME=?1", nativeQuery = true)
    Collection<Book> getBooksByUsername(String username);
    @Modifying
    @Transactional
    @Query(value="UPDATE BOOK SET DISPLAYNAME = ?2 WHERE USERNAME=?1", nativeQuery = true)
    void changeUserDisplayName(String username, String newName);

    @Query(value = "SELECT * FROM BOOK WHERE LOWER(TITLE) LIKE %?1% AND CATEGORY LIKE %?2%", nativeQuery = true)
    Collection<Book> searchByTitle(String searchString, String searchCategory);
    @Query(value = "SELECT * FROM BOOK WHERE LOWER(AUTHOR) LIKE %?1% AND CATEGORY LIKE %?2%", nativeQuery = true)
    Collection<Book> searchByAuthor(String searchString, String searchCategory);
    @Query(value = "SELECT * FROM BOOK WHERE LOWER(ISBN) LIKE %?1% AND CATEGORY LIKE %?2%", nativeQuery = true)
    Collection<Book> searchByISBN(String searchString, String searchCategory);
    @Query(value = "SELECT * FROM BOOK WHERE LOWER(ID) = ?1 AND CATEGORY LIKE %?2%", nativeQuery = true)
    Collection<Book> searchByID(String searchString, String searchCategory);

    @Query(value = "SELECT * FROM BOOK ORDER BY RATE DESC LIMIT 10", nativeQuery = true)
    Collection<Book> getPopularBooks();
}
