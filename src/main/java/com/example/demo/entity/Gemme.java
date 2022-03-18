package com.example.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


import lombok.Data;

@Entity
@Data
public class Gemme{

    @Id
    @Column
    private long id;

    public long getId() {
        return id;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.nom}")
    private String nom;

    public String getNom() {
        return nom;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.couleur}")
    private String couleur;

    public String getCouleur() {
        return couleur;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.proba}")
    private float proba;

    public float getProba() {
        return proba;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.proba_min}")
    private float proba_min;

    public float getProba_min() {
        return proba_min;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.proba_max}")
    private float proba_max;

    public float getProba_max() {
        return proba_max;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.personne_max}")
    private int personne_max;

    public int getPersonne_max() {
        return personne_max;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.valeur}")
    private int valeur;

    public int getValeur() {
        return valeur;
    }

    @Column
    @NotNull(message="{NotNull.Gemme.chemin_image}")
    private String chemin_image;

    public String getChemin_image() {
        return chemin_image;
    }
}
