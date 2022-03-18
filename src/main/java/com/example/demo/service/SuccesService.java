package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Succes;
import com.example.demo.repository.SuccesRepository;

@Component
public class SuccesService {

    private SuccesRepository succesRepository;

    public SuccesService(SuccesRepository succesRepository) {
        this.succesRepository = succesRepository;
    }


    public List<Succes> donneMesSucces(int numero){
        return succesRepository.donneMesSuccesSQL(numero, "EN_COURS", "TERMINE");
    }

    public void ajouteLine(long etudiant, long challenge, String etat){
        succesRepository.ajouteLine(etudiant, challenge, etat);
    }



}
