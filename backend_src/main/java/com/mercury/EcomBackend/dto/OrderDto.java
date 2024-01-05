package com.mercury.EcomBackend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString
public class OrderDto {
    private UserToken userToken;
    private PersonalInfo personalInfo;
    private ShippingInfo shippingInfo;
    private BillingInfo billingInfo;
    private List<CartItemDto> cartItems;

    @Getter
    @Setter
    @ToString
    public static class UserToken {
//        private
        private String token;
    }

    @Getter
    @Setter
    @ToString
    public static class PersonalInfo {
        private String name;
        private String phoneNumber;
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

    @Getter
    @Setter
    @ToString
    public static class BillingInfo {
        private String country;
        private String city;
        private String state;
        private String zip;
        private String address;
    }

    @Getter
    @Setter
    @ToString
    public static class CartItemDto {
        private int id;
        private String name;
        private BigDecimal price;
        private String image;
        private Integer quantity;
        private String size;
    }
}
