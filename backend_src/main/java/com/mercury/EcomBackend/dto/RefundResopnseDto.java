package com.mercury.EcomBackend.dto;

//import com.mercury.EcomBackend.bean.Product;
import com.mercury.EcomBackend.bean.Refund;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RefundResopnseDto {
    private Refund refund;
    private String username;
    private String productName;
}
