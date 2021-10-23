package com.rmit.sept.reviewmicroservices.web;

import com.rmit.sept.reviewmicroservices.model.Review;
import com.rmit.sept.reviewmicroservices.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;


@RestController
@CrossOrigin(origins = { "http://sept-team6.us-east-1.elasticbeanstalk.com", "http://localhost" })
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/create")
    public ResponseEntity<?> createReview(@Valid @RequestBody Review review)
    {
        Review newReview = reviewService.createReview(review);
        reviewService.updateRate(newReview);
        return new ResponseEntity<Review>(newReview, HttpStatus.CREATED);
    }

    @GetMapping("/getReviewsForBook")
    public @ResponseBody Collection<Review> getReviewsForBook(@RequestParam("bookId") Long bookId)
    {
        return reviewService.getReviewsForBook(bookId);
    }

    @DeleteMapping("/deleteReview/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id)
    {
        reviewService.deleteReview(id);
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }

    @PutMapping("/changeUserDisplayName/{username}/{newName}")
    public ResponseEntity<?> changeUserDisplayName(@PathVariable String username, @PathVariable String newName)
    {
        reviewService.changeUserDisplayName(username, newName);
        return new ResponseEntity<>("OK", HttpStatus.CREATED);
    }
}