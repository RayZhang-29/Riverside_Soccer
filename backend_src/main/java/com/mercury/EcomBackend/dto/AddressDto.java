package com.mercury.EcomBackend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AddressDto {
    private String country;
    private String city;
    private String state;
    private String zip;
    private String address;
}
