package com.example.demo.repository;

import com.example.demo.entity.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Etudiant;

import java.util.List;

@RepositoryRestResource()
public interface EtudiantRepository extends JpaRepository<Etudiant, Integer>, JpaSpecificationExecutor<Etudiant>, QuerydslPredicateExecutor<Etudiant> {

    @Query(value = "SELECT * FROM ETUDIANT where numero = ?1 ",
            nativeQuery = true)
    Etudiant etud(int numero);

    @Query(value = "SELECT * FROM ETUDIANT ORDER BY nombre_points_semaine DESC LIMIT ?1 ",
            nativeQuery = true)
    List<Etudiant> classementEtudiants(int nombre);


    @Query(value = "SELECT count(*) FROM ETUDIANT WHERE mail = ?1 AND password = ?2 AND compte_actif = 1",
            nativeQuery = true)
    int connexionExiste(String mail, String password);

    @Query(value = "SELECT numero FROM ETUDIANT WHERE mail = ?1 AND password = ?2 AND compte_actif = 1",
            nativeQuery = true)
    int connexion(String mail, String password);

    @Query(value = "SELECT * FROM ETUDIANT WHERE code_parrainage = ?1 LIMIT 1",
            nativeQuery = true)
    Etudiant checkCodeParrainage(String code);


    @Transactional
    @Modifying
    @Query(value = "UPDATE etudiant SET nombre_points = nombre_points + ?2, nombre_points_semaine = nombre_points_semaine + ?2 WHERE numero = ?1", nativeQuery = true)
    void augmenteNombrePoints(int etudiant, int valeur);


    @Transactional
    @Modifying
    @Query(value = "UPDATE etudiant SET nombre_points = nombre_points - ?2 WHERE numero = ?1", nativeQuery = true)
    void retirePoints(int etudiant, int nombre);

    @Transactional
    @Modifying
    @Query(value = "UPDATE etudiant SET nombre_badge = nombre_badge + 1 WHERE numero = ?1", nativeQuery = true)
    void ajouteBadge(int etudiant);

    @Transactional
    @Modifying
    @Query(value = "UPDATE etudiant SET nombre_badge = 0 WHERE numero = ?1", nativeQuery = true)
    void retirerBadge(int etudiant);



    @Query(value = "SELECT * FROM ETUDIANT where numero = ?1 AND PASSWORD = ?2 LIMIT 1 ",
            nativeQuery = true)
    Etudiant checkMDP(int numero, String mdp);

    @Transactional
    @Modifying
    @Query(value = "UPDATE etudiant SET PASSWORD = ?2 WHERE numero = ?1", nativeQuery = true)
    void changeMDP(int etudiant, String nouveau_mdp);




}

