package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Tirage;
import com.example.demo.repository.TirageRepository;

@Component
public class TirageService {

    private TirageRepository tirageRepository;

    public TirageService(TirageRepository tirageRepository) {
        this.tirageRepository = tirageRepository;
    }

    public void detruitTirage() {
        tirageRepository.supprimeTout();
    }

    public void ajouteTirage(int id, String jour, int heure, int minute, long id_gemme, int nombre, double lat, double longi, String chaine) {
        tirageRepository.ajoute(id, jour, heure, minute, id_gemme, nombre, lat, longi, chaine);
    }

    public List<Tirage> donneTirageActuel(String jour, int heure, int minute){
        return tirageRepository.donneListeActuelle(jour, heure, minute);
    }


    public Tirage donneTirageChaine(String chaine){
        return tirageRepository.donneTirageChaine(chaine);
    }

    public void augmenteRecuperation(String chaine) {
        tirageRepository.augmenteRecuperation(chaine);
    }





}
