package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.dto.AddressDto;
import com.mercury.EcomBackend.dto.UserInfoDto;
import com.mercury.EcomBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user-info/{userId}")
    public UserInfoDto getUserInfo(@PathVariable Integer userId) {
        return userService.getUserInfo(userId);
    }

    @GetMapping("/address/{userId}")
    public AddressDto getAddress(@PathVariable Integer userId) {
        return userService.getAddress(userId);
    }

    @PutMapping("/user-info/{userId}")
    public void updateUserInfo(@RequestBody UserInfoDto userInfo, @PathVariable Integer userId) {
        userService.updateUserInfo(userInfo, userId);
    }

    @PutMapping("/address/{userId}")
    public void updateAddress(@RequestBody AddressDto address, @PathVariable Integer userId) {
        userService.updateAddress(address, userId);
    }
}
