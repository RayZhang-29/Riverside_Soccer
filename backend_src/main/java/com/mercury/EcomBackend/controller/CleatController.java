package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.bean.Cleat;
import com.mercury.EcomBackend.bean.Jersey;
import com.mercury.EcomBackend.bean.Product;
import com.mercury.EcomBackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class CleatController {
    @Autowired
    private ProductService productService;

    @GetMapping("/all-cleats")
    public ResponseEntity<List<Cleat>> getAllCleats() {
        List<Cleat> cleats = productService.getAllCleats();
        System.out.println(cleats);
        return ResponseEntity.ok(cleats);
    }

    @GetMapping("/cleat-detail/{id}")
    public ResponseEntity<Cleat> getCleatById(@PathVariable int id) {
        Optional<Cleat> cleat = productService.getCleatById(id);
        return cleat.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }




    @PostMapping("/add-cleat")
    public ResponseEntity<Cleat> addCleat(@RequestBody Cleat newCleat) {
        Cleat createdCleat = productService.addCleat(newCleat);
        System.out.println(createdCleat);
        if (createdCleat != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCleat);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

//    @PutMapping("/cleat-detail/{id}")
//    public ResponseEntity<Product> updateCleat(@PathVariable int id, @RequestBody Cleat cleatDetails) {
//        Cleat cleat = productService.getCleatById(id);
//
//        Product updatedCleat = productService.updateCleat(id, CleatDetails);
//        return ResponseEntity.ok(updatedCleat);
//    }
//
    @DeleteMapping("/cleat-detail/{id}")
    public ResponseEntity<Void> deleteCleat(@PathVariable int id) {
        productService.deleteCleat(id);
        return ResponseEntity.noContent().build();
    }
}
