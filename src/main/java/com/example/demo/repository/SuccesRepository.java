package com.example.demo.repository;

import com.example.demo.entity.Succes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

@RepositoryRestResource()
public interface SuccesRepository extends JpaRepository<Succes, Integer>, JpaSpecificationExecutor<Succes>, QuerydslPredicateExecutor<Succes> {


    @Query(value = "SELECT * FROM SUCCES WHERE id_etudiant = ?1 AND (etat = ?2 OR etat = ?3)",
            nativeQuery = true)
    List<Succes> donneMesSuccesSQL(int numero, String etat1, String etat2);

}

