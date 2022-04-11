package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Reduction;

import java.util.List;

@RepositoryRestResource()
public interface ReductionRepository extends JpaRepository<Reduction, Integer>, JpaSpecificationExecutor<Reduction>, QuerydslPredicateExecutor<Reduction> {


    @Query(value = "SELECT * FROM reduction ORDER BY points_requis ASC", nativeQuery = true)
    List<Reduction> orderByPointsASC();

    @Query(value = "SELECT * FROM reduction ORDER BY points_requis DESC", nativeQuery = true)
    List<Reduction> orderByPointsDESC();


    @Query(value = "SELECT * FROM reduction r JOIN entreprise e on e.id = r.id_entreprise WHERE e.nom = ?1", nativeQuery = true)
    List<Reduction> getOneEntreprise(String nom);



}
