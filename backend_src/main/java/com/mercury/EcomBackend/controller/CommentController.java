package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.bean.Comment;
import com.mercury.EcomBackend.dto.CommentDto;
import com.mercury.EcomBackend.dto.ProductCommentDto;
import com.mercury.EcomBackend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/rating")
    public ResponseEntity<Comment> saveComment(@RequestBody CommentDto commentDto) {
        System.out.println(commentDto.toString());
        Comment savedComment = commentService.saveComment(commentDto);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @GetMapping("/rating/product/{productId}")
    public ResponseEntity<Double> getRatingByProductId(@PathVariable Integer productId) {
        Double averageRating = commentService.getAverageRating(productId);
        return new ResponseEntity<>(averageRating, HttpStatus.OK);
    }

    @GetMapping("/comment/product/{productId}")
    public ResponseEntity<List<ProductCommentDto>> getCommentsByProductId(@PathVariable Integer productId) {
        List<ProductCommentDto> comments = commentService.findCommentsByProductId(productId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

}
