package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Inventaire;
import com.example.demo.service.InventaireService;
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

import com.example.demo.service.EtudiantService;
import org.springframework.web.bind.annotation.PathVariable;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/")
public class EtudiantController {

    @Autowired
    EtudiantService etudiantService;

    @Autowired
    InventaireService inventaireService;

    @PostMapping(path = "/create/student")
    public ResponseEntity<?> ajouteEtudiant(@RequestBody Etudiant etudiant) {

        Etudiant etu = etudiantService.saveEtudiant(etudiant);
        return ResponseEntity.ok("Salut les amis");
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
}


