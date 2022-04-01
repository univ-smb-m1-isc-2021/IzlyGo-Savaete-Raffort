package com.example.demo.repository;

import com.example.demo.entity.Succes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource()
public interface SuccesRepository extends JpaRepository<Succes, Integer>, JpaSpecificationExecutor<Succes>, QuerydslPredicateExecutor<Succes> {


    @Query(value = "SELECT * FROM SUCCES WHERE id_etudiant = ?1 AND (etat = ?2 OR etat = ?3)",
            nativeQuery = true)
    List<Succes> donneMesSuccesSQL(int numero, String etat1, String etat2);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO SUCCES(id_etudiant, id_challenge, etat) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void ajouteLine(long etudiant, long challenge, String etat);


    @Query(value = "SELECT * FROM SUCCES WHERE id_etudiant = ?1 AND etat = ?2",
            nativeQuery = true)
    List<Succes> donneSuccesEnCours(int numero, String etat1);

    @Transactional
    @Modifying
    @Query(value = "UPDATE SUCCES SET avancement = avancement + 1 WHERE id = ?1", nativeQuery = true)
    void ajouteAvancement(long id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE SUCCES SET etat = ?2 WHERE id = ?1", nativeQuery = true)
    void definiSuccesFini(long id, String etat);


    @Transactional
    @Modifying
    @Query(value = "UPDATE SUCCES SET etat = ?2 WHERE id_challenge = ?1", nativeQuery = true)
    void debloqueSucces(long id, String etat);



}

