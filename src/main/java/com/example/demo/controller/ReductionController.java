package com.example.demo.controller;

import java.text.DecimalFormat;
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


    private static final DecimalFormat df = new DecimalFormat("0.00");


    @Autowired
    ReductionService reductionService;

    @Autowired
    EtudiantService etudiantService;


    @GetMapping(path = "/reductions/{numero}")
    public ResponseEntity<?> donneReductions(@PathVariable int numero) {

        double CONVERSION = 0.0025;

        JSONObject json = new JSONObject();

        JSONArray array_reduction = new JSONArray();


        List<Reduction> reductions = reductionService.donneToutesLesReductions(true);
        Etudiant etu = etudiantService.getEtudiant(numero);


        for(Reduction reduction : reductions){
            JSONObject info = new JSONObject();

            info.put("entreprise", reduction.getEntreprise());
            info.put("points_requis", reduction.getPoints_requis());
            info.put("libelle", reduction.getLibelle());

            info.put("accessible", etu.getNombre_points() >= reduction.getPoints_requis() ? true : false);

            array_reduction.put(info);
        }

        json.put("reductions", array_reduction);


        int nombre_points = etu.getNombre_points();
        double nombre_euros = nombre_points * CONVERSION;

        JSONObject etudiant = new JSONObject();
        etudiant.put("numero", etu.getNumero());
        etudiant.put("nom", etu.getNom());
        etudiant.put("nombre_points", nombre_points);
        etudiant.put("nombre_euros", df.format(nombre_euros));

        json.put("etudiant", etudiant);


        return ResponseEntity.ok(json.toMap());
    }

}
