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
public class JerseyController {
    @Autowired
    private ProductService productService;

    @GetMapping("/all-jerseys")
    public ResponseEntity<List<Jersey>> getAllJerseys() {
        List<Jersey> jerseys = productService.getAllJerseys();
        return ResponseEntity.ok(jerseys);
    }

    @GetMapping("/jersey-detail/{id}")
    public ResponseEntity<Jersey> getJerseyById(@PathVariable int id) {
        Optional<Jersey> jersey = productService.getJerseyById(id);
        return jersey.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/add-jersey")
    public ResponseEntity<Jersey> addJersey(@RequestBody Jersey newJersey) {
        Jersey createdJersey = productService.addJersey(newJersey);
        System.out.println(createdJersey);
        if (createdJersey != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdJersey);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/jersey-detail/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        productService.deleteJersey(id);
        return ResponseEntity.noContent().build();
    }


//    @PutMapping("/jersey-detail/{id}")
//    public ResponseEntity<Jersey> updateJersey(@PathVariable int id, @RequestBody Jersey jerseyvDetails) {
//        Jersey updatedJersey = productService.updateJersey(id, jerseyDetails);
//        return ResponseEntity.ok(updatedJersey);
//    }
//
}
