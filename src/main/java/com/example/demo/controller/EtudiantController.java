package com.example.demo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.entity.*;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import org.springframework.web.bind.annotation.PathVariable;

import java.time.format.TextStyle;
import java.util.Locale;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/")
public class EtudiantController {

    @Autowired
    EtudiantService etudiantService;

    @Autowired
    InventaireService inventaireService;

    @Autowired
    GemmeService gemmeService;

    @Autowired
    ChallengeService challengeService;

    @Autowired
    SuccesService succesService;

    @Autowired
    NotificationService notificationService;

    @Autowired
    ParrainageService parrainageService;

    @PostMapping(path = "/create/student")
    public ResponseEntity<?> ajouteEtudiant(@RequestBody Etudiant etudiant) {

        // Code parrainage
        String part1 = etudiant.getNom().toUpperCase();
        String part2 = etudiant.getPrenom().substring(0,2).toUpperCase();
        String part3 = String.valueOf(getRandomNumberInt(10,99));
        etudiant.setCodeParrainage(part1 + part2 + part3);


        // Date d'inscription
        LocalDateTime now = LocalDateTime.now();
        String mois = now.getMonth().getDisplayName(TextStyle.FULL, Locale.FRANCE);
        etudiant.setDateInscription(now.getDayOfMonth() + " " + mois + " " + now.getYear());

        Etudiant parrain = etudiantService.checkCodeParrainage(etudiant.getCodeParrain());

        if (parrain == null) { etudiant.setCode_parrain(null); }

        Etudiant etu = etudiantService.saveEtudiant(etudiant);

        if (parrain != null) { parrainageService.ajouteLigne(etu.getNumero(), parrain.getNumero()); }

        // Set la liste des gemmes dans l'inventaire
        List<Gemme> gemmes = gemmeService.donneListeGemmes();
        for(Gemme g : gemmes){
            inventaireService.ajouteLigne(etu.getNumero(), g.getId());

            notificationService.ajouteLigne(etu.getNumero(), g.getId());
        }

        // Set la liste de ses succès (challenge)
        List<Challenge> challenges = challengeService.donneListeChallenge();
        String etat = "";

        for (Challenge challenge : challenges) {
            if (challenge.getChallenge_precedent() == null){
                etat = "EN_COURS";
            }else {
                etat = "BLOQUE";
            }

            succesService.ajouteLine(etu.getNumero(),challenge.getId(), etat);
        }


        JSONObject json = new JSONObject();

        json.put("etudiant", etudiant);
        json.put("succes", etudiant.getNumero() != 0 ? true : false);



        return ResponseEntity.ok(json.toMap());

    }


    @GetMapping(path = "/profil/{numero}")
    public ResponseEntity<?> monProfil(@PathVariable int numero) {
        Etudiant etu = etudiantService.getEtudiant(numero);
        return ResponseEntity.ok(etu);
    }


    @GetMapping(path = "/inventaire/{numero}")
    public ResponseEntity<?> monInventaire(@PathVariable int numero) {


        double CONVERSION = 0.0025;


        JSONObject json = new JSONObject();

        JSONArray gemmesTotal = new JSONArray();
        JSONArray gemmesPar2= new JSONArray();

        List<Inventaire> mes_gemmes = inventaireService.getList(numero);

        int nombre_point = 0;
        double nombre_euros = 0;

        int pair = 0;

        for (Inventaire inv : mes_gemmes) {
            JSONObject une_gemme = new JSONObject();

            une_gemme.put("nom", inv.getGemme().getNom());
            une_gemme.put("couleur", inv.getGemme().getCouleur());
            une_gemme.put("chemin_image", inv.getGemme().getChemin_image());

            une_gemme.put("quantite", inv.getQuantite());

            int valeur = inv.getGemme().getValeur() * inv.getQuantite();
            une_gemme.put("valeur_points", valeur);
            une_gemme.put("valeur_euro", valeur * CONVERSION);

            gemmesPar2.put(une_gemme);

            pair += 1;

            if (pair % 2 == 0) {
                gemmesTotal.put(gemmesPar2);
                gemmesPar2 = new JSONArray();
            }


            nombre_point += valeur;
            nombre_euros += valeur * CONVERSION;
        }

        json.put("gemmes", gemmesTotal);

        Etudiant etu = etudiantService.getEtudiant(numero);

        JSONObject etudiant = new JSONObject();
        etudiant.put("numero", etu.getNumero());
        etudiant.put("nom", etu.getNom());
        etudiant.put("nombre_points", nombre_point);
        etudiant.put("nombre_euros", nombre_euros);

        json.put("etudiant", etudiant);
         Object ppp = "eee";

        return ResponseEntity.ok(json.toMap());
    }



    @GetMapping(path = "/classement/{nombre}")
    public ResponseEntity<?> classement(@PathVariable int nombre) {
        List<Etudiant> etudiants = etudiantService.donneTopEtudiants(nombre);
        return ResponseEntity.ok(etudiants);

    }


    @PostMapping(path = "/connexion")
    public ResponseEntity<?> connexion(@RequestBody Connexion connexion) {

        int quantite = etudiantService.connexionExiste(connexion.getMail(), connexion.getPassword());

        int numero = 0;
        if (quantite == 1){
            numero = etudiantService.connexion(connexion.getMail(), connexion.getPassword());
        }



        JSONObject json = new JSONObject();
        json.put("trouve", quantite == 0 ? false : true);
        json.put("numero", numero);

        return ResponseEntity.ok(json.toMap());
    }

    public int getRandomNumberInt(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }



}


