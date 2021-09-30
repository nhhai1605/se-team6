package com.rmit.sept.reviewmicroservices.web;

import com.rmit.sept.reviewmicroservices.model.Review;
import com.rmit.sept.reviewmicroservices.payload.ReviewRequest;
import com.rmit.sept.reviewmicroservices.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<?> createReview(@Valid @RequestBody Review review)
    {
        Review newReview = reviewService.createReview(review);
        return new ResponseEntity<Review>(newReview, HttpStatus.CREATED);
    }

    @GetMapping("/getReviewsForBook")
    public @ResponseBody Collection<Review> getReviewsForBook(@RequestParam("bookId") Long bookId)
    {
        return reviewService.getReviewsForBook(bookId);
    }

    @PostMapping("/deleteReview")
    public ResponseEntity<?> deleteReview(@RequestBody ReviewRequest request)
    {
        reviewService.deleteReview(request.getId());
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }
}