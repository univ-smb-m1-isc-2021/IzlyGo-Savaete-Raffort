package com.example.demo.repository;

import com.example.demo.entity.Parrainage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource()
public interface ParrainageRepository extends JpaRepository<Parrainage, Integer>, JpaSpecificationExecutor<Parrainage>, QuerydslPredicateExecutor<Parrainage> {

    @Query(value = "SELECT * FROM parrainage WHERE id_parrain = ?1", nativeQuery = true)
    List<Parrainage> donneListeFilleuls(int numero);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO parrainage(id_filleul, id_parrain) VALUES (?1, ?2)", nativeQuery = true)
    void ajouteLigne(long filleul, long parrain);


}

