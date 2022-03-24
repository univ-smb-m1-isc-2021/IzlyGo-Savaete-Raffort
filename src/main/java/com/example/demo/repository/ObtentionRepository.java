package com.example.demo.repository;

import com.example.demo.entity.Obtention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource()
public interface ObtentionRepository extends JpaRepository<Obtention, Integer>, JpaSpecificationExecutor<Obtention>, QuerydslPredicateExecutor<Obtention> {


    @Transactional
    @Modifying
    @Query(value = "INSERT INTO obtention(chaine, id_etudiant) VALUES (?1, ?2)", nativeQuery = true)
    void ajouteLigne(String chaine, long id_etudiant);

    @Query(value = "SELECT * FROM obtention WHERE id_etudiant = ?1 ",nativeQuery = true)
    List<Obtention> donneLignes(int numero);

}

