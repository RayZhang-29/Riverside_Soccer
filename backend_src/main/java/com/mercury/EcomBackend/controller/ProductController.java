package com.mercury.EcomBackend.controller;

import com.mercury.EcomBackend.bean.Product;
import com.mercury.EcomBackend.dto.ProductSalesDto;
import com.mercury.EcomBackend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductById(@PathVariable int id) {
        Optional<Product> product = productService.findProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAllProducts() {
        List<Product> products = productService.findAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/top-selling-products")
    public List<ProductSalesDto> getTopSellingProducts(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(value = "limit", defaultValue = "5") int limit) {
        return productService.getTopSellingProducts(startDate, endDate, limit);
    }

}
