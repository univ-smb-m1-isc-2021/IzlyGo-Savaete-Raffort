package com.example.demo.controller;

import java.util.List;

import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Reduction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Notification;
import com.example.demo.service.NotificationService;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/")
public class NotificationController {

    @Autowired
    NotificationService notificationService;


    @GetMapping(path = "/notifications/{numero}")
    public ResponseEntity<?> donneListeNotifications(@PathVariable int numero) {

        List<Notification> notifications = notificationService.donneParametresNotifications(numero);
        return ResponseEntity.ok(notifications);
    }

    @PostMapping(path = "/edit/notification/{id}")
    public ResponseEntity<?> ajouteEtudiant(@PathVariable int id) {

        notificationService.changeEtat(id);
        return ResponseEntity.ok("Modifié");
    }

}
