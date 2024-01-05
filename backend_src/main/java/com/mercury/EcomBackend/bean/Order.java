package com.mercury.EcomBackend.bean;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private int userId;

//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;

    @Column
    private Date orderTime;

    @Column
    private String username;

    @Column
    private String phone;

    @Column
    private String shippingAddress;

    @Column
    private String country;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private String zip;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonManagedReference("order-orderDetail")
    @ToString.Exclude
    private List<OrderDetail> orderDetails;

//    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
//    private List<OrderDetail> orderDetail;

//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER, mappedBy = "order")
//    private List<OrderDetail> purchases;

//    @OneToMany()
//    private User user;
}
