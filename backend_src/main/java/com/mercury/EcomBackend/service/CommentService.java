package com.mercury.EcomBackend.service;

import com.mercury.EcomBackend.bean.Comment;
import com.mercury.EcomBackend.bean.Product;
import com.mercury.EcomBackend.dao.CommentDao;
import com.mercury.EcomBackend.dao.ProductDao;
import com.mercury.EcomBackend.dao.UserDao;
import com.mercury.EcomBackend.dto.CommentDto;
import com.mercury.EcomBackend.dto.ProductCommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {
    @Autowired
    private CommentDao commentDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;

    public Comment saveComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setProductId(commentDto.getItemId());
        comment.setUserId(commentDto.getUserId());
        comment.setContents(commentDto.getRateData().getContents());
        comment.setRating(commentDto.getRateData().getRating());
        comment.setCommentTime(new Date());
        System.out.println(comment.toString());
        return commentDao.save(comment);
    }

    public List<Comment> getAllComments() {
        return commentDao.findAll();
    }

    public Double getAverageRating(int productId) {
        List<ProductCommentDto> productCommentDtos = findCommentsByProductId(productId);
        Double res = 0D;
        Integer sum = 0, length = 0;
        for (ProductCommentDto productCommentDto: productCommentDtos) {
            sum += productCommentDto.getComment().getRating();
            length ++ ;
        }
        res = Double.valueOf(sum / length);
        return res;
    }

    public List<ProductCommentDto> findCommentsByProductId(Integer id) {
        List<Comment> comments = commentDao.getCommentsByProductId(id);
        List<ProductCommentDto> productCommentDtos = comments.stream().map(
                comment -> {
                    ProductCommentDto productCommentDto = new ProductCommentDto();
                    productCommentDto.setComment(comment);
                    productCommentDto.setUsername(userDao.getUserById(comment.getUserId()).getUsername());
                    return productCommentDto;
                })
                .collect(Collectors.toList());
        return productCommentDtos;
    }
}
