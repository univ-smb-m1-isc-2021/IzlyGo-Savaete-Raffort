package com.example.demo.repository;

import com.example.demo.entity.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource()
public interface InventaireRepository extends JpaRepository<Inventaire, Integer>, JpaSpecificationExecutor<Inventaire>, QuerydslPredicateExecutor<Inventaire> {


    @Query(value = "SELECT * FROM INVENTAIRE i WHERE i.id_etudiant = ?1 ",
            nativeQuery = true)
    List<Inventaire> maListe(int numero);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO INVENTAIRE(id_etudiant, id_gemme) VALUES (?1, ?2)", nativeQuery = true)
    void ajouteLigne(long etudiant, long gemme);


    @Transactional
    @Modifying
    @Query(value = "UPDATE inventaire SET quantite = quantite + ?3 WHERE id_etudiant = ?1 AND id_gemme = ?2", nativeQuery = true)
    void ajouteQuantite(long etudiant, long gemme, int quantite);


}

