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

    public int getQuantite() {
        return quantite;
    }

    @Column
    @NotNull(message="{NotNull.Inventaire.valeur_point}")
    private int valeur_point;

    public int getValeur_point() {
        return valeur_point;
    }

    @Column
    @NotNull(message="{NotNull.Inventaire.id_gemme}")
    private int id_etudiant;

    public int getId_etudiant() {
        return id_etudiant;
    }

    @Column
    @NotNull(message="{NotNull.Inventaire.valeur_euro}")
    private int valeur_euro;

    public int getValeur_euro() {
        return valeur_euro;
    }

    @ManyToOne
    @JoinColumn(name = "id_gemme")
    private Gemme gemme;

    public Gemme getGemme() {
        return gemme;
    }






}


