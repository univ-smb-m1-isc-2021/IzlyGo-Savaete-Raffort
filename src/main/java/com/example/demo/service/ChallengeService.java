package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Challenge;
import org.springframework.stereotype.Component;

import com.example.demo.repository.ChallengeRepository;

@Component
public class ChallengeService {

    private ChallengeRepository challengeRepository;

    public ChallengeService(ChallengeRepository challengeRepository) {
        this.challengeRepository = challengeRepository;
    }


    public List<Challenge> donneListeChallenge(){
        return challengeRepository.findAll();
    }

    public Challenge donneProchainChallenge(long id){
        return challengeRepository.donneProchainChallenge(id);
    }

}

