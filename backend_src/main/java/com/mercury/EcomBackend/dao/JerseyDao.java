package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.Jersey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface JerseyDao extends JpaRepository<Jersey, Integer> {
    @Query("SELECT j FROM Jersey j")
    List<Jersey> findAllJerseys();
}
