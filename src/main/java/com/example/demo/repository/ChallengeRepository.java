package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Challenge;

@RepositoryRestResource()
public interface ChallengeRepository extends JpaRepository<Challenge, Integer>, JpaSpecificationExecutor<Challenge>, QuerydslPredicateExecutor<Challenge> {

    @Query(value = "SELECT * FROM challenge WHERE id_challenge_precedent = ?1 LIMIT 1 ",
            nativeQuery = true)
    Challenge donneProchainChallenge(long id);

}


