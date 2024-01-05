package com.mercury.EcomBackend.service;

import com.mercury.EcomBackend.bean.User;
import com.mercury.EcomBackend.dao.OrderDao;
import com.mercury.EcomBackend.dao.OrderDetailDao;
import com.mercury.EcomBackend.dao.UserDao;
import com.mercury.EcomBackend.dto.AddressDto;
import com.mercury.EcomBackend.dto.UserInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public UserInfoDto getUserInfo(Integer id) {
        UserInfoDto userInfoDto = new UserInfoDto();
        User user = userDao.getUserById(id);
        userInfoDto.setName(user.getUsername());
        userInfoDto.setPhoneNumber(user.getPhone());

        return userInfoDto;
    }

    public AddressDto getAddress(Integer id) {
        AddressDto addressDto = new AddressDto();
        User user = userDao.getUserById(id);
        addressDto.setAddress(user.getAddress());
        addressDto.setCountry(user.getCountry());
        addressDto.setCity(user.getCity());
        addressDto.setZip(user.getZip());
        addressDto.setState(user.getState());

        return addressDto;
    }


    public void updateUserInfo(UserInfoDto userInfo, Integer id) {
        User user = userDao.getUserById(id);
//        user.setUsername(userInfo.getName());
        user.setPhone(userInfo.getPhoneNumber());

        userDao.save(user);
    }

    public void updateAddress(AddressDto address, Integer id) {
        User user = userDao.getUserById(id);
        user.setAddress(address.getAddress());
        user.setCountry(address.getCountry());
        user.setCity(address.getCity());
        user.setZip(address.getZip());
        user.setState(address.getState());

        userDao.save(user);
    }
}
