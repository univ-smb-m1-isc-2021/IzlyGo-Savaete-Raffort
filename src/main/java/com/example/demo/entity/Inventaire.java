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
public class Inventaire{

    @Id
    @Column
    private long id;

    @Column
    @NotNull(message="{NotNull.Inventaire.quantite}")
    private int quantite;

    @Column
    @NotNull(message="{NotNull.Inventaire.valeur_point}")
    private int valeur_point;

    @Column
    @NotNull(message="{NotNull.Inventaire.id_gemme}")
    private int id_etudiant;

    @Column
    @NotNull(message="{NotNull.Inventaire.valeur_euro}")
    private int valeur_euro;

    @ManyToOne
    @JoinColumn(name = "id_gemme")
    private Gemme gemme;




    public int getQuantite() {
        return quantite;
    }

    public Gemme getGemme() {
        return gemme;
    }
}


