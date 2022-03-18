package com.example.demo.repository;

import com.example.demo.entity.Inventaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Etudiant;

import java.util.List;

@RepositoryRestResource()
public interface EtudiantRepository extends JpaRepository<Etudiant, Integer>, JpaSpecificationExecutor<Etudiant>, QuerydslPredicateExecutor<Etudiant> {

    @Query(value = "SELECT * FROM ETUDIANT where numero = ?1 ",
            nativeQuery = true)
    Etudiant etud(int numero);

    @Query(value = "SELECT * FROM ETUDIANT ORDER BY nombre_points DESC LIMIT ?1 ",
            nativeQuery = true)
    List<Etudiant> classementEtudiants(int nombre);


}

