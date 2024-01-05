package com.mercury.EcomBackend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegisterDto {
    private String username;
    private String password;
    private Integer status;
}
