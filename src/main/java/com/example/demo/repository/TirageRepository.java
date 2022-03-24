package com.example.demo.repository;

import com.example.demo.entity.Tirage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource()
public interface TirageRepository extends JpaRepository<Tirage, Integer>, JpaSpecificationExecutor<Tirage>, QuerydslPredicateExecutor<Tirage> {

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO tirage(id, jour, heure, minute, id_gemme, nombre_recupere, latitude, longitude, chaine) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)", nativeQuery = true)
    void ajoute(int id, String jour, int heure, int minute, long id_gemme, int nombre, double lat, double longi, String chaine);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM tirage WHERE id >= 1", nativeQuery = true)
    void supprimeTout();

    @Query(value = "SELECT * FROM tirage WHERE jour = ?1 AND heure = ?2 AND minute = ?3", nativeQuery = true)
    List<Tirage> donneListeActuelle(String jour, int heure, int minute);

    @Query(value = "SELECT * FROM tirage WHERE chaine = ?1", nativeQuery = true)
    Tirage donneTirageChaine(String chaine);

    @Transactional
    @Modifying
    @Query(value = "UPDATE tirage SET nombre_recupere = nombre_recupere + 1 WHERE chaine = ?1", nativeQuery = true)
    void augmenteRecuperation(String chaine);



}

