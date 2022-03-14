package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Etudiant;

@RepositoryRestResource()
public interface EtudiantRepository extends JpaRepository<Etudiant, Integer>, JpaSpecificationExecutor<Etudiant>, QuerydslPredicateExecutor<Etudiant> {}
