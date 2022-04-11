package com.example.demo.controller;

import java.util.List;
import java.util.Objects;

import com.example.demo.entity.Challenge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Succes;
import com.example.demo.service.SuccesService;

import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class SuccesController {

    @Autowired
    SuccesService succesService;

    @GetMapping(path = "/succes/{numero}")
    public ResponseEntity<?> donneSucces(@PathVariable int numero) {

        List<Succes> les_succes = succesService.donneMesSucces(numero);


        JSONObject json = new JSONObject();
        JSONArray json_succes = new JSONArray();

        for (Succes succes : les_succes){

            int etoile = 0;


            JSONObject info = new JSONObject();

            if (Objects.equals(succes.getEtat(), "EN_COURS")) {
                Challenge precedent = succes.getChallenge().getChallenge_precedent();

                if (precedent != null){
                    if(precedent.getChallenge_precedent() == null){
                        etoile = 1;
                    }else {
                        etoile = 2;
                    }
                }
            }else if (Objects.equals(succes.getEtat(), "TERMINE")){
                etoile = 3;
            }

            info.put("libelle", succes.getChallenge().getLibelle());
            info.put("avancement", succes.getAvancement());
            info.put("quantite_voulue", succes.getChallenge().getQuantite());


            Double pourcentage = Double.valueOf(Double.valueOf(succes.getAvancement()) / Double.valueOf(succes.getChallenge().getQuantite()));

            info.put("pourcentage", pourcentage);

            info.put("gemme", succes.getChallenge().getGemme());
            info.put("gemme_recompense", succes.getChallenge().getGemme_recompense());
            info.put("quantite_recompense", succes.getChallenge().getQuantite_recompense());

            info.put("etoile", etoile);

            json_succes.put(info);
        }


        json.put("succes", json_succes);

        return ResponseEntity.ok(json.toMap());
    }

}
