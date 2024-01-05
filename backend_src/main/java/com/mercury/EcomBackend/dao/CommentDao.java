package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao extends JpaRepository<Comment, Integer> {
    List<Comment> getCommentsByProductId(Integer id);
}
