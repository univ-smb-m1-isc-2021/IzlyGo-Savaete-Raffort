package com.example.demo.repository;

import com.example.demo.entity.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

@RepositoryRestResource()
public interface InventaireRepository extends JpaRepository<Inventaire, Integer>, JpaSpecificationExecutor<Inventaire>, QuerydslPredicateExecutor<Inventaire> {


    @Query(value = "SELECT * FROM INVENTAIRE i WHERE i.id_etudiant = ?1 ",
            nativeQuery = true)
    List<Inventaire> maListe(int numero);

}

