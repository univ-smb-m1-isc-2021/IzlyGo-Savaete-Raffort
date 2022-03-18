package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Notification;
import org.springframework.stereotype.Component;

import com.example.demo.repository.NotificationRepository;

@Component
public class NotificationService {

    private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }



    public List<Notification> donneParametresNotifications(int numero){
        return notificationRepository.donneNotificationsEtudiant(numero);
    }

    public void changeEtat(int id){
        notificationRepository.changeEtat(id);
    }

    public void ajouteLigne(long etudiant, long gemme){
        notificationRepository.ajouteLigne(etudiant, gemme);
    }



}
