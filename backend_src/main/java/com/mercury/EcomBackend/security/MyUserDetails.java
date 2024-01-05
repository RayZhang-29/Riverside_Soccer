package com.mercury.EcomBackend.security;

import com.mercury.EcomBackend.bean.User;

import java.util.ArrayList;


public class MyUserDetails extends org.springframework.security.core.userdetails.User {
    private static final long serialVersionUID = 1L;

    private final Integer id;
    private final boolean isAdmin;
    public MyUserDetails(User user, boolean isAdmin) {
        super(user.getUsername(), user.getPassword(), new ArrayList<>());
        this.id = user.getId();
        this.isAdmin = isAdmin;
    }

    public Integer getId() {
        return id;
    }

    public boolean isAdmin() {return isAdmin;}
}

