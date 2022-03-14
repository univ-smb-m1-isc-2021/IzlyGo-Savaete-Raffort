package com.example.demo.controller;

import java.util.List;

import com.example.demo.entity.Formation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Etudiant;
import com.example.demo.service.EtudiantService;
import org.springframework.web.bind.annotation.PathVariable;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class EtudiantController {

    @Autowired
    EtudiantService etudiantService;

    @PostMapping(path = "/create/student")
    public ResponseEntity<?> ajouteEtudiant(@RequestBody Etudiant etudiant) {

        Etudiant etu = etudiantService.saveEtudiant(etudiant);
        return ResponseEntity.ok("Salut les amis");
    }


    @GetMapping(path = "/inventaire/{numero}")
    public ResponseEntity<?> listFormations(@PathVariable int numero) {

        Object [] e = new Object[0];

        e[0] = "ee";




        return ResponseEntity.ok(e);
    }
}


class Toto {

}
