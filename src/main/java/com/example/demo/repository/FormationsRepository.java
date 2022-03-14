package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.example.demo.entity.Formation;

@RepositoryRestResource()
public interface FormationsRepository extends JpaRepository<Formation, Integer>, JpaSpecificationExecutor<Formation>, QuerydslPredicateExecutor<Formation> {}
