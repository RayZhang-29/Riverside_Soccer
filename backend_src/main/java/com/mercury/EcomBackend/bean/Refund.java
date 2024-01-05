package com.mercury.EcomBackend.bean;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@ToString
@Entity
@Table(name = "refunds")
@NoArgsConstructor
@AllArgsConstructor
public class Refund {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int orderId;

    @Column
    private int productId;

    @Column
    private int userId;

    @Column
    private Date refundTime;

    @Column
    private String status;

}
