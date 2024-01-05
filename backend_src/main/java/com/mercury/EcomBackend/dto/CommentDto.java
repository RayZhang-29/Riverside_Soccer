package com.mercury.EcomBackend.dto;

import com.mercury.EcomBackend.bean.Comment;
import com.mercury.EcomBackend.bean.Product;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CommentDto {
    private Integer itemId;
    private RateData rateData;
    private Integer userId;

    @ToString
    @Getter
    @Setter
    public static class RateData {
        private String contents;
        private Integer rating;
    }
}
