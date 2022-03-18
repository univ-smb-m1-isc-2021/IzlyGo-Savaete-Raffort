package com.example.demo.repository;

import com.example.demo.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RepositoryRestResource()
public interface NotificationRepository extends JpaRepository<Notification, Integer>, JpaSpecificationExecutor<Notification>, QuerydslPredicateExecutor<Notification> {


    @Query(value = "SELECT * FROM notification WHERE id_etudiant = ?1 ",
            nativeQuery = true)
    List<Notification> donneNotificationsEtudiant(int numero);

    @Transactional
    @Modifying
    @Query(value = "UPDATE notification SET etat = NOT etat WHERE id = ?1 ",
            nativeQuery = true)
    void changeEtat(int id);

}

