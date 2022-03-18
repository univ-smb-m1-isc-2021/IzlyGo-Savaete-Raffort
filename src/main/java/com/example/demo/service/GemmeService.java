package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Gemme;
import com.example.demo.repository.GemmeRepository;

@Component
public class GemmeService {

    private GemmeRepository gemmeRepository;

    public GemmeService(GemmeRepository gemmeRepository) {
        this.gemmeRepository = gemmeRepository;
    }

    public Gemme trouveGemme(int proba) {
        return gemmeRepository.trouveGemme(proba);
    }

    public List<Gemme> donneListeGemmes(){ return gemmeRepository.findAll(); }

}
