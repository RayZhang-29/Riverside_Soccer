package com.mercury.EcomBackend.bean;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mercury.EcomBackend.bean.Order;
import com.mercury.EcomBackend.bean.Product;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "order_details",
        uniqueConstraints = @UniqueConstraint(columnNames = {"order_id", "product_id", "size"}))
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column(name = "product_id", nullable = false) // Maps the productId column
    private int productId;
//
    @Column(name = "order_id", nullable = false) // Maps the order_id column
    private int orderId;

    @Column(name = "size", nullable = false) // Maps the size column
    private String size;

    @Column
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference("order-orderDetail")
    @ToString.Exclude
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference("product-orderDetail")
    @ToString.Exclude
    private Product product;

//    @ManyToOne
//    @MapsId("orderId")
//    private Order order;

}


//    @Column
//    private int productId;
//
//    @Column
//    private int orderId;

//    @Column
//    private String size;

//    @ManyToOne
//    @MapsId("productId")
//    @JoinColumn(name = "product_id")
//    private Product product;




//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    private Order order;
//
//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    private Product product;