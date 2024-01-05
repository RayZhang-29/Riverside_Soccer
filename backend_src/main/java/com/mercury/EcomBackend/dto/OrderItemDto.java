package com.mercury.EcomBackend.dto;

import com.mercury.EcomBackend.bean.Product;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class OrderItemDto {
    private int orderNumber;
    private int userId;
    private Date date;
    private String status;
    private PersonalInfo personalInfo;
    private ShippingInfo shippingInfo;
    private double totalPrice;
    private List<ProductDto> products;

    @Getter
    @Setter
    @ToString
    public static class PersonalInfo {
        private String name;
        private String phone;
    }

    @Getter
    @Setter
    @ToString
    public static class ShippingInfo {
        private String country;
        private String city;
        private String state;
        private String zip;
        private String address;
    }
}
