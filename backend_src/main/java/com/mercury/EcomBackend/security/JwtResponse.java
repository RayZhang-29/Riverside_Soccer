package com.mercury.EcomBackend.security;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 4858627673292249629L;

    private final String jwtToken;
    private final boolean isAdmin;

    public JwtResponse(String jwtToken, boolean isAdmin) {

        this.jwtToken = jwtToken;
        this.isAdmin = isAdmin;
    }

    public String getToken() {
        return this.jwtToken;
    }

    public boolean isAdmin() {
        return this.isAdmin;
    }

}
