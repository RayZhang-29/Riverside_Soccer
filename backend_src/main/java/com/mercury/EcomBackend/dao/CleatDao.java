package com.mercury.EcomBackend.dao;

import com.mercury.EcomBackend.bean.Cleat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CleatDao extends JpaRepository<Cleat, Integer> {
    @Query("SELECT c FROM Cleat c")
    List<Cleat> findAllCleats();
}
