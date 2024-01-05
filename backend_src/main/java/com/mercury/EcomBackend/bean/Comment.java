package com.mercury.EcomBackend.bean;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@ToString
@Table(name = "comments")
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private int userId;

    @Column
    private String contents;

    @Column
    private int rating;

    @Column
    private int productId;

    @Column
    private Date commentTime;

}
