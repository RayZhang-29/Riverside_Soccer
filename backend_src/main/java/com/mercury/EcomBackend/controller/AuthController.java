package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.bean.User;
import com.mercury.EcomBackend.dao.UserDao;
import com.mercury.EcomBackend.dto.RegisterDto;
import com.mercury.EcomBackend.security.*;
import com.mercury.EcomBackend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private UserDao userDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    @PostMapping("/api/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        System.out.println("Before authentication process");
        logger.info("Authenticating user: " + jwtRequest.getUsername());

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            System.out.println("exception!");
            logger.error("Incorrect username or password for user: " + jwtRequest.getUsername(), e);
            throw new Exception("Incorrect username or password", e);
        }

        System.out.println("After authentication process");

        final MyUserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUsername());

        Integer userId = null;
        boolean isAdmin = false;
        if (userDetails != null) {
            userId = userDetails.getId();
            isAdmin = userDetails.isAdmin();
//            System.out.println(userId);
//            System.out.println(isAdmin);
        }

        final String jwt = jwtUtil.generateToken(userDetails, userId);
        return ResponseEntity.ok(new JwtResponse(jwt, isAdmin));
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registrationRequest) {
        // Check if the user already exists
        if (userDao.existsByUsername(registrationRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        // Encrypt the password before saving the user
//        registrationRequest.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        System.out.println(registrationRequest);
        // Save the user
        User user = new User();
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setUsername(registrationRequest.getUsername());
        user.setAdmin(registrationRequest.getStatus() == 1);
        userDao.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }
}

//    @PostMapping("/refresh-token")
//    public ResponseEntity<?> refreshToken(HttpServletRequest request, @RequestParam("refreshToken") String refreshToken) {
//
//        if (jwtUtil.validateRefreshToken(refreshToken)) {
//            String username = jwtUtil.getUsernameFromRefreshToken(refreshToken);
//            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
//            String newToken = jwtUtil.generateToken(userDetails);
//            return ResponseEntity.ok(new JwtResponse(newToken));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
//        }

//        if (jwtUtil.validateRefreshToken(refreshToken)) {
//            String username = jwtUtil.getUsernameFromRefreshToken(refreshToken);
//            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
//            String newToken = jwtUtil.generateToken(userDetails);
//            return ResponseEntity.ok(new JwtResponse(newToken));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
//        }


//    @PostMapping("/refresh-token")
//    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
//        String authToken = request.getHeader("Authorization");
//        if (authToken != null && authToken.startsWith("Bearer ")) {
//            authToken = authToken.substring(7);
//        }
//
//        if (jwtUtil.validateToken(authToken)) {
//            String username = jwtUtil.getUsernameFromToken(authToken);
//            UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username);
//            String newToken = jwtUtil.generateToken(userDetails);
//            return ResponseEntity.ok(new JwtResponse(newToken));
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
//        }
//    }

