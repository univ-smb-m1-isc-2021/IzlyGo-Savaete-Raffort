package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Etudiant;
import com.example.demo.repository.EtudiantRepository;

@Component
public class EtudiantService {

    private EtudiantRepository etudiantRepository;

    public EtudiantService(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    public Etudiant saveEtudiant(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
    }


    public Etudiant getEtudiant(int numero) {
        return etudiantRepository.etud(numero);
    }

    public List<Etudiant> donneTopEtudiants(int nombre){
        return etudiantRepository.classementEtudiants(nombre);
    }

    public int connexionExiste(String mail, String password) {
        return etudiantRepository.connexionExiste(mail, password);
    }

    public int connexion(String mail, String password) {
        return etudiantRepository.connexion(mail, password);
    }


    public Etudiant checkCodeParrainage(String code){ return etudiantRepository.checkCodeParrainage(code); }

    public void augmenteNombrePoints(int etudiant, int valeur){
        etudiantRepository.augmenteNombrePoints(etudiant, valeur);
    }


    public void retirePoints(int etudiant, int nombre){
        etudiantRepository.retirePoints(etudiant, nombre);
    }


    public void ajouteBadge(int etudiant){
        etudiantRepository.ajouteBadge(etudiant);
    }

    public void retireBadge(int etudiant){
        etudiantRepository.retirerBadge(etudiant);
    }


    public Etudiant checkMDP(int etudiant, String mdp){
        return etudiantRepository.checkMDP(etudiant, mdp);
    }

    public void changeMDP(int etudiant, String nouveau_mdp){
        etudiantRepository.changeMDP(etudiant, nouveau_mdp);
    }
}
