package com.rmit.sept.reviewmicroservices.services;

import com.rmit.sept.reviewmicroservices.model.Review;
import com.rmit.sept.reviewmicroservices.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class ReviewService
{
    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(Review review)
    {
        return reviewRepository.save(review);
    }

    public Collection<Review> getReviewsForBook(Long bookId)
    {
        return reviewRepository.getReviewsForBook(bookId);
    }

    public void deleteReview(Long id)
    {
        reviewRepository.deleteById(id);
    }
}
