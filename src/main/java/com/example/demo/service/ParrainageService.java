package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Parrainage;
import com.example.demo.repository.ParrainageRepository;

@Component
public class ParrainageService {

    private ParrainageRepository parrainageRepository;

    public ParrainageService(ParrainageRepository parrainageRepository) {
        this.parrainageRepository = parrainageRepository;
    }

    public List<Parrainage> donneListeFilleuls(int numero){
        return parrainageRepository.donneListeFilleuls(numero);
    }

    public void ajouteLigne(long filleul, long parrain){ parrainageRepository.ajouteLigne(filleul, parrain); }
}
