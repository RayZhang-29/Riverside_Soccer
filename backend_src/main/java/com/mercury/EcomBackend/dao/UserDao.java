package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer> {
    User getUserById(Integer id);
    User findByUsername(String username);
    boolean existsByUsername(String username);

}
