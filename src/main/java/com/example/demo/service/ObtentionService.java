package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Obtention;
import com.example.demo.repository.ObtentionRepository;

@Component
public class ObtentionService {

    private ObtentionRepository obtentionRepository;

    public ObtentionService(ObtentionRepository obtentionRepository) {
        this.obtentionRepository = obtentionRepository;
    }

    public void ajouteLigne(String chaine, long id_etudiant){
        obtentionRepository.ajouteLigne(chaine, id_etudiant);
    }

    public List<Obtention> donneLignes(int numero){
        return obtentionRepository.donneLignes(numero);
    }
}
