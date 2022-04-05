package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import com.example.demo.entity.Reduction;
import com.example.demo.repository.ReductionRepository;

@Component
public class ReductionService {

    private ReductionRepository reductionRepository;

    public ReductionService(ReductionRepository reductionRepository) {
        this.reductionRepository = reductionRepository;
    }

    public List<Reduction> donneToutesLesReductions(boolean asc) {
        if(asc){
            return reductionRepository.orderByPointsASC();
        }else {
            return reductionRepository.orderByPointsDESC();
        }
    }


}
