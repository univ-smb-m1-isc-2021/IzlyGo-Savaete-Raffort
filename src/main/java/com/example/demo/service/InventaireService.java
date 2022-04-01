package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Inventaire;
import com.example.demo.repository.InventaireRepository;

@Component
public class InventaireService {

    private InventaireRepository inventaireRepository;

    public InventaireService(InventaireRepository inventaireRepository) {
        this.inventaireRepository = inventaireRepository;
    }


    public List<Inventaire> getList(int numero) {
        return inventaireRepository.maListe(numero);
    }


    public void ajouteLigne(long etudiant, long gemme){
        inventaireRepository.ajouteLigne(etudiant,gemme);
    }


    public void ajouteQuantite(long etudiant, long gemme, int quantite) {
        inventaireRepository.ajouteQuantite(etudiant, gemme, quantite);
    }
}
