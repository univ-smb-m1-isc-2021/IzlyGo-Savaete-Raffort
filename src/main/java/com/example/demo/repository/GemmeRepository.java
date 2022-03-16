package com.example.demo.repository;

import com.example.demo.entity.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Gemme;

import java.util.List;

@RepositoryRestResource()
public interface GemmeRepository extends JpaRepository<Gemme, Integer>, JpaSpecificationExecutor<Gemme>, QuerydslPredicateExecutor<Gemme> {

    @Query(value = "SELECT * FROM GEMME where proba_min <= ?1 AND proba_max >= ?1 LIMIT 1",
            nativeQuery = true)
    Gemme trouveGemme(int proba);

}

