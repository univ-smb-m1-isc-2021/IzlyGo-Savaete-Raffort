package com.example.demo.controller;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
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

import org.springframework.web.bind.annotation.PathVariable;

import java.time.format.TextStyle;
import java.util.Locale;

import lombok.extern.slf4j.Slf4j;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

@Slf4j
@RestController
@RequestMapping("/api/")
public class EtudiantController {

    private static final DecimalFormat df = new DecimalFormat("0.00");


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

    @Autowired
    ObtentionService obtentionService;

    @Autowired
    TirageService tirageService;


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


        // Gestion du parrain s'il y en a un
        Etudiant parrain = etudiantService.checkCodeParrainage(etudiant.getCodeParrain());
        if (parrain == null) { etudiant.setCode_parrain(null); }
        Etudiant etu = etudiantService.saveEtudiant(etudiant);

        if (parrain != null) {
            parrainageService.ajouteLigne(etu.getNumero(), parrain.getNumero());
            inventaireService.ajouteQuantite(parrain.getNumero(), 3 /* Émeraude */, 3);
            inventaireService.ajouteQuantite(etudiant.getNumero(), 2 /* Saphir */, 2); // TODO

        }

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

    @GetMapping(path = "/sendmail")
    public void send() throws UnirestException {
        sendSimpleMessage();
    }


    @GetMapping(path = "/inventaire/{numero}")
    public ResponseEntity<?> monInventaire(@PathVariable int numero) {


        double CONVERSION = 0.0025;


        JSONObject json = new JSONObject();

        JSONArray gemmesTotal = new JSONArray();
        JSONArray gemmesPar2= new JSONArray(); 

        List<Inventaire> mes_gemmes = inventaireService.getList(numero);

        int pair = 0;

        for (Inventaire inv : mes_gemmes) {
            JSONObject une_gemme = new JSONObject();

            une_gemme.put("nom", inv.getGemme().getNom());
            une_gemme.put("couleur", inv.getGemme().getCouleur());
            une_gemme.put("chemin_image", inv.getGemme().getChemin_image());

            une_gemme.put("quantite", inv.getQuantite());

            int valeur = inv.getGemme().getValeur() * inv.getQuantite();
            une_gemme.put("valeur_points", valeur);
            une_gemme.put("valeur_euro", df.format(valeur * CONVERSION));

            gemmesPar2.put(une_gemme);

            pair += 1;

            if (pair % 2 == 0) {
                gemmesTotal.put(gemmesPar2);
                gemmesPar2 = new JSONArray();
            }
        }

        json.put("gemmes", gemmesTotal);

        Etudiant etu = etudiantService.getEtudiant(numero);

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


    @PostMapping(path = "/recupere")
    public ResponseEntity<?> recupereGemme(@RequestBody Obtention obtention){

        int id_etudiant = obtention.getIdEtudiant();

        // Ajoute une ligne dans la table d'obbtention pour ne pas récupérer plusieurs fois la même gemme pendant un tirage
        obtentionService.ajouteLigne(obtention.getChaine(), id_etudiant);

        // Ajoute la ligne dans l'inventaire du joueur
        Tirage tirage = tirageService.donneTirageChaine(obtention.getChaine());
        inventaireService.ajouteQuantite(id_etudiant, tirage.getGemme().getId(), 1);

        // Incrémente le nombre de récupération sur le tirage
        tirageService.augmenteRecuperation(obtention.getChaine());

        // Incrémente le nombre de points du joueur
        etudiantService.augmenteNombrePoints(id_etudiant, tirage.getGemme().getValeur());



        // GESTION DES SUCCÈS
        boolean existe_succes_fini = false;
        List<Succes> mesSucces = succesService.donneSuccesEnCours(id_etudiant);

        for(Succes succes : mesSucces){
            // SI le succès concerne la gemme que l'on vient de prendre
            if (succes.getChallenge().getGemme().getId() == tirage.getGemme().getId()){

                // On modifie son avancement
                int avancement = succes.getAvancement() + 1;
                succesService.ajouteAvancement(succes.getId());

                // Si l'avancement = à la quantité souhaité pour le succès, on dit que ce succès est fini
                if (avancement == succes.getChallenge().getQuantite()){
                    succesService.definiSuccesFini(succes.getId());
                    // On ajoute la récompense dans son inventaire
                    inventaireService.ajouteQuantite(id_etudiant, succes.getChallenge().getGemme_recompense().getId(), succes.getChallenge().getQuantite_recompense());

                    existe_succes_fini = true;
                    etudiantService.ajouteBadge(id_etudiant);
                    // S'il y a un succès après on le débloque sinon c'est fini
                    Challenge prochain = challengeService.donneProchainChallenge(succes.getChallenge().getId());
                    if (prochain != null){
                        succesService.debloqueSucces(prochain.getId());
                    }
                }
            }
        }


        JSONObject json = new JSONObject();
        json.put("alors", true);
        json.put("existe_succes_fini", existe_succes_fini);

        return ResponseEntity.ok(json.toMap());
    }


    public static JsonNode sendSimpleMessage() throws UnirestException {
        HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/sandbox144e0123fb3a4a2bac7195d7ca81d6dd.mailgun.org/messages")
			.basicAuth("api", "44b661c1da1f4855f98f29ec03a396a1-0677517f-844d1d0c")
                .queryString("from", "adrienraffort.pro@gmail.com")
                .queryString("to", "adrien73400@icloud.com")
                .queryString("subject", "hello")
                .queryString("text", "testing")
                .asJson();
        return request.getBody();
    }



    @PostMapping(path = "/utilise-reduction/{numero}")
    public ResponseEntity<?> retireLesPoints(@RequestBody Reduction reduction, @PathVariable int numero) {
        etudiantService.retirePoints(numero, reduction.getPoints_requis());


        JSONObject json = new JSONObject();
        json.put("succes", true);
        return ResponseEntity.ok(json.toMap());

    }


    @PostMapping(path = "/retire-badge/{numero}")
    public ResponseEntity<?> retireLesPoints(@PathVariable int numero) {
        etudiantService.retireBadge(numero);

        JSONObject json = new JSONObject();
        json.put("succes", true);
        return ResponseEntity.ok(json.toMap());

    }

    @PostMapping(path = "/change-mot-de-passe")
    public ResponseEntity<?> changeMDP(@RequestBody EditionMDP editionMDP) {

        JSONObject json = new JSONObject();


        Etudiant etudiant = etudiantService.checkMDP(editionMDP.getEtudiant(), editionMDP.getMdpActuel());


        if (etudiant != null) {
                etudiantService.changeMDP(editionMDP.getEtudiant(), editionMDP.getMdpNouveau());
                json.put("response", true);

        }else {
            json.put("response", false);
            json.put("other", editionMDP.getMdpActuel());
            json.put("info_text", "Le mot de passe actuel est faux.");
        }


        return ResponseEntity.ok(json.toMap());

    }



}


