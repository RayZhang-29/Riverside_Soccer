package com.mercury.EcomBackend.bean;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jerseys")
@PrimaryKeyJoinColumn(name = "id")
@DiscriminatorValue("jersey")
public class Jersey extends Product {
    @Column
    private String club;
    @Column
    private String country;
}
