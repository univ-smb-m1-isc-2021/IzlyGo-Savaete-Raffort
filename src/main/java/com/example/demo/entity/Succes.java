package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;


import lombok.Data;

import java.util.List;

@Entity
@Data
public class Succes{

    @Id
    @Column
    private long id;

    public long getId() {
        return id;
    }

    @ManyToOne
    @JoinColumn(name = "id_etudiant")
    private Etudiant etudiant;

    public Etudiant getEtudiant() {
        return etudiant;
    }

    @ManyToOne
    @JoinColumn(name = "id_challenge")
    private Challenge challenge;

    public Challenge getChallenge() {
        return challenge;
    }

    @Column
    @NotNull(message="{NotNull.Succes.etat}")
    private String etat;

    public String getEtat() {
        return etat;
    }

    @Column
    @NotNull(message="{NotNull.Succes.avancement}")
    private int avancement;

    public int getAvancement() {
        return avancement;
    }
}


