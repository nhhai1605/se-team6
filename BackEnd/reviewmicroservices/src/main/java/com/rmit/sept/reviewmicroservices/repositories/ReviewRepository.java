package com.rmit.sept.reviewmicroservices.repositories;
import com.rmit.sept.reviewmicroservices.model.Review;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
@Repository
public interface ReviewRepository extends  CrudRepository<Review, Long>
{

    @Query(value = "SELECT * FROM REVIEW WHERE BOOK_ID = ?1", nativeQuery = true)
    Collection<Review> getReviewsForBook(Long bookId);

    @Modifying
    @Transactional
    @Query(value="UPDATE REVIEW SET DISPLAY_NAME = ?2 WHERE USERNAME=?1", nativeQuery = true)
    void changeUserDisplayName(String username, String newName);
}