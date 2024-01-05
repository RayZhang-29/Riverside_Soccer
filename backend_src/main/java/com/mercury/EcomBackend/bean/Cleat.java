package com.mercury.EcomBackend.bean;

import lombok.*;

import javax.persistence.*;


@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cleats")
@PrimaryKeyJoinColumn(name = "id")
//@DiscriminatorValue("cleat")
public class Cleat extends Product {
    @Column
    private String category;
}
