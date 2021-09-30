package com.rmit.sept.reviewmicroservices.repositories;
import com.rmit.sept.reviewmicroservices.model.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import java.util.Collection;
@Repository
public interface ReviewRepository extends  CrudRepository<Review, Long>
{

    @Query(value = "SELECT * FROM REVIEW WHERE BOOK_ID = ?1", nativeQuery = true)
    Collection<Review> getReviewsForBook(Long bookId);
}