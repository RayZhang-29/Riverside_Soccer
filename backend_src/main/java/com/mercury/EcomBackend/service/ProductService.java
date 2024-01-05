package com.mercury.EcomBackend.service;

import com.mercury.EcomBackend.bean.Cleat;
import com.mercury.EcomBackend.bean.Jersey;
import com.mercury.EcomBackend.bean.Order;
import com.mercury.EcomBackend.bean.Product;
import com.mercury.EcomBackend.dao.CleatDao;
import com.mercury.EcomBackend.dao.JerseyDao;
import com.mercury.EcomBackend.dao.OrderDao;
import com.mercury.EcomBackend.dao.ProductDao;
import com.mercury.EcomBackend.dto.ProductSalesDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Tuple;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ProductService {
    @Autowired
    private ProductDao productDao;

    public List<Product> findAllProducts() {
        return productDao.findAll();
    }

    public Optional<Product> findProductById(int id) {
        return productDao.findById(id);
    }

//    public Product saveProduct(Product product) {
//        return productDao.save(product);
//    }
//
//    public void deleteProductById(int id) {
//        productDao.deleteById(id);
//    }


    @Autowired
    private CleatDao cleatDao;

    public List<Cleat> getAllCleats() {
        return cleatDao.findAllCleats();
    }
    public Optional<Cleat> getCleatById(int id) {
        Optional<Product> product = productDao.findById(id);
        if (product.isPresent() && product.get() instanceof Cleat) {
            return cleatDao.findById(id);
        }
        return Optional.empty();
    }
    public Cleat addCleat(Cleat cleat) {
        Cleat newCleat = new Cleat();
        newCleat.setAge(cleat.getAge());
        newCleat.setName(cleat.getName());
        newCleat.setBrand(cleat.getBrand());
        newCleat.setColor(cleat.getColor());
        newCleat.setGender(cleat.getGender());
        newCleat.setPrice(cleat.getPrice());
        newCleat.setImage(cleat.getImage());
        newCleat.setCategory(cleat.getCategory());

        Cleat res = cleatDao.save(newCleat);
        System.out.println(res);
        return res;
    }
    public void deleteCleat(int id) {
        cleatDao.deleteById(id);
    }

    @Autowired
    private JerseyDao jerseyDao;

    public List<Jersey> getAllJerseys() {
        return jerseyDao.findAllJerseys();
    }
    public Optional<Jersey> getJerseyById(int id) {
        Optional<Product> product = productDao.findById(id);
        if (product.isPresent() && product.get() instanceof Jersey) {
            return jerseyDao.findById(id);
        }
        return Optional.empty();
    }
    public Jersey addJersey(Jersey jersey) {
        Jersey newJersey = new Jersey();
        newJersey.setImage(jersey.getImage());
        newJersey.setName(jersey.getName());
        newJersey.setAge(jersey.getAge());
        newJersey.setGender(jersey.getGender());
        newJersey.setBrand(jersey.getBrand());
        newJersey.setColor(jersey.getColor());
        newJersey.setPrice(jersey.getPrice());
        newJersey.setClub(jersey.getClub());
        newJersey.setCountry(jersey.getCountry());
        return jerseyDao.save(newJersey);
    }
    public void deleteJersey(int id) {
        jerseyDao.deleteById(id);
    }


    @PersistenceContext
    private EntityManager entityManager;

    public List<ProductSalesDto> getTopSellingProducts(Date startDate, Date endDate, int maxResults) {
        String query = "SELECT p.name AS productName, COUNT(od.product.id) AS sales " +
                "FROM Order o " +
                "JOIN o.orderDetails od " +
                "JOIN od.product p " +
                "WHERE o.orderTime BETWEEN :startDate AND :endDate " +
                "GROUP BY od.product.id " +
                "ORDER BY sales DESC";

        List<ProductSalesDto> result = entityManager.createQuery(query, Tuple.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .setMaxResults(maxResults)
                .getResultList()
                .stream()
                .map(tuple -> new ProductSalesDto(tuple.get("productName", String.class), tuple.get("sales", Long.class)))
                .collect(Collectors.toList());

        return result;
    }
}



//                "SELECT p.name AS productName, COUNT(od.product_id) AS sales " +
//                "FROM Order o " +
//                "JOIN order_details od ON o.id = od.order_id " +
//                "JOIN products p ON p.id = od.product_id " +
//                "WHERE o.order_time BETWEEN :startDate AND :endDate " +
//                "GROUP BY od.product_id " +
//                "ORDER BY sales DESC";