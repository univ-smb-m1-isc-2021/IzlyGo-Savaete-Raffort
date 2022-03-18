package com.example.demo.controller;

import java.util.List;

import com.example.demo.entity.Etudiant;
import com.example.demo.entity.Reduction;
import com.example.demo.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Parrainage;
import com.example.demo.service.ParrainageService;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class ParrainageController {

    @Autowired
    ParrainageService parrainageService;

    @Autowired
    EtudiantService etudiantService;


    @GetMapping(path = "/filleuls/{numero}")
    public ResponseEntity<?> donneListeFilleuls(@PathVariable int numero) {

        List<Parrainage> parrainages = parrainageService.donneListeFilleuls(numero);

        JSONObject json = new JSONObject();
        JSONArray array_ligne = new JSONArray();

        for (Parrainage parrainage : parrainages){
            JSONObject une_ligne = new JSONObject();

            Etudiant filleul = parrainage.getFilleul();

            une_ligne.put("nom_complet", filleul.getPrenom() + " " + filleul.getNom());
            une_ligne.put("nombre_points", filleul.getNombre_points());

            array_ligne.put(une_ligne);
        }

        Etudiant etudiant = etudiantService.getEtudiant(numero);


        json.put("filleuls", array_ligne);
        json.put("code_parrain", etudiant.getCodeParrainage());


        return ResponseEntity.ok(json.toMap());
    }


}
