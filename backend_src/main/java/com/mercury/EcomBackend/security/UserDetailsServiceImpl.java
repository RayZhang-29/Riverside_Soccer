package com.mercury.EcomBackend.security;

import com.mercury.EcomBackend.bean.User;
import com.mercury.EcomBackend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;




@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserDao userDao;

    @Override
    public MyUserDetails loadUserByUsername(String username) {
        User user = userDao.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        boolean isAdmin = user.isAdmin();

        // Return a MyUserDetails instance
        return new MyUserDetails(user, isAdmin);
    }

}


//
//    @Override
//    public MyUserDetails loadUserByUsername(String username) {
//        User user = userDao.findByUsername(username);
//
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found with username: " + username);
//        }
//
//        return (MyUserDetails) org.springframework.security.core.userdetails.User
//                .withUsername(user.getUsername())
//                .password(user.getPassword())
//                .authorities(new ArrayList<>())
//                .accountExpired(false)
//                .accountLocked(false)
//                .credentialsExpired(false)
//                .disabled(false)
//                .build();
//
//    }