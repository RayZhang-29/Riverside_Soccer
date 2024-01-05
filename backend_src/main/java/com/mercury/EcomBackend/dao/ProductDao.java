package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDao extends JpaRepository<Product, Integer> {
    public Product save(Product product);
}
