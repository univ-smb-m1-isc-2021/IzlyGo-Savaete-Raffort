package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Formation;
import com.example.demo.repository.FormationsRepository;

@Component
public class FormationService {

    private FormationsRepository formationRepository;

    public FormationService(FormationsRepository formationRepository) {
        this.formationRepository = formationRepository;
    }

    public List<Formation> getFormations() {
        return formationRepository.findAll();
    }


}
