package com.example.demo.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.entity.Gemme;
import com.example.demo.entity.Obtention;
import com.example.demo.service.GemmeService;
import com.example.demo.service.ObtentionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;


import com.example.demo.entity.Tirage;
import com.example.demo.service.TirageService;

import org.json.JSONObject;
import org.json.JSONArray;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/")
public class TirageController {

    @Autowired
    TirageService tirageService;

    @Autowired
    GemmeService gemmeService;

    @Autowired
    ObtentionService obtentionService;


    @GetMapping(path = "/remplir")
    public ResponseEntity<?> initialiseTirageDuJour() {

        tirageService.detruitTirage();

        int heureDebut = 7;
        int heureFin = 23;

        int minute = 30;
        int id = 0;

        DateTimeFormatter jourFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDateTime now = LocalDateTime.now();
        String jour = jourFormat.format(now);

        for (int heure = heureDebut; heure <= heureFin; heure++){

            // 2 fois par heure
            for (int j = 1; j <= 2; j++){

                minute = (minute == 0 ? 30 : 0);

                // 5 gemmes par tirage
                for (int i = 1; i <= 5; i++){
                    id += 1;

                    int val = getRandomNumberInt(1, 100);

                    Gemme gemme = gemmeService.trouveGemme(val);

                    double lat = getRandomNumber(45.63997, 45.64702);
                    double longg = getRandomNumber(5.86445, 5.87571);

                    int nombre_recup = 0;

                    tirageService.ajouteTirage(id, jour, heure, minute, gemme.getId(), nombre_recup, lat, longg, chaineAleatoire());

                }
            }



        }

        return ResponseEntity.ok("OKAY");
    }


        String chaineAleatoire(){


            String[] alphabet =new String[] {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };

            String retour = "";

            for (int i = 1; i <= 20; i ++){
                retour += alphabet[getRandomNumberInt(0,51)];
            }

            return retour;

        }


    @GetMapping(path = "/tirage/{numero}")
    public ResponseEntity<?> donneTirage(@PathVariable int numero) {

        DateTimeFormatter jourFormat = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter heureFormat = DateTimeFormatter.ofPattern("HH");
        DateTimeFormatter minFormat = DateTimeFormatter.ofPattern("mm");

        LocalDateTime now = LocalDateTime.now();
        String jour = jourFormat.format(now);

        int heure = Integer.parseInt(heureFormat.format(now));
        int min = Integer.parseInt(minFormat.format(now));
        min = min < 30 ? 0 : 30;


        List<Obtention> liste_obtenue = obtentionService.donneLignes(numero);

        List<String> chaines = new ArrayList<String>();
        for(Obtention obtention : liste_obtenue){
            chaines.add(obtention.getChaine());
        }


        List<Tirage> tout_tirages = tirageService.donneTirageActuel(jour, heure, min);
        List<Tirage> tirages = new ArrayList<Tirage>();

        for(Tirage tirage : tout_tirages){
            String chaine = tirage.getChaine();
            if(!chaines.contains(chaine)) {
                tirages.add(tirage);
            }
        }

        JSONObject json = new JSONObject();
        JSONArray un_tirage = new JSONArray();

        for (Tirage t : tirages){
            JSONObject info = new JSONObject();

            info.put("latitude", t.getLatitude());
            info.put("longitude", t.getLongitude());
            info.put("recupere", t.getNombre_recupere());
            info.put("chaine", t.getChaine());
            info.put("gemme", t.getGemme());
            info.put("recuperable", t.getNombre_recupere() < t.getGemme().getPersonne_max() ? true : false);

            un_tirage.put(info);
        }

        json.put("liste", un_tirage);
        json.put("existe", now.getHour() >= 7 && now.getHour() <= 18 ? true : false);

        return ResponseEntity.ok(json.toMap());

    }

    public double getRandomNumber(double min, double max) {
        return (double) ((Math.random() * (max - min)) + min);
    }

    public int getRandomNumberInt(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }


}
