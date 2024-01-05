package com.mercury.EcomBackend.bean;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
@Inheritance(strategy = InheritanceType.JOINED)
//@DiscriminatorColumn(name = "type")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String name;

//    @Column
//    private String type;

    @Column
    private String brand;


    @Column
    private int price;

    @Column
    private String image;

    @Column
    private String color;

    @Column
    private String age;

    @Column
    private String gender;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonManagedReference("product-orderDetail")
    @ToString.Exclude
    private List<OrderDetail> orderDetails;
}

// TODO: list of string?
//    @Type(type = "json")
//    @Column(columnDefinition = "json")
//    private List<String> size;
//    @Column
//    private String size;


//    public List<String> getSizeList() {
//        if (size == null || size.isEmpty()) {
//            return new ArrayList<>();
//        }
//        return Arrays.asList(size.split(","));
//    }
//
//    public void setSizeList(List<String> sizeList) {
//        this.size = String.join(",", sizeList);
//    }