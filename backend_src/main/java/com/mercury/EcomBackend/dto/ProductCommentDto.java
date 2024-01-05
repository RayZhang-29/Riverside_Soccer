package com.mercury.EcomBackend.dto;

import com.mercury.EcomBackend.bean.Comment;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductCommentDto {
    private Comment comment;
    private String username;
}
