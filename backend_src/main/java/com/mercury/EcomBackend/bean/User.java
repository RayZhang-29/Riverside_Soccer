package com.mercury.EcomBackend.bean;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private boolean isAdmin;

    @Column
    private String username;

    @Column
    private String address;

    @Column
    private String password;

    @Column
    private String phone;

    @Column
    private String country;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String zip;
}
