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
public class Challenge{

    @Id
    @Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Challenge.libelle}")
    private String libelle;

    @ManyToOne
    @JoinColumn(name = "id_challenge_precedent")
    private Challenge challenge_precedent;

    @ManyToOne
    @JoinColumn(name = "id_gemme")
    private Gemme gemme;

    @Column
    @NotNull(message="{NotNull.Challenge.quantite}")
    private int quantite;

    @Column
    @NotNull(message="{NotNull.Challenge.temps}")
    private int temps;

    @ManyToOne
    @JoinColumn(name = "id_gemme_recompense")
    private Gemme gemme_recompense;

    @Column
    @NotNull(message="{NotNull.Challenge.quantite_recompense}")
    private int quantite_recompense;

}


