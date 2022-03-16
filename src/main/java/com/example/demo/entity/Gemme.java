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

    @Column
    @NotNull(message="{NotNull.Gemme.nom}")
    private String nom;

    @Column
    @NotNull(message="{NotNull.Gemme.couleur}")
    private String couleur;

    @Column
    @NotNull(message="{NotNull.Gemme.proba}")
    private float proba;

    @Column
    @NotNull(message="{NotNull.Gemme.proba_min}")
    private float proba_min;

    @Column
    @NotNull(message="{NotNull.Gemme.proba_max}")
    private float proba_max;

    @Column
    @NotNull(message="{NotNull.Gemme.personne_max}")
    private int personne_max;

    @Column
    @NotNull(message="{NotNull.Gemme.valeur}")
    private int valeur;

    @Column
    @NotNull(message="{NotNull.Gemme.chemin_image}")
    private String chemin_image;



}
