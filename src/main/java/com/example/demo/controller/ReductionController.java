package com.example.demo.controller;

import java.util.List;

import com.example.demo.entity.Etudiant;
import com.example.demo.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Reduction;
import com.example.demo.service.ReductionService;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class ReductionController {

    @Autowired
    ReductionService reductionService;

    @Autowired
    EtudiantService etudiantService;


    @GetMapping(path = "/reductions/{numero}")
    public ResponseEntity<?> donneReductions(@PathVariable int numero) {

        JSONObject json = new JSONObject();


        List<Reduction> reductions = reductionService.donneToutesLesReductions();
        json.put("reductions", reductions);

        Etudiant etu = etudiantService.getEtudiant(numero);

        JSONObject etudiant = new JSONObject();
        etudiant.put("numero", etu.getNumero());
        etudiant.put("nom", etu.getNom());
        etudiant.put("nombre_points", etu.getNombre_points());
        etudiant.put("nombre_euros", 0);

        json.put("etudiant", etudiant);


        return ResponseEntity.ok(json.toMap());
    }

}
