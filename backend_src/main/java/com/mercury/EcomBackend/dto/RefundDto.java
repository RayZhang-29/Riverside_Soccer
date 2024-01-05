package com.mercury.EcomBackend.dto;

import com.mercury.EcomBackend.bean.Product;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RefundDto {
    private OrderItemDto orderItemDto;
    private ProductDto productDto;
}
